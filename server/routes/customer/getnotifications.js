const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();
const db = DBConnection.connect();
const generateTimeRemining = require("../../assist/generateTimeRemining");

router.post("/", (req, res) => {
  let id = parseInt(req.body.id);

  let command = `SELECT * FROM notification WHERE UserID = ${id} ORDER BY Date DESC LIMIT 10`;
  db.query(command, (err, result, fields) => {
    if (err) {
      console.error(err.message);
    }
    let notifications = "[";
    result.forEach((notification) => {
      let description = notification.Text;
      let from = notification.Sender;
      let isRead = notifications.IsRead == 0 ? false : true;      
      let d = Date.parse(notification.Date.toString());
      let now = new Date().getTime();
      let left = generateTimeRemining(d, now);
      let days = left.days;
      let hours = left.hours;
      let minutes = left.minutes;      
      let time = `${days}d ${hours}h ${minutes}m`;      
      notifications += `{ "from": "${from}", "description": "${description}", "isRead": ${isRead}, "time": "${time}" },`;
    });
    notifications = notifications.replace(/.$/, "]");
    res.send(notifications);
  });
});
module.exports = router;
