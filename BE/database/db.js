const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '25022005',
  database: 'Cinema',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Kết nối CSDL thất bại:', err.message);
  } else {
    console.log('✅ Kết nối CSDL thành công');
  }
});

module.exports = db;
