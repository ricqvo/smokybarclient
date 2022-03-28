module.exports = (sequelize, DataTypes) => {
        const Order = sequelize.define("Order", {
                orderid: { type: DataTypes.STRING, allowNull: false },
                itemid: { type: DataTypes.INTEGER, allowNull: false },
        });
        return Order;
};
