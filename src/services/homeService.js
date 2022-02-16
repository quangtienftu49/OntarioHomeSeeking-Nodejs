import db from "../models/index";

let getAllCities = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let cities = await db.City.findAll({
        // where: { roleId: "R2" },
      });

      resolve({
        errCode: 0,
        data: cities,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let postHomelisting = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.address ||
        !inputData.cityId ||
        !inputData.price ||
        !inputData.phoneNumber ||
        !inputData.description
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Home_listing.create({
          price: inputData.price,
          address: inputData.address,
          description: inputData.description,
          phoneNumber: inputData.phoneNumber,
          userId: inputData.userId,
          cityId: inputData.cityId,
          province: inputData.province,
          image: inputData.image,
        });
      }

      resolve({
        errCode: 0,
        errMessage: "Save homelisting successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHomelistings = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let homelistings = "";

      if (inputId === "ALL") {
        homelistings = await db.Home_listing.findAll();
      }
      // if (inputId && inputId !== "ALL") {
      //   users = await db.Home_listing.findOne({
      //     where: { id: userId },
      //     attributes: {
      //       exclude: ["password"],
      //     },
      //   });
      // }

      resolve(homelistings);
    } catch (e) {
      reject(e);
    }
  });
};

let handleDeleteHomelisting = (homelistingId) => {
  return new Promise(async (resolve, reject) => {
    let homelisting = await db.Home_listing.findOne({
      where: { id: homelistingId },
    });

    if (!homelisting) {
      resolve({
        errCode: 2,
        errMessage: "The home listing does not exist",
      });
    }

    await db.Home_listing.destroy({
      where: { id: homelistingId },
    });

    resolve({
      errCode: 0,
      errMessage: "Deleted successfully!",
    });
  });
};

module.exports = {
  getAllCities: getAllCities,
  postHomelisting: postHomelisting,
  getAllHomelistings: getAllHomelistings,
  handleDeleteHomelisting: handleDeleteHomelisting,
};
