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
router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        await OrderName.update(body, {
                where: {
                        orderid: id,
                },
        });
});

module.exports = router;
