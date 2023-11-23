const jwt = require("jwt-simple");
const moment = require("moment");
const { SECRET_TOKEN } = require("../config");

module.exports.generateToken = (userId, userName, userEmail, admin) =>
  jwt.encode(
    {
      userId,
      userName,
      userEmail,
      admin,
      iat: moment().unix(),
      exp: moment().add(21, "days").unix(),
    },
    SECRET_TOKEN
  );

module.exports.decodeToken = (token) =>
  new Promise((resolve, reject) => {
    try {
      const { userId, admin, n_pr } = jwt.decode(token, SECRET_TOKEN);
      resolve({ userId, admin, n_pr });
    } catch (error) {
      reject("Token no válido");
    }
  });
