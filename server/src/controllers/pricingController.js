import PricingPlan from "../models/PricingPlan.js";
import { buildListQuery, sendPaginated } from "../utils/query.js";

const parseFeatures = (features) => {
  if (Array.isArray(features)) return features;
  if (typeof features === "string") {
    return features
      .split("\n")
      .map((feature) => feature.trim())
      .filter(Boolean);
  }
  return [];
};

const pricingPayload = (body) => ({
  name: body.name,
  price: body.price,
  description: body.description,
  features: parseFeatures(body.features),
  buttonText: body.buttonText || "Start Project",
  popular: body.popular === "true" || body.popular === true,
  active: body.active === "false" || body.active === false ? false : true,
  sortOrder: Number(body.sortOrder) || 0,
});

export const getPricing = async (req, res, next) => {
  try {
    const query = buildListQuery(req, ["name", "description"]);
    query.sort = { sortOrder: 1, createdAt: 1 };
    const activeOnly = req.query.public === "true" ? { active: true } : {};
    await sendPaginated(res, PricingPlan, query, activeOnly);
  } catch (error) {
    next(error);
  }
};

export const createPricing = async (req, res, next) => {
  try {
    const plan = await PricingPlan.create(pricingPayload(req.body));
    res.status(201).json({ success: true, message: "Pricing plan added.", data: plan });
  } catch (error) {
    next(error);
  }
};

export const updatePricing = async (req, res, next) => {
  try {
    const plan = await PricingPlan.findByIdAndUpdate(req.params.id, pricingPayload(req.body), {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      return res.status(404).json({ success: false, message: "Pricing plan not found." });
    }

    res.json({ success: true, message: "Pricing plan updated.", data: plan });
  } catch (error) {
    next(error);
  }
};

export const deletePricing = async (req, res, next) => {
  try {
    const plan = await PricingPlan.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res.status(404).json({ success: false, message: "Pricing plan not found." });
    }

    res.json({ success: true, message: "Pricing plan deleted." });
  } catch (error) {
    next(error);
  }
};
