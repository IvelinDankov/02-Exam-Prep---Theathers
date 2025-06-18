import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import playController from "./controllers/playController.js";

const routes = Router();

routes.use(homeController);
routes.use("/users", userController);
routes.use("/plays", playController);
routes.use((req, res, next) => {
  res.status(404).render("404");
});

export default routes;
