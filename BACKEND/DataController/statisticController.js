import Product from "../model/ProductSchema.js";
const statisticController = async (req, res) => {
  try {
    let numonth = 0;
    let { month } = req.query;
    if (month == "january") {
      numonth = 1;
    } else if (month == "february") {
      numonth = 2;
    } else if (month == "march") {
      numonth = 3;
    } else if (month == "april") {
      numonth = 4;
    } else if (month == "may") {
      numonth = 5;
    } else if (month == "june") {
      numonth = 6;
    } else if (month == "july") {
      numonth = 7;
    } else if (month == "august") {
      numonth = 8;
    } else if (month == "september") {
      numonth = 9;
    } else if (month == "october") {
      numonth = 10;
    } else if (month == "november") {
      numonth = 11;
    } else if (month == "december") {
      numonth = 12;
    }
    if (numonth < 10) {
      numonth = `0${numonth}`;
    }
    const totalSaleAmount = await Product.aggregate([
      {
        $match: {
          dateOfSale: { $regex: `.*-${numonth}-.*` },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
        },
      },
    ]);

    const totalSoldItems = await Product.countDocuments({
      dateOfSale: { $regex: `.*-${numonth}-.*` },
      sold: true,
    });

    const totalUnsoldItems = await Product.countDocuments({
      dateOfSale: { $regex: `.*-${numonth}-.*` },
      sold: false,
    });

    res.json({ totalSaleAmount, totalSoldItems, totalUnsoldItems });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default statisticController;
