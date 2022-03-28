const express = require("express");
const router = express.Router();
const { OrderName } = require("../models");

router.get("/", async (req, res) => {
        const listOfOrders = await OrderName.findAll();
        res.json(listOfOrders);
});

router.post("/", async (req, res) => {
        const newOrder = req.body;
        await OrderName.create(newOrder);
        res.json(newOrder);
});

module.exports = router;
