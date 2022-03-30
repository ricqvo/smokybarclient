const express = require("express");
const router = express.Router();
const { Order, Item } = require("../models");

router.post("/", async (req, res) => {
        const newItemToOrder = req.body;
        await Order.create(newItemToOrder);
        res.json(newItemToOrder);
});
router.get("/:orderid", async (req, res) => {
        let array = [];
        const { orderid } = req.params;
        const orderById = await Order.findAll({ where: { orderid: orderid } });
        orderById.length > 0
                ? orderById.map(async (item, index) => {
                          const itemsFromOrder = await Item.findAll({ where: { id: item.itemid } });
                          const object = {
                                  orderId: item.id,
                                  item: itemsFromOrder[0],
                                  tobepaid: item.tobepaid,
                                  paid: item.paid,
                          };
                          array = [...array, object];
                          index + 1 === orderById.length && res.json(array);
                  })
                : res.json([]);
});

router.put("/:orderid", async (req, res) => {
        const { orderid } = req.params;
        const update = req.body;
        await Order.update(update, {
                where: {
                        id: orderid,
                },
        });
        res.json("ok");
});

router.delete("/:orderid", async (req, res) => {
        const { orderid } = req.params;
        await Order.destroy({
                where: {
                        id: orderid,
                },
        });
        res.send("ok");
});

module.exports = router;
