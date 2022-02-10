// import req from "express/lib/request";
// import db from "../models/index";
// import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  return res.render("homepage.ejs");
  // try {

  //   // let data = await db.User.findAll();
  //   // return res.render("homepage.ejs", {
  //   //   data: JSON.stringify(data),
  //   // });
  // } catch (e) {
  //   console.log(e);
  // }
};

module.exports = {
  getHomePage: getHomePage,
};
