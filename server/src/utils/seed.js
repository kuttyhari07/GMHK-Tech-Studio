import Admin from "../models/Admin.js";
import Settings from "../models/Settings.js";

export const seedInitialData = async () => {
  const adminCount = await Admin.countDocuments();

  if (adminCount === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    await Admin.create({
      name: "GMHK Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log(`Default admin created: ${process.env.ADMIN_EMAIL}`);
  }

  if ((await Settings.countDocuments()) === 0) {
    await Settings.create({});
    console.log("Default settings created");
  }
};
