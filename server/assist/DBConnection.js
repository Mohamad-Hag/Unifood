const mysql = require("mysql");

class DBConnection {  
  static connect() {
    const db = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "unifood",
    });
    return db;
  }
}

module.exports = { DBConnection };
