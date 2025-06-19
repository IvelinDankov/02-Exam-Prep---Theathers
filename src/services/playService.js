import Play from "../models/playModel.js";

export default {
  create(data, isPublic, userId) {
    return Play.create({
      ...data,
      createdAt: Date(),
      isPublic,
      owner: userId,
    });
  },
  getAll() {
    return Play.find();
  },
};
