const User = require("./user");
const Workspace = require("./workspace");
const WorkspaceMember = require("./workspaceMember");
const Dashboard = require("./dashboard");
const Widget = require("./widget");
const WidgetLayout = require("./widgetLayout");
const DashboardFilter = require("./dashboardFilter");

User.belongsToMany(Workspace, {
  through: WorkspaceMember,
});

Workspace.belongsToMany(User, {
  through: WorkspaceMember,
});
WorkspaceMember.belongsTo(User);
WorkspaceMember.belongsTo(Workspace);

Workspace.hasMany(Dashboard, {
  foreignKey: "WorkspaceId",
  onDelete: "CASCADE",
});

Dashboard.belongsTo(Workspace, {
  foreignKey: "WorkspaceId",
});

Dashboard.hasMany(Widget, {
  foreignKey: "DashboardId",
  onDelete: "CASCADE",
});

Widget.belongsTo(Dashboard, {
  foreignKey: "DashboardId",
});

Widget.hasOne(WidgetLayout, {
  foreignKey: "WidgetId",
  onDelete: "CASCADE",
});

WidgetLayout.belongsTo(Widget, {
  foreignKey: "WidgetId",
});

Dashboard.hasMany(DashboardFilter, {
  foreignKey: "DashboardId",
  onDelete: "CASCADE",
});

DashboardFilter.belongsTo(Dashboard, {
  foreignKey: "DashboardId",
});

User.belongsToMany(Workspace, {
  through: WorkspaceMember,
});

Workspace.belongsToMany(User, {
  through: WorkspaceMember,
});

Workspace.hasMany(WorkspaceMember);
WorkspaceMember.belongsTo(Workspace);

User.hasMany(WorkspaceMember);
WorkspaceMember.belongsTo(User);


module.exports = {
  User,
  Workspace,
  WorkspaceMember,
  Dashboard,
  Widget,
  WidgetLayout,
  DashboardFilter,
};