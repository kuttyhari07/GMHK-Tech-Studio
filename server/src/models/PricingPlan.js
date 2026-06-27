import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    price: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 600 },
    features: [{ type: String, trim: true, maxlength: 160 }],
    buttonText: { type: String, trim: true, default: "Start Project" },
    popular: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

pricingPlanSchema.index({ name: "text", description: "text" });

export default mongoose.model("PricingPlan", pricingPlanSchema);
