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
    return Play.find({ isPublic: true }).sort({ createdAt: -1 });
  },
  getOne(playId) {
    return Play.findById(playId);
  },
  update(playId, userId) {
    return Play.findByIdAndUpdate(playId, { $addToSet: { likes: userId } });
  },
  updateOne(id, newData, isPublic) {
    return Play.findByIdAndUpdate(id, { ...newData, isPublic });
  },
  remove(id) {
    return Play.findByIdAndDelete(id);
  },
};
