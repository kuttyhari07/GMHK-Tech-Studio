import Contact from "../models/Contact.js";
import { buildListQuery, sendPaginated } from "../utils/query.js";

const sanitizeText = (value) => (typeof value === "string" ? value.trim() : "");

export const createContact = async (req, res, next) => {
  try {
    const payload = {
      name: sanitizeText(req.body.name),
      email: sanitizeText(req.body.email),
      phone: sanitizeText(req.body.phone),
      service: sanitizeText(req.body.service),
      message: sanitizeText(req.body.message),
    };

    const contact = await Contact.create(payload);

    res.status(201).json({
      success: true,
      message: "Thanks! Your project enquiry has been received.",
      data: {
        id: contact._id,
        name: contact.name,
        service: contact.service,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const query = buildListQuery(req, ["name", "email", "phone", "service", "message"]);
    await sendPaginated(res, Contact, query);
  } catch (error) {
    next(error);
  }
};

export const markContactRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }

    res.json({ success: true, message: "Message marked as read.", data: contact });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }

    res.json({ success: true, message: "Message deleted." });
  } catch (error) {
    next(error);
  }
};
