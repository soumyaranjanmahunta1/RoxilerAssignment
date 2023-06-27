import express from "express";
import Product from "../model/ProductSchema.js";

const router = express.Router();
router.get("/transactions", async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    Product.paginate({}, { page, limit })
        .then(response => {
            res.json(response);
        }).catch(err=>{
        res.json({message:err})
    })
    
});


export default router;