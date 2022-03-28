module.exports = (sequelize, DataTypes) => {
        const OrderName = sequelize.define("OrderName", {
                tableid: { type: DataTypes.INTEGER, allowNull: false },
                orderid: { type: DataTypes.STRING, allowNull: false },
                done: { type: DataTypes.BOOLEAN, allowNull: false },
        });
        return OrderName;
};
