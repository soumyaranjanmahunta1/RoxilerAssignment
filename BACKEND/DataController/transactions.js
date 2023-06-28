import Product from "../model/ProductSchema.js";


const transactions = async(req,res) => {
    try {
         const {
           search = "",
           month = "",
           page = 1,
           perPage = 10,
         } = req.query;
        let numonth = 0;
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

        const query = {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
          dateOfSale: { $regex: `.*-${numonth}-.*` },
        };

        const transactions = await Product.find(query)
          .skip((page - 1) * perPage)
          .limit(Number(perPage))
          .lean();

        res.json(transactions);
    } catch (err) {
        console.log("Error At testTranjaction is" + err);
         res.status(500).json({ error: "Internal server error" });
    }
}
export default transactions;