import { Router } from "express";
import errorMsg from "../utils/errorMsg.js";
import playService from "../services/playService.js";
import userService from "../services/userService.js";

const playController = Router();

playController.get("/create", (req, res) => {
  res.render("play/create");
});
playController.post("/create", async (req, res) => {
  const playData = req.body;
  const userId = req.user.id;

  try {
    let isPublic = playData.isPublic === "on" ? true : false;
    await playService.create(playData, isPublic, userId);
    res.redirect("/");
  } catch (err) {
    const error = errorMsg(err);
    res.render("play/create", { error, data: playData });
  }
});

playController.get("/:playId/details", async (req, res) => {
  const playId = req.params.playId;
  const userId = req.user?.id;
  try {
    const play = await playService.getOne(playId);
    const isOwner = String(play.owner) === userId;
    const liked = play.likes.includes(userId);
    res.render("play/theater-details", { play, isOwner, liked });
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});

playController.get("/:playId/like", async (req, res) => {
  const playId = req.params.playId;
  const userId = req.user?.id;

  await playService.update(playId, userId);
  await userService.update(userId, playId);

  res.redirect(`/plays/${playId}/details`);
});

export default playController;
