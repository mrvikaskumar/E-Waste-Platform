import Contact from "../models/Contact.js";

// Add a new contact message
export const createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const saved = await contact.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all contact messages
// Later, you can protect this route using authMiddleware to allow only admin
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ created: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
