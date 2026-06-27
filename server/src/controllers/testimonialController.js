import Testimonial from "../models/Testimonial.js";
import { buildListQuery, sendPaginated } from "../utils/query.js";

const testimonialPayload = (body, file) => ({
  name: body.name,
  email: body.email,
  business: body.business || "",
  project: body.project,
  rating: Number(body.rating),
  message: body.message,
  photo: file ? `/uploads/${file.filename}` : body.photo,
  status: body.status || "Pending",
  featured: body.featured === "true" || body.featured === true,
});

export const getApprovedTestimonials = async (_req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ status: "Approved" })
      .sort({ featured: -1, createdAt: -1 })
      .limit(12);
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const submitTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(testimonialPayload(req.body, req.file));
    res.status(201).json({
      success: true,
      message: "Thank you! Your review has been submitted successfully. It will be visible after admin approval.",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const getTestimonials = async (req, res, next) => {
  try {
    const query = buildListQuery(req, ["name", "business", "project", "message"]);
    const statusFilter = req.query.status ? { status: req.query.status } : {};
    await sendPaginated(res, Testimonial, query, statusFilter);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      testimonialPayload(req.body, req.file),
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }

    res.json({ success: true, message: "Review updated.", data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }

    res.json({ success: true, message: "Review deleted." });
  } catch (error) {
    next(error);
  }
};

export const setTestimonialStatus = (status) => async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }

    res.json({ success: true, message: `Review marked ${status.toLowerCase()}.`, data: testimonial });
  } catch (error) {
    next(error);
  }
};
