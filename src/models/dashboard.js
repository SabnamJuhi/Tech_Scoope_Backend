const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Dashboard = sequelize.define("Dashboard", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   WorkspaceId: {
    type: DataTypes.UUID,
    allowNull: false,   // important
  },
});

module.exports = Dashboard;