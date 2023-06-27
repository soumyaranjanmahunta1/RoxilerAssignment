import Product from "../model/ProductSchema.js";

const barChartController = async (req, res) => {
  try {
    let { month } = req.params;

    console.log(typeof month);
    if (month < 10) {
      month = `0${month}`;
    }

    const barChartData = await Product.aggregate([
      {
        $match: {
          dateOfSale: { $regex: `.*-${month}-.*` },
        },
      },
      {
        $group: {
          _id: {
            $concat: [
              { $cond: [{ $lte: ["$price", 100] }, "0 - 100", ""] },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 100] }, { $lte: ["$price", 200] }],
                  },
                  "101 - 200",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 200] }, { $lte: ["$price", 300] }],
                  },
                  "201 - 300",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 300] }, { $lte: ["$price", 400] }],
                  },
                  "301 - 400",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 400] }, { $lte: ["$price", 500] }],
                  },
                  "401 - 500",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 500] }, { $lte: ["$price", 600] }],
                  },
                  "501 - 600",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 600] }, { $lte: ["$price", 700] }],
                  },
                  "601 - 700",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 700] }, { $lte: ["$price", 800] }],
                  },
                  "701 - 800",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 800] }, { $lte: ["$price", 900] }],
                  },
                  "801 - 900",
                  "",
                ],
              },
              { $cond: [{ $gt: ["$price", 900] }, "901-above", ""] },
            ],
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(barChartData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default barChartController;
