import express from "express";
import statisticController from "../DataController/statisticController.js";
import barChartController from "../DataController/barChartController.js";
import combinedDataController from "../DataController/combinedDataController.js";
import transactions from "../DataController/transactions.js";
import paiChartController from "../DataController/paiChartController.js";
const router = express.Router();
router.get("/transactions", transactions);
router.get("/statistics", statisticController);
router.get("/barChart", barChartController);
router.get("/paiChart", paiChartController);
router.get("/combinedData", combinedDataController);
export default router;

