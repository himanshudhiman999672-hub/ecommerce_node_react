const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  const authUserId = req.user.id;

  const notifications = await Notification.findAll({
    where: {
      user_id: authUserId,
      is_delete: 0,
    },
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({
    message: "Notifications retrieved",
    data: notifications,
  });
};

const markNotificationRead = async (req, res) => {
  const authUserId = req.user.id;
  const { id } = req.params;

  const notification = await Notification.findOne({
    where: {
      id,
      user_id: authUserId,
    },
  });

  if (!notification) {
    return res.status(404).json({
      message: "Notification not found",
    });
  }

  notification.is_read = true;
  await notification.save();

  return res.status(200).json({
    message: "Notification marked as read",
    data: notification,
  });
};

module.exports = {
  getNotifications,
  markNotificationRead,
};
