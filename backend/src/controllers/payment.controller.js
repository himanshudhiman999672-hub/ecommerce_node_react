    const postPaymentService = require("../service/payment.service");
    const crypto = require("crypto")
    const Razorpay = require("razorpay")
    const Payment = require("../models/Payment")
    const Order = require("../models/Order")
    const postpayment = async(req,res) =>{
        console.log("KJKjkjsaskdskjdkskdksjj")
        const {order_id} = req.body;

        if(!order_id){
            return res.status(404).json({message:"Payment not created"})
        }
        const authUserId = req.user.id;
        console.log('auth',authUserId)

        const result = await postPaymentService(order_id,authUserId);

        return res.status(201).json({message:"Payment detection successfully",data:result})
    }


  const instance = new Razorpay({
    key_id: process.env.RAZORPAYAPIKEY,
    key_secret: process.env.RAZORPAYAPISECRET,
});

const verifyPayment = async (req, res) => {

    try {

        // 1️⃣ Get data from Razorpay response
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // 2️⃣ Verify signature (SECURITY CHECK)
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAYAPISECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid Signature"
            });
        }
        const payment = await instance.payments.fetch(razorpay_payment_id);

        if (payment.status !== "captured") {
            return res.status(400).json({
                success: false,
                message: "Payment not captured"
            });
        }

        const order = await Order.findOne({
            where: { razorpay_order_id }
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        await Payment.create({
            order_id: order.id, // internal order id
            user_id: order.user_id,

            transaction_id: razorpay_payment_id,
            payment_gateway: "razorpay",
            amount: payment.amount / 100, // convert paise → rupees
            payment_status: "paid",
            currency: payment.currency,
            paid_at: new Date()
        });

        await Order.update(
            {
                payment_status: "paid",
                order_status:"confirmed",
                razorpay_payment_id: razorpay_payment_id
            },
            {
                where: {
                    razorpay_order_id: razorpay_order_id
                }
            }
        );

    
        return res.json({
            success: true,
            message: "Payment Verified & Order Updated"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

    module.exports = {postpayment,verifyPayment}