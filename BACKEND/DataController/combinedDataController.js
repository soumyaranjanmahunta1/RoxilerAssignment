import axios from "axios";

const combinedDataController = async (req, res) => {
    try {
        let { month } = req.query;
        let chartmonth = req.params;
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        const PORT = 8000;
        const transactions = await axios.get(
          `http://localhost:${PORT}/transactions?month=${month}&page=${page}&limit=${limit}`
        );
        const statistics = await axios.get(
          `http://localhost:${PORT}/statistics?month=${month}`
        );
        const barChartData = await axios.get(
          `http://localhost:${PORT}/bar-chart?month=${chartmonth}`
        );
        
        const combinedData = {
            transactions: transactions.data,
            statistics: statistics.data,
            barChartData: barChartData.data,
        };

        res.json(combinedData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }

};
export default combinedDataController;