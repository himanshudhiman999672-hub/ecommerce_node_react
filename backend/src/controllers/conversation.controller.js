const getService = require("../service/conversation.service");
const { getIO } = require("../helper/socket/socket");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const { getOrder } = require("./order.controller");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const { error } = require("../validation/category");
const { Op } = require("sequelize");
const setOrder = async (req, res) => {
    try {
        const authUserId = req.user.id;
        const orderId = req.params.orderid;
        const orderItemId = req.params.orderItemId;
        const { message } = req.body;

        const result = await getService(authUserId, orderId, orderItemId, message);

        const io = getIO();

        io.to(`conversation_${result.conversation_id}`).emit("new_message", {
            conversationId: result.conversation_id,
            message: result,
        });
        return res.status(201).json({
            message: "Message sent successfully",
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};



//sellr conversation
const sellerConversation = async (req, res) => {
  try {
    const authUserId = req.user.id; // seller id
    const orderItemId = req.params.orderItemId;
    const orderId = req.params.orderid;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const orderItem = await OrderItem.findOne({
      where: {
        id: orderItemId,
        order_id: orderId,
        seller_id: authUserId
      },
      include: [
        {
          model: Order
        }
      ]
    });

    if (!orderItem) {
      return res.status(404).json({
        error: "Order item not found for this seller"
      });
    }

    const order = orderItem.order || orderItem.Order;

    if (!order) {
      return res.status(500).json({
        message: "Order data not loaded with order item"
      });
    }

    const buyerId = order.user_id;

    const [conversation] = await Conversation.findOrCreate({
      where: {
        seller_id: authUserId,
        buyer_id: buyerId,
        order_id: orderId
      }
    });

    const mess = await Message.create({
      sender_id: authUserId,
      conversation_id: conversation.id,
      message: message
    });


    const io = getIO();

        io.to(`conversation_${conversation.id}`).emit("new_message", {
            conversationId: conversation.id,
            message: mess,
        });

    return res.status(201).json({
      message: "Message sent successfully seller",
      data: mess
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


//Both

const getMessages = async(req,res)=>{
  try {
    const conversationId = req.params.id;
    const authUserId = req.user.id;
    const conv = await Conversation.findOne({
      where: {
        id: conversationId,
        [Op.or]: [
          { buyer_id: authUserId },
          { seller_id: authUserId }
        ]
      }
    });

    if(!conv){
      return res.status(404).json({error:"Conversation not found"});
    }

    const result = await Message.findAll({
      where:{
        conversation_id: conv.id,
      },
      order: [["createdAt", "ASC"]]
    });


    return res.status(200).json({
      message: "Message Retrived",
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }

}

const getMessagesByOrderItem = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const orderId = req.params.orderid;
    const orderItemId = req.params.orderItemId;

    const orderItem = await OrderItem.findOne({
      where: {
        id: orderItemId,
        order_id: orderId,
      },
      include: [
        {
          model: Order,
        },
      ],
    });

    if (!orderItem) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    const order = orderItem.order || orderItem.Order;

    if (!order) {
      return res.status(500).json({
        message: "Order data not loaded with order item",
      });
    }

    const isBuyer = order.user_id === authUserId;
    const isSeller = orderItem.seller_id == authUserId;

    if (!isBuyer && !isSeller) {
      return res.status(403).json({
        message: "You are not allowed to view this conversation",
      });
    }

    const conversation = await Conversation.findOne({
      where: {
        order_id: orderId,
        buyer_id: order.user_id,
        seller_id: orderItem.seller_id,
      },
    });

    if (!conversation) {
      return res.status(200).json({
        message: "No conversation found",
        conversationId: null,
        data: [],
      });
    }

    const messages = await Message.findAll({
      where: {
        conversation_id: conversation.id,
      },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({
      message: "Message Retrived",
      conversationId: conversation.id,
      data: messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {setOrder,sellerConversation,getMessages,getMessagesByOrderItem};
