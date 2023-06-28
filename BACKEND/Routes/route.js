import express from "express";
import statisticController from "../DataController/statisticController.js";
import tranjaction from "../DataController/tranjaction.js";
import barChartController from "../DataController/barChartController.js";
import combinedDataController from "../DataController/combinedDataController.js";
const router = express.Router();
router.get("/transactions", tranjaction);
router.get("/statistics", statisticController);
router.get("/barChart", barChartController);
router.get("/combinedData", combinedDataController);
export default router;

