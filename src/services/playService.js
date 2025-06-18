import Play from "../models/playModel.js";

export default {
  create(data, isPublic) {
    return Play.create({
      ...data,
      createdAt: Date(),
      isPublic,
    });
  },
  getAll() {
    return Play.find();
  },
};
