import express from "express";
// import homeController from "../controllers/homeController";
// import userController from "../controllers/userController";
// import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {
  // router.get("/", homeController.getHomePage);

  return app.use("/", router);
};

module.exports = initWebRoutes;
