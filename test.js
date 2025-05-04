import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.SQL_SERVER);
const { SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD } = process.env;

console.log({ SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD });