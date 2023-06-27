import mongoose from "mongoose";

const connection = async () => {
    const mongoURL ="mongodb+srv://happysoumya3:9439737871@roxilercluster.40h8jra.mongodb.net/?retryWrites=true&w=majority";
  try {
    await mongoose.connect(mongoURL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error while connecting with database", error.message);
  }
};
export default connection;
