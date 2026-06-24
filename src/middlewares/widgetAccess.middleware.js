


const { Widget, Dashboard, WorkspaceMember } = require("../models");

module.exports = async (req, res, next) => {
  try {
    // const widgetId = req.params.id;
    const widgetId = req.params.id || req.body.widgetId;

    const widget = await Widget.findByPk(widgetId);

    if (!widget) {
      return res.status(404).json({
        success: false,
        message: "Widget not found",
      });
    }

    if (!widget.DashboardId) {
      return res.status(500).json({
        success: false,
        message: "Widget missing DashboardId",
      });
    }

    const dashboard = await Dashboard.findByPk(widget.DashboardId);

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found",
      });
    }

    const workspaceId = dashboard.WorkspaceId;

    if (!workspaceId) {
      return res.status(500).json({
        success: false,
        message: "Dashboard missing WorkspaceId",
      });
    }

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

    req.workspaceId = workspaceId;
    req.workspaceRole = member.role;
    req.widget = widget;

    next();
  } catch (err) {
    next(err);
  }
};