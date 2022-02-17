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

let updateHomelisting = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.address ||
        !data.price ||
        !data.cityId ||
        !data.description ||
        !data.phoneNumber
      ) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let homelisting = await db.Home_listing.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (homelisting) {
        homelisting.address = data.address;
        homelisting.price = data.price;
        homelisting.cityId = data.cityId;
        homelisting.description = data.description;
        homelisting.phoneNumber = data.phoneNumber;
        homelisting.province = data.province;
        if (data.image) {
          homelisting.image = data.image;
        }

        await homelisting.save({
          // firstName: data.firstName,
          // lastName: data.lastName,
          // address: data.address,
        });

        resolve({
          errCode: 0,
          message: "Update the home listing successfully!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "The home listing not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getHomelistingByCityId = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Home_listing.findOne({
          where: { cityId: inputId },
          //join tables
          // attributes: {
          //   exclude: ["password"],
          // },
          // include: [
          //   {
          //     model: db.Markdown,
          //     attributes: ["description", "contentHTML", "contentMarkdown"],
          //   },
          //   {
          //     model: db.Allcode,
          //     as: "positionData",
          //     attributes: ["valueEn", "valueVi"],
          //   },
          // ],
          // raw: false,
          // nest: true,
        });

        //convert buffer to base64 in Nodejs before transferring to Reactjs
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }

        //avoid undefined error
        if (!data) {
          data = {};
        }

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCities: getAllCities,
  postHomelisting: postHomelisting,
  getAllHomelistings: getAllHomelistings,
  handleDeleteHomelisting: handleDeleteHomelisting,
  updateHomelisting: updateHomelisting,
  getHomelistingByCityId: getHomelistingByCityId,
};
