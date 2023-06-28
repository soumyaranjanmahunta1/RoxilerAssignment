import Product from "../model/ProductSchema.js";


const paiChartController = async(req,res) => {
       try {
         let numonth = 0;
         let { month } = req.query;
         if (month == "January") {
           numonth = 1;
         } else if (month == "February") {
           numonth = 2;
         } else if (month == "March") {
           numonth = 3;
         } else if (month == "April") {
           numonth = 4;
         } else if (month == "May") {
           numonth = 5;
         } else if (month == "June") {
           numonth = 6;
         } else if (month == "July") {
           numonth = 7;
         } else if (month == "August") {
           numonth = 8;
         } else if (month == "September") {
           numonth = 9;
         } else if (month == "October") {
           numonth = 10;
         } else if (month == "November") {
           numonth = 11;
         } else if (month == "December") {
           numonth = 12;
         }
         if (numonth < 10) {
           numonth = `0${numonth}`;
         }
         const result = await Product.aggregate([
           {
             $match: {
               dateOfSale: { $regex: `.*-${numonth}-.*` },
             },
           },
           {
             $group: {
               _id: "$category",
               count: { $sum: 1 },
             },
           },
           {
             $project: {
               _id: 0,
               category: "$_id",
               count: 1,
             },
           },
         ]);

         res.json(result);
       } catch (error) {
         console.error(error.message);
         res.status(500).json({ error: "Internal server error" });
       }
}

export default paiChartController;