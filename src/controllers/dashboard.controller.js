const { Dashboard, Widget, WidgetLayout } = require("../models");

const { success } = require("../utils/response");

exports.createDashboard = async (req, res, next) => {
  try {
    const dashboard = await Dashboard.create({
      name: req.body.name,
      WorkspaceId: req.params.workspaceId,
    });

    return success(res, dashboard, "Dashboard created");
  } catch (err) {
    next(err);
  }
};

exports.getDashboard = async (req, res, next) => {
  try {
    const dashboard = await Dashboard.findByPk(req.params.id, {
      include: [
        {
          model: Widget,
          include: [WidgetLayout],
        },
      ],
    });

    return success(res, dashboard);
  } catch (err) {
    next(err);
  }
};

exports.getAllDashboards = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Dashboard.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Widget,
          include: [WidgetLayout],
        },
      ],
    });

    return success(
      res,
      {
        total: count,
        page,
        limit,
        dashboards: rows,
      },
      "Dashboards fetched successfully",
    );
  } catch (err) {
    next(err);
  }
};

exports.getDashboardsByWorkspace = async (req, res, next) => {
  try {
    const dashboards = await Dashboard.findAll({
      where: {
        WorkspaceId: req.params.workspaceId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: dashboards,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteDashboard = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if dashboard exists
    const dashboard = await Dashboard.findByPk(id);

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found",
      });
    }

    // Optional: delete related widgets & layouts first (safe cleanup)
    const widgets = await Widget.findAll({
      where: { DashboardId: id },
    });

    for (const widget of widgets) {
      await WidgetLayout.destroy({
        where: { WidgetId: widget.id },
      });

      await widget.destroy();
    }

    // Delete dashboard
    await dashboard.destroy();

    return success(res, null, "Dashboard deleted successfully");
  } catch (err) {
    next(err);
  }
};
