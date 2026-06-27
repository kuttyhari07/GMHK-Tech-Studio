export const buildListQuery = (req, searchableFields = []) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

  const filter = {};

  if (search && searchableFields.length > 0) {
    filter.$or = searchableFields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    }));
  }

  return {
    page,
    limit,
    skip,
    sort: { [sortBy]: order },
    filter,
  };
};

export const sendPaginated = async (res, model, queryConfig, extraFilter = {}) => {
  const filter = { ...queryConfig.filter, ...extraFilter };
  const [items, total] = await Promise.all([
    model.find(filter).sort(queryConfig.sort).skip(queryConfig.skip).limit(queryConfig.limit),
    model.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: {
      page: queryConfig.page,
      limit: queryConfig.limit,
      total,
      pages: Math.ceil(total / queryConfig.limit) || 1,
    },
  });
};
