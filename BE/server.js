const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Import cors
const app = express();
const port = 3000;

app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Phuctqt123@',
  database: 'CGV_BTL'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Kết nối CSDL thất bại:', err.message);
  } else {
    console.log('✅ Kết nối CSDL thành công');
  }
});
let function_Procedure_Names = [];

function getFunction_Procedure_FromDatabase() {
  const query = `
    SELECT ROUTINE_NAME, ROUTINE_TYPE
    FROM information_schema.routines
    WHERE ROUTINE_SCHEMA = 'CGV_BTL';`; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn các hàm:', err);
      return;
    }
    
    function_Procedure_Names = results.map(row => row.ROUTINE_NAME);
    console.log('Danh sách các hàm vaf thủ tục:', function_Procedure_Names);
  });
}
getFunction_Procedure_FromDatabase();
// API gọi hàm SQL
function callStoredProcedure(procName, params, res) {
  
    if (!function_Procedure_Names.includes(procName)) {
      return res.status(400).json({ error: 'Thủ tục không hợp lệ hoặc không được phép gọi' });
    }
  
    // Tạo chuỗi CALL với số lượng dấu hỏi tương ứng tham số
    const placeholders = params.map(() => '?').join(', ');
    const sql = `CALL ${procName}(${placeholders})`;
  
    console.log(`Gọi thủ tục: ${procName} với tham số:`, params);
  
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error(`Lỗi khi gọi thủ tục ${procName}:`, err);
        return res.status(500).json({ error: 'Lỗi khi gọi thủ tục SQL', message: err.message });
      }
  
      console.log(`Kết quả từ thủ tục ${procName}:`, results);
      res.json(results[0]); 
    });
  }  
app.get('/call-function', (req, res) => {
    const procName = req.query.proc; 
    const params = req.query.params ? JSON.parse(req.query.params) : []; 
    callStoredProcedure(procName, params, res);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
