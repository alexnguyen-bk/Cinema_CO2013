import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD } = process.env;

const config = {
  host: SQL_SERVER,
  database: SQL_DATABASE,
  user: SQL_USER,
  password: SQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
console.log({ SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD });
const db = mysql.createPool(config);

// Kiểm tra kết nối khi khởi động server
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Connected to the MySQL database!");
    connection.release();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}
testConnection();

export { db };
