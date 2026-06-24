const { Dashboard, WorkspaceMember } = require("../models");

module.exports = async (req, res, next) => {
  try {
    // const dashboardId = req.params.id;
    // const dashboardId = req.params.dashboardId;
    const dashboardId =
  req.params.dashboardId || req.body.dashboardId;

    if (!dashboardId) {
      return res.status(400).json({
        success: false,
        message: "DashboardId is required",
      });
    }

    const dashboard = await Dashboard.findByPk(dashboardId);

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found",
      });
    }

    const workspaceId = dashboard.WorkspaceId;

    const member = await WorkspaceMember.findOne({
      where: {
        WorkspaceId: workspaceId,
        UserId: req.user.id,
      },
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: "Not a workspace member",
      });
    }

    console.log("dashboard middleware passed");
    
    req.workspaceId = workspaceId;
    req.workspaceRole = member.role;
    req.dashboard = dashboard;

    next();
  } catch (err) {
    next(err);
  }
};