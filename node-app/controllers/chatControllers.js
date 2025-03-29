const Chat = require('../models/Chat');
const Products = require('./productControllers').Products;

module.exports = {
  // Send a new message
  sendMessage: async (req, res) => {
    try {
      const { sender, receiver, product, message } = req.body;
      
      const newChat = new Chat({ sender, receiver, product, message });
      await newChat.save();
      
      // Add chat reference to product
      await Products.findByIdAndUpdate(product, { $push: { chats: newChat._id } });
      
      res.status(200).json({ success: true, chat: newChat });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Get all chats for a product
  getProductChats: async (req, res) => {
    try {
      const chats = await Chat.find({ product: req.params.productId })
        .populate('sender receiver', 'username email');
      
      res.status(200).json({ success: true, chats });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};