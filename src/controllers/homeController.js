import req from "express/lib/request";
import db from "../models/index";
import homeService from "../services/homeService";
// import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  // return res.render("homepage.ejs");
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAllCities = async (req, res) => {
  try {
    let cities = await homeService.getAllCities();
    return res.status(200).json(cities);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server!",
    });
  }
};

let postHomelisting = async (req, res) => {
  try {
    let response = await homeService.postHomelisting(req.body);
    console.log("check res", response);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server!",
    });
  }
};

let getAllHomelistings = async (req, res) => {
  let id = req.query.id; //ALL, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let homelistings = await homeService.getAllHomelistings(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    homelistings,
  });
};

let handleDeleteHomelisting = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await homeService.handleDeleteHomelisting(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  getHomePage: getHomePage,
  getAllCities: getAllCities,
  postHomelisting: postHomelisting,
  getAllHomelistings: getAllHomelistings,
  handleDeleteHomelisting: handleDeleteHomelisting,
};
