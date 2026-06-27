import Contact from "../models/Contact.js";
import PricingPlan from "../models/PricingPlan.js";
import Testimonial from "../models/Testimonial.js";
import Work from "../models/Work.js";

export const getDashboard = async (_req, res, next) => {
  try {
    const [
      totalWorks,
      totalPricing,
      totalMessages,
      pendingTestimonials,
      approvedTestimonials,
      recentEnquiries,
      recentReviews,
    ] = await Promise.all([
      Work.countDocuments(),
      PricingPlan.countDocuments(),
      Contact.countDocuments(),
      Testimonial.countDocuments({ status: "Pending" }),
      Testimonial.countDocuments({ status: "Approved" }),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      Testimonial.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalWorks,
          totalPricing,
          totalMessages,
          pendingTestimonials,
          approvedTestimonials,
        },
        recentEnquiries,
        recentReviews,
      },
    });
  } catch (error) {
    next(error);
  }
};
