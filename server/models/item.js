module.exports = (sequelize, DataTypes) => {
        const Item = sequelize.define("Item", {
                name: { type: DataTypes.STRING, allowNull: false },
                price: { type: DataTypes.STRING, allowNull: false },
                type: { type: DataTypes.STRING, allowNull: false },
        });
        return Item;
};
