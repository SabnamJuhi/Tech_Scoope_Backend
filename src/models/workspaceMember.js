const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WorkspaceMember = sequelize.define(
  "WorkspaceMember",
  {
    role: {
      type: DataTypes.ENUM(
        "ADMIN",
        "ANALYST",
        "VIEWER"
      ),
      defaultValue: "VIEWER",
    },
  }
);

module.exports = WorkspaceMember;