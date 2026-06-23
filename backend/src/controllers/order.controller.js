
const { getIO } = require("../helper/socket/socket");
const Notification = require("../models/Notification");

const {postOrderService,getOrderService,getOrderByIDService,cancelOrderService, orderSellerService,
    getSingleOrder, updateSeller,getOrdersAllService,getOrderByAdminIdService,updateOrderByAdminService,buyAgainService,
    getBuyOrder
} = require("../service/order.service")


const postOrder = async(req,res) =>{
    const{address_id,payment_method,coupon_code} = req.body;

    const authUserId = req.user.id
    const data = {
        address_id,
        payment_method,
        coupon_code
    }
    const result = await postOrderService(authUserId,data)



    return res.status(201).json({message:"Order created Sucessfully",data:result})
}

const getOrder = async(req,res) =>{

    const authUserId = req.user.id;
    const result = await getOrderService(authUserId)

    return res.status(201).json({message:"get Order Data",data:result})
}


const getOrderById = async(req,res) =>{
    const authUserId = req.user.id;
    const {id} = req.params;

    const result = await getOrderByIDService(id,authUserId)

    return res.status(201).json({message:"Retrive order",data:result})
}

const CancelOrder =async(req,res)=>{
    const authUserId = req.user.id;
    const {id} = req.params;

    const result = await cancelOrderService(authUserId,id)

    return res.status(201).json({message:"cancel Order ",data:result})
}


///sellerOrderRoutes

const sellerOrder = async(req,res) =>{
    const authUserId = req.user.id;

    const result = await orderSellerService(authUserId);

    return res.status(201).json({message:"Seller order",data:result})
}

const sellerSingleOrderId = async(req,res) =>{
    const authUserId = req.user.id;
    const {id} = req.params;
    const result = await getSingleOrder(authUserId,id)

    return res.status(201).json({message:"Order retrived successfully",data:result})
}

const updateSellerAddress = async(req,res) =>{
    const {id} = req.params;
    const authUserId = req.user.id;
    const {order_status} = req.body;
    const result = await updateSeller(id,authUserId,order_status)


 const notification = await  Notification.create({
  user_id: result.user_id,
  title: "Order status updated",
  message: `Your order #${result.id} is now ${result.order_status}`,
  type: "order",
  order_id: result.id,
  is_read: false
})
    const io = getIO();


    io.to(`user:${result.user_id}`).emit("notification:new",notification);
  
    return res.status(201).json({message:"Update Seller Address",data:result})
}

/////ADmin Routes

const getOrdersAdmin = async(req,res) =>{
    const result = await  getOrdersAllService();

    return res.status(201).json({message:"Retrived Order",data:result})
}

const getOrderByAdminId = async(req,res) =>{
    const {id} = req.params;

    const result = await getOrderByAdminIdService(id);

    return res.status(201).json({message:"get Order By Id",data:result})
}


const updateOrderStatusAdmin = async(req,res) =>{
    const {id} = req.params

    const {order_status} = req.body
    const result = await updateOrderByAdminService(id,order_status)

    return res.status(201).json({message:"update Order By Status",data:result})
}

const buyAgain = async(req,res) =>{
    const {id} = req.params;
    const authUserId = req.user.id;

    const result = await buyAgainService(id,authUserId);

    return res.status(201).json({message:"Product added to cart",data:result})
}



////// buyer route



module.exports = {postOrder,getOrder,getOrderById,CancelOrder,sellerOrder,sellerSingleOrderId,
    updateSellerAddress,getOrdersAdmin,getOrderByAdminId,updateOrderStatusAdmin,buyAgain}
