// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const WidgetLayout = sequelize.define(
//   "WidgetLayout",
//   {
//     x: DataTypes.INTEGER,
//     y: DataTypes.INTEGER,
//     w: DataTypes.INTEGER,
//     h: DataTypes.INTEGER,
//   },
  
// );

// module.exports = WidgetLayout;


const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WidgetLayout = sequelize.define("WidgetLayout", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  x: DataTypes.INTEGER,
  y: DataTypes.INTEGER,
  w: DataTypes.INTEGER,
  h: DataTypes.INTEGER,

  // 🔥 REQUIRED FK
  WidgetId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = WidgetLayout;