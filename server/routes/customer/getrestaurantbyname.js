const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();

const db = DBConnection.connect();

let responseData = {
  message: "",
  data: [],
  hasError: false,
};
let restaurants = [];

router.post("/", (req, res) => {    
  let name = req.body.name;
  let command = "SELECT r.*, u.Name FROM restaurant r, user u WHERE LOWER(u.Name) = ? AND u.ID = r.UserID";
  db.query(command, [name], (err, result, fields) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    res.send(JSON.stringify(result[0]));
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}
module.exports = router;
