import { Router } from "express";
import errorMsg from "../utils/errorMsg.js";
import playService from "../services/playService.js";
import userService from "../services/userService.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const playController = Router();

playController.get("/create", authMiddleware.isAuth, (req, res) => {
  res.render("play/create");
});
playController.post("/create", authMiddleware.isAuth, async (req, res) => {
  const playData = req.body;
  const userId = req.user.id;

  try {
    // if (playData.title === "") {
    //   throw new Error("Title should not be empty");
    // } else if (playData.description === "") {
    //   throw new Error("Description should not be empty");
    // }

    let isPublic = playData.isPublic === "on" ? true : false;
    await playService.create(playData, isPublic, userId);
    res.redirect("/");
  } catch (err) {
    const error = errorMsg(err);
    res.render("play/create", { error, data: playData });
  }
});

playController.get("/:playId/like", authMiddleware.isAuth, async (req, res) => {
  const playId = req.params.playId;
  const userId = req.user?.id;

  try {
    const play = await playService.getOne(playId);

    const isOwner = String(play.owner) === userId;

    if (isOwner) {
      throw new Error("You are owner of the play. You cannot like this Play!");
    }

    await playService.update(playId, userId);
    await userService.update(userId, playId);

    res.redirect(`/plays/${playId}/details`);
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
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

playController.get("/:playId/edit", authMiddleware.isAuth, async (req, res) => {
  const playId = req.params.playId;
  const userId = req.user?.id;

  try {
    const play = await playService.getOne(playId);

    const isOwner = String(play.owner) === userId;
    if (!isOwner) {
      throw new Error("You aren't the owner of the play! Cannot edit");
    }

    res.render("play/edit-theater", { play });
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});
playController.post(
  "/:playId/edit",
  authMiddleware.isAuth,
  async (req, res) => {
    const playId = req.params.playId;
    const playData = req.body;

    const isPublic = playData.isPublic === "on" ? true : false;

    try {
      await playService.updateOne(playId, playData, isPublic);

      res.redirect(`/plays/${playId}/details`);
    } catch (err) {
      const error = errorMsg(err);
      res.render("play/edit-theater", { error, data: playData });
    }
  }
);
playController.get("/:playId/delete", async (req, res) => {
  const playId = req.params.playId;
  const userId = req.user.id;

  try {
    const play = await playService.getOne(playId);
    const isOwner = String(play.owner) === userId;

    if (!isOwner) {
      throw new Error("You cannot delete this play! Only owner can do it.");
    }

    await playService.remove(playId);

    res.redirect("/");
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});

export default playController;
