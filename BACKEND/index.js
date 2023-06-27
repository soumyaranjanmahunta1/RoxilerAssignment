import express from 'express';
import router from './Routes/route.js';
import connection from './database/db.js';
import defaultData from "./defaultData.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use("/", router);

const PORT = 8000;
connection();
app.listen(PORT,() => {
    console.log(`Server is running successfully on Port ${PORT}`)
});
defaultData();

