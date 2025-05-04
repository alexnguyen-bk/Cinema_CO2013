import { Router } from "express";
import { insertShowtime, updateShowtime, deleteShowtime, getallShowTime} from "../controller/showTimeController.js"; 

const router = Router();

// POST routes
router.post("/insert-showtime", insertShowtime);
router.post("/update-showtime", updateShowtime);
router.delete("/delete-showtime/:showtime_id", deleteShowtime);
router.get("/getall-showtime", getallShowTime);

export default router;
