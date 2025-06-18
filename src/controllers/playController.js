import { Router } from "express";
import errorMsg from "../utils/errorMsg.js";
import playService from "../services/playService.js";

const playController = Router();

playController.get("/create", (req, res) => {
  res.render("play/create");
});
playController.post("/create", async (req, res) => {
  const playData = req.body;

  let isPublic = false;

  try {
    if (playData.isPublic === "") {
      isPublic = true;
    }
    await playService.create(playData, isPublic);
    res.redirect("/");
  } catch (err) {
    const error = errorMsg(err);
    res.render("play/create", { error, data: playData });
  }
});

export default playController;
