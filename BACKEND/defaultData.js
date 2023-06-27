import Product from "./model/ProductSchema.js";
import axios from "axios";
const apiUrl ="https://s3.amazonaws.com/roxiler.com/product_transaction.json";
const defaultData = async() => {
    try {
        const response = await axios.get(apiUrl); 
        const data = response.data;
       await Product.insertMany(data);
        console.log("default data inserted successfully");
    }catch(error) {
        console.log("Error while inserting default data", error.message);
    }
}
export default defaultData;