const express = require("express");
const app = express();
const db = require("./models");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const inventoryRoute = require("./routes/Inventory");
app.use("/inventory", inventoryRoute);
const ordersRoute = require("./routes/Orders");
app.use("/orders", ordersRoute);
const orderNameRoute = require("./routes/OrderName");
app.use("/ordername", orderNameRoute);

db.sequelize.sync().then(() => {
        app.listen(process.env.PORT || PORT, () => {
                console.log("Server is running bruh.");
        });
});
