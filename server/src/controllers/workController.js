import Work from "../models/Work.js";
import { buildListQuery, sendPaginated } from "../utils/query.js";

const normalizeStatus = (status) => {
  if (!status) return "active";
  if (status === "Published") return "active";
  if (status === "Draft") return "draft";
  return String(status).toLowerCase();
};

const workPayload = (body, file, existingWork = null) => {
  const liveLink = body.liveLink ?? body.liveUrl ?? existingWork?.liveLink ?? "";
  const githubLink = body.githubLink ?? body.githubUrl ?? existingWork?.githubLink ?? "";

  return {
    title: body.title ?? existingWork?.title,
    category: body.category ?? existingWork?.category,
    description: body.description ?? existingWork?.description,
    resultText: body.resultText ?? existingWork?.resultText,
    image: file ? `/uploads/${file.filename}` : body.image || existingWork?.image || "",
    liveLink,
    githubLink,
    status: normalizeStatus(body.status ?? existingWork?.status),
    featured: body.featured === "true" || body.featured === true,
  };
};

export const getWorks = async (req, res, next) => {
  try {
    const query = buildListQuery(req, ["title", "category", "description"]);
    const publicOnly =
      req.query.admin === "true"
        ? {}
        : { status: { $in: ["active", "Published"] } };
    await sendPaginated(res, Work, query, publicOnly);
  } catch (error) {
    next(error);
  }
};

export const createWork = async (req, res, next) => {
  try {
    const work = await Work.create(workPayload(req.body, req.file));
    res.status(201).json({ success: true, message: "Project added.", data: work });
  } catch (error) {
    next(error);
  }
};

export const updateWork = async (req, res, next) => {
  try {
    const existingWork = await Work.findById(req.params.id);

    if (!existingWork) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    const work = await Work.findByIdAndUpdate(req.params.id, workPayload(req.body, req.file, existingWork), {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: "Project updated.", data: work });
  } catch (error) {
    next(error);
  }
};

export const deleteWork = async (req, res, next) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);

    if (!work) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.json({ success: true, message: "Project deleted." });
  } catch (error) {
    next(error);
  }
};
