import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";

// @desc    Create notification (in-app + optional email)
// @route   POST /api/notifications
// @access  Private/Admin
export const createNotification = async (req, res) => {
  try {
    const { userId, type, message, sendEmailFlag } = req.body;

    const notification = new Notification({
      user: userId,
      type,
      message,
    });

    await notification.save();

    // Optional email
    if (sendEmailFlag) {
      const user = await User.findById(userId);
      if (user && user.email) {
        await sendEmail(user.email, "New Notification", message);
      }
    }

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user notifications
// @route   GET /api/notifications/my
// @access  Private
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) return res.status(404).json({ message: "Not found" });
    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: "Marked as read", notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
