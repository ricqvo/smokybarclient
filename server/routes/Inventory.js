const express = require("express");
const router = express.Router();
const { Item } = require("../models");

router.get("/", async (req, res) => {
        const listOfItems = await Item.findAll({ order: [["name", "ASC"]] });
        res.json(listOfItems);
});
router.get("/:id", async (req, res) => {
        const { id } = req.params;
        const itemById = await Item.findAll({ where: { id: id } });
        res.json(itemById);
        console.log(itemById);
});
router.post("/", async (req, res) => {
        const newItem = req.body;
        await Item.create(newItem);
        res.json(newItem);
});
router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const update = req.body;
        await Item.update(update, {
                where: {
                        id: id,
                },
        });
        res.json(update);
});
router.delete("/:id", async (req, res) => {
        const { id } = req.params;
        const response = await Item.destroy({
                where: {
                        id: id,
                },
        });

        return res.json({ success: response });
});

module.exports = router;
