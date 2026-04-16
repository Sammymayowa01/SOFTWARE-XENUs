const ChatMessage = require('../models/ChatMessage');

// @desc    Handle chatbot messages
// @route   POST /api/chatbot
// @access  Public
exports.handleChat = async (req, res, next) => {
  try {
    const { message, sessionId, name, email } = req.body;

    // Log the user's message
    await ChatMessage.create({
      sessionId,
      sender: 'user',
      text: message,
      name,
      email
    });

    // Simple predefined responses
    let botResponse = "I'm not sure I understand. Could you please rephrase?";
    let options = ["Our Services", "Contact Human Support", "About Us"];

    const msg = message.toLowerCase();

    if (msg.includes('service')) {
      botResponse = "We offer specialized solutions in various domains: Custom Software, Mobile Apps, Cloud & DevOps, and Digital Transformation.";
      options = ["Custom Software", "Mobile Apps", "Cloud & DevOps", "Digital Transformation"];
    } else if (msg.includes('contact') || msg.includes('support')) {
      botResponse = "Please provide your details so our team can get in touch with you.";
      options = [];
    } else if (msg.includes('about')) {
      botResponse = "Software Xenus is a leading tech partner dedicated to technical excellence.";
      options = ["View About Section", "Our Services"];
    } else if (msg.includes('hello') || msg.includes('hi')) {
      botResponse = "Welcome to Software Xenus. How can I assist you today?";
    }

    // Log the bot's response
    await ChatMessage.create({
      sessionId,
      sender: 'bot',
      text: botResponse
    });

    res.status(200).json({
      success: true,
      data: {
        text: botResponse,
        options: options.length > 0 ? options : undefined
      }
    });
  } catch (error) {
    next(error);
  }
};
