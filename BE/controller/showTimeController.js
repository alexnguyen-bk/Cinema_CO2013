import { db } from "../database/db.js";
import { formatIsoDate, formatIsoDateToTime } from "../utils/formatTime.js";










async function getallShowTime(req, res) {
  try {
    const [rows] = await db.execute("CALL get_all_showtimes()");
    
    const resultData = rows[0].map((item) => ({
      ...item,
      NgayBatDau: formatIsoDate(item.NgayBatDau),
    }));
    res.status(200).json({
      result: resultData,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      success: false,
    });
  }
}

export { insertShowtime, updateShowtime, deleteShowtime, getallShowTime };
