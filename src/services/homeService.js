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

module.exports = {
  getAllCities: getAllCities,
  postHomelisting: postHomelisting,
};
