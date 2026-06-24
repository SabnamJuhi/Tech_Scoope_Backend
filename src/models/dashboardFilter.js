const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DashboardFilter = sequelize.define(
  "DashboardFilter",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    dashboardId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    filterKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    filterValue: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  }
);

module.exports = DashboardFilter;
