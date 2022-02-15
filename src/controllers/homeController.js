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

module.exports = {
  getHomePage: getHomePage,
  getAllCities: getAllCities,
  postHomelisting: postHomelisting,
};
