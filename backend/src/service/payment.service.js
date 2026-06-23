require("dotenv").config();

const sequelize = require("../config/db");
const Order = require("../models/Order");
const Razorpay = require("razorpay");

   const postPaymentService = async (order_id, authUserId) => {
    const transaction = await sequelize.transaction();

    try {

        // 1️⃣ Find order from DB
        const checkOrder = await Order.findOne({
            where: { id: order_id },
            transaction
        });

        if (!checkOrder) {
            throw new Error("Order not found");
        }


        // 2️⃣ Check payment method
        if (checkOrder.payment_method === "stripe") {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(checkOrder.total_price * 100),
        currency: "usd",
        metadata: {
            order_id: checkOrder.id
        }
    });

    checkOrder.stripe_payment_intent_id = paymentIntent.id;
    await checkOrder.save({ transaction });

    await transaction.commit();

    return {
        success: true,
        clientSecret: paymentIntent.client_secret
    };
}
        else{

        

        // 3️⃣ Razorpay instance create
        const instance = new Razorpay({
            key_id: process.env.RAZORPAYAPIKEY,
            key_secret: process.env.RAZORPAYAPISECRET,
        });

        // 4️⃣ Create Razorpay order
        const options = {
            amount: checkOrder.total_price * 100, // paise me convert
            currency: "INR",
            receipt: `receipt_${checkOrder.id}`,
        };

        const razorpayOrder = await instance.orders.create(options);

        // ⭐ IMPORTANT: Save Razorpay order id in DB
        checkOrder.razorpay_order_id = razorpayOrder.id; // <-- LINKING ORDER
        await checkOrder.save({ transaction });

        // 5️⃣ Commit transaction
        await transaction.commit();

        // 6️⃣ Return order to frontend
        return {
            success: true,
            order: razorpayOrder
        };

    }

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = postPaymentService;