import ContactMessage from "../models/ContactMessage.js";

export const sendMessage = async (req, res) => {
  try {
    // console.log("BODY:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const saved = await ContactMessage.create({
      name,
      email,
      message
    });

    // console.log("SAVED:", saved._id);

    // ❌ EMAIL DISABLED (this is the usual crash point)

    res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};
