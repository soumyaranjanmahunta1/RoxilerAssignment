import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productschema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique:true,
  },
  title: String,
  price: Number,
  description:String,
  category:String,
  image:String,
  sold: Boolean,
  dateOfSale: String,
});
productschema.plugin(mongoosePaginate);
const Product = mongoose.model('product', productschema);
export default Product;