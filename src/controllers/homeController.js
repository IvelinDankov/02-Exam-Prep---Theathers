import { Router } from "express";
import playService from "../services/playService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  const plays = await playService.getAll();
  res.render("home", { plays });
});

export default homeController;
