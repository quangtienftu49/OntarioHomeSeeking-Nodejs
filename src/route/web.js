import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/api/get-all-cities", homeController.getAllCities);
  router.post("/api/save-homelisting", homeController.postHomelisting);
  router.get("/api/get-all-homelistings", homeController.getAllHomelistings);

  return app.use("/", router);
};

module.exports = initWebRoutes;
