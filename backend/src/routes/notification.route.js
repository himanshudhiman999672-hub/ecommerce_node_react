const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  getNotifications,
  markNotificationRead,
} = require("../controllers/notification.controller");

router.get("/notifications", auth, getNotifications);
router.patch("/notifications/:id/read", auth, markNotificationRead);

module.exports = router;
