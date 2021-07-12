const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();
const db = DBConnection.connect();

let responseData = {
  message: "",
  data: [],
  hasError: false,
};

router.post("/", (req, res) => {
  let id = req.body.id;
  let pid = req.body.pid;
  let text = req.body.text;

  let command = `INSERT INTO review (Text, CustomerID, ProductID) VALUES ('${text}', (SELECT ID from customer WHERE UserID = ${id}), ${pid})`;  

  db.query(command, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    responseData.message = "Process completed successfully!";    
    res.send(responseData);
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}

module.exports = router;
