import Settings from "../models/Settings.js";

const getSettingsDoc = async () => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return settings;
};

export const getPublicSettings = async (_req, res, next) => {
  try {
    const settings = await getSettingsDoc();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settings = await getSettingsDoc();
    const fields = ["websiteName", "tagline", "email", "whatsapp", "website", "location"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) settings[field] = req.body[field];
    });
    if (req.file) settings.logo = `/uploads/${req.file.filename}`;
    if (req.body.socialLinks) {
      settings.socialLinks = {
        ...settings.socialLinks,
        ...JSON.parse(req.body.socialLinks),
      };
    }
    await settings.save();
    res.json({ success: true, message: "Settings updated.", data: settings });
  } catch (error) {
    next(error);
  }
};
