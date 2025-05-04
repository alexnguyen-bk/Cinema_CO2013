import express from "express";
import { getTopFilms } from "../controller/getfilmController.js";

const router = express.Router();

// Đổi route path để tránh conflict
router.post("/top-films", getTopFilms);

export default router;