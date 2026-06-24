const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Widget = sequelize.define("Widget", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  type: {
    type: DataTypes.ENUM("LINE_CHART", "BAR_CHART", "KPI_CARD", "TABLE"),
  },

  title: {
    type: DataTypes.STRING,
  },

  config: {
    type: DataTypes.JSONB,
  },

  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
   DashboardId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Widget;
