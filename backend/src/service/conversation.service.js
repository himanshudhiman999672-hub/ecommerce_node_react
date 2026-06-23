const Conversation = require("../models/conversation");
const Message = require("../models/message");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

const getService = async (authUserId, orderId, orderItemId, messageText) => {
  const order = await Order.findOne({
    where: {
      id: orderId,
      user_id: authUserId,
    },
  });

  if (!order) {
    throw new Error("Order not found for this buyer");
  }

  const orderItem = await OrderItem.findOne({
    where: {
      id: orderItemId,
      order_id: orderId,
    },
  });

  if (!orderItem) {
    throw new Error("Order item not found in this order");
  }

  const sellerId = orderItem.seller_id;

  const [conversation] = await Conversation.findOrCreate({
    where: {
      order_id: orderId,
      buyer_id: authUserId,
      seller_id: sellerId,
    },
  });

  const newMessage = await Message.create({
    conversation_id: conversation.id,
    sender_id: authUserId,
    message: messageText,
  });

  return newMessage;
};

module.exports = getService;
