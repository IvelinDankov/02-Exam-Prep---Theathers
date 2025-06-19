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
    return Play.find({ isPublic: true });
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
  sortByDate() {
    return Play.find().sort({ createdAt: -1 });
  },
  sortByLikes() {
    // let result = await Play.find();

    // result = result.sort((a, b) => b.likes.length - a.likes.length);

    // return result;

    return Play.aggregate([
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      {
        $sort: { likesCount: -1 },
      },
    ]);
  },
};
