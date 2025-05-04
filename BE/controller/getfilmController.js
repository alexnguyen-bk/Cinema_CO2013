import { db } from "../database/db.js";

async function getTopFilms(req, res) {
  const { date } = req.body;

  try {
    if (!date) {
      throw new Error("Ngày không được để trống");
    }

    // Gọi stored function GetTopPhim
    const [rows] = await db.execute(
      `SELECT *
       FROM JSON_TABLE(
           GetTopPhim(?),
           '$[*]' 
           COLUMNS (
               TuaDe VARCHAR(30) PATH '$.TuaDe',
               DoanhThu INT PATH '$.DoanhThu'
           )
       ) AS TopPhim`,
      [date]
    );

    res.status(200).json({
      result: rows,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      success: false,
    });
  }
}

export { getTopFilms }