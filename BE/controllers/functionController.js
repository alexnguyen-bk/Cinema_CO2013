const db = require('../database/db');

let function_Procedure_Names = [];

function getFunction_Procedure_FromDatabase() {
  const query = `
    SELECT ROUTINE_NAME, ROUTINE_TYPE
    FROM information_schema.routines
    WHERE ROUTINE_SCHEMA = 'CINEMA';`; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn các hàm:', err);
      return;
    }
    
    function_Procedure_Names = results.map(row => row.ROUTINE_NAME);
    console.log('Danh sách các hàm và thủ tục:', function_Procedure_Names);
  });
}

function callStoredProcedure(procName, params, res) {
  if (!function_Procedure_Names.includes(procName)) {
    return res.status(400).json({ error: `Thủ tục ${procName} không hợp lệ hoặc không được phép gọi` });
  }

  const placeholders = params.map(() => '?').join(', ');
  const sql = `CALL ${procName}(${placeholders})`;

  console.log(`Gọi thủ tục: ${procName} với tham số:`, params);

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(`Lỗi khi gọi thủ tục ${procName}:`, err);
      return res.status(500).json({ error: 'Lỗi khi gọi thủ tục SQL', message: err.message });
    }
    res.json(results[0]); 
  });
}

function callStoredFunction(procName, params, res) {
  if (!function_Procedure_Names.includes(procName)) {
    return res.status(400).json({ error: `Hàm ${procName} không hợp lệ hoặc không được phép gọi` });
  }

  const placeholders = params.map(() => '?').join(', ');
  const sql = `SELECT ${procName}(${placeholders})`;

  console.log(`Gọi thủ tục: ${procName} với tham số:`, params);
  
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(`Lỗi khi gọi hàm ${procName}:`, err);
      return res.status(500).json({ error: 'Lỗi khi gọi hàm SQL', message: err.message });
    }

    console.log(`Kết quả từ hàm ${procName}:`, results);
    res.json(results); 
  });
}

function callStoredFunctionJason(procName, params, res) {
  if (!function_Procedure_Names.includes(procName)) {
    return res.status(400).json({ error: `Hàm ${procName} không hợp lệ hoặc không được phép gọi` });
  }

  const placeholders = params.map(() => '?').join(', ');
  let sql;
  
  if(procName=='GetTopPhim'){
    sql = `SELECT * FROM JSON_TABLE(
      ${procName}(${placeholders}),
      '$[*]' 
      COLUMNS (
          TuaDe VARCHAR(30) PATH '$.TuaDe',
          DoanhThu INT PATH '$.DoanhThu'
      )
    ) AS result_table`;
  }
  else if(procName=='ThongKeDoanhThuTheoKhoangNgay'){
    sql = `SELECT * FROM JSON_TABLE(
      ${procName}(${placeholders}),
      '$[*]' COLUMNS (
        TenRap VARCHAR(30) PATH '$.TenRap',
        TinhThanh VARCHAR(25) PATH '$.TinhThanh',
        DiaChi VARCHAR(50) PATH '$.DiaChi',
        DoanhThu INT PATH '$.DoanhThu'
        )
      ) AS DoanhThuTheoRap;`;
  }
  
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(`Lỗi khi gọi hàm ${procName}:`, err);
      return res.status(500).json({ error: 'Lỗi khi gọi hàm SQL', message: err.message });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'Không có dữ liệu trả về từ thủ tục' });
    }

    console.log(`Kết quả từ hàm ${procName}:`,results );
    res.json(results);
  });
}

function callinsertShowtime(procName, params, res) {
  const placeholders = params.map(() => '?').join(', ');
  const sql = `CALL ${procName}(${placeholders})`;
  
  if (!params || params.length !== 7 || params.some(p => p === undefined || p === null || p === '')) {
    return res.status(400).json({
      error: "Missing or invalid input data",
      success: false,
    });
  }

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error(`❌ Lỗi khi thực thi thủ tục ${procName}:`, err);
      return res.status(500).json({
        error: err.message,
        success: false,
      });
    }

    const message = rows?.[0]?.[0]?.message || rows?.[0]?.[0]?.ThongBao || "Thêm suất chiếu thành công!";
    res.status(200).json({
      message: message,
      result: rows,
      success: true,
    });
  });
}

function callupdateShowtime(procName, params, res) {
  const placeholders = params.map(() => '?').join(', ');
  const sql = `CALL ${procName}(${placeholders})`;

  const [showtime_id, movie_format, language, date, start_time, cinema_id, room_number, movie_id] = params;

  if (showtime_id === undefined || showtime_id === null) {
    return res.status(400).json({
      error: "showtime_id is required",
      success: false,
    });
  }
  
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error(`❌ Lỗi khi thực thi thủ tục ${procName}:`, err);
      return res.status(500).json({
        error: err.message,
        success: false,
      });
    }
    const message = rows?.[0]?.[0]?.message || rows?.[0]?.[0]?.ThongBao || "Cập nhật suất chiếu thành công!";
    res.status(200).json({
      message: message,
      result: rows,
      success: true,
    });
  });
}

function calldeleteShowtime(procName, params, res) {
  const [showtime_id] = params;

  if (showtime_id === undefined || showtime_id === null || isNaN(showtime_id)) {
    return res.status(400).json({
      error: "showtime_id is required and must be a number",
      success: false,
    });
  }

  const placeholders = params.map(() => '?').join(', ');
  const sql = `CALL ${procName}(${placeholders})`;

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error(`❌ Lỗi khi thực thi thủ tục ${procName}:`, err);
      return res.status(500).json({
        error: err.message,
        success: false,
      });
    }

    const message = rows?.[0]?.[0]?.message || rows?.[0]?.[0]?.ThongBao;

    if (message === "Xóa suất chiếu thành công!") {
      return res.status(200).json({
        message: message,
        result: rows,
        success: true,
      });
    } else {
      return res.status(404).json({
        error: message || "Không tìm thấy suất chiếu để xóa",
        success: false,
      });
    }
  });
}

module.exports = {
  getFunction_Procedure_FromDatabase,
  callStoredProcedure,
  callStoredFunction,
  callStoredFunctionJason,
  callinsertShowtime,
  callupdateShowtime,
  calldeleteShowtime
}; 