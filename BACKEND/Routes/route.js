import express from "express";
import statisticController from "../DataController/statisticController.js";
import tranjaction from "../DataController/tranjaction.js";
import barChartController from "../DataController/barChartController.js";
const router = express.Router();
router.get("/transactions", tranjaction);
router.get("/statistics", statisticController)
router.get("/bar-chart/:month", barChartController)


export default router;