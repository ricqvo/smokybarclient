const express = require("express");
const router = express.Router();
const { Order, Item } = require("../models");

router.post("/", async (req, res) => {
        const newItemToOrder = req.body;
        await Order.create(newItemToOrder);
        res.json(newItemToOrder);
});
router.get("/:tableid/:orderid", async (req, res) => {
        let array = [];
        const { tableid, orderid } = req.params;
        const orderById = await Order.findAll({ where: { orderid: orderid, tableid: tableid } });
        orderById.map(async (item, index) => {
                const itemsFromOrder = await Item.findAll({ where: { id: item.itemid } });
                array = [...array, itemsFromOrder[0]];
                index + 1 === orderById.length && res.json(array);
        });
});

module.exports = router;
