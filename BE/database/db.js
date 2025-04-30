import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const { SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD } = process.env;

const config = {
  host: SQL_SERVER,      // Thay 'server' thành 'host' trong cấu hình của MySQL
  database: SQL_DATABASE,
  user: SQL_USER,
  password: SQL_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // Nếu bạn muốn sử dụng SSL
  },
};

const db = mysql.createConnection(config);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database!");
});

export { db };
