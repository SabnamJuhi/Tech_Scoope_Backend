const { Widget, WidgetLayout } = require("../models");

const { getIO } = require("../services/socket.service");

exports.createWidget = async (req, res, next) => {
  try {
    const { dashboardId, workspaceId } = req.body;

    const widget = await Widget.create({
      ...req.body,
      DashboardId: dashboardId, // IMPORTANT FIX
    });

    await WidgetLayout.create({
      WidgetId: widget.id,
      x: 0,
      y: 0,
      w: 4,
      h: 3,
    });

    getIO().to(`workspace-${workspaceId}`).emit("widget:created", widget);

    res.json({
      success: true,
      data: widget,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateLayout = async (req, res, next) => {
  try {
    const { widgetId, workspaceId } = req.body;

    // const layout = await WidgetLayout.update(req.body, {
    //   where: {
    //     WidgetId: widgetId, // FIXED (Sequelize FK naming)
    //   },
    // });
    await WidgetLayout.update(
      {
        x: req.body.x,
        y: req.body.y,
        w: req.body.w,
        h: req.body.h,
      },
      {
        where: {
          WidgetId: widgetId,
        },
      },
    );

    const layout = await WidgetLayout.findOne({
      where: {
        WidgetId: widgetId,
      },
    });

    getIO().to(`workspace-${workspaceId}`).emit("layout:updated", layout);

    res.json({
      success: true,
      data: layout,
    });
  } catch (err) {
    next(err);
  }
};

exports.moveWidget = async (req, res, next) => {
  try {
    const { widgetId, workspaceId, x, y } = req.body;

    await WidgetLayout.update(
      {
        x,
        y,
      },
      {
        where: {
          WidgetId: widgetId,
        },
      },
    );

    getIO().to(`workspace-${workspaceId}`).emit("widget:moved", req.body);

    res.json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

exports.resizeWidget = async (req, res, next) => {
  try {
    const { widgetId, workspaceId, w, h } = req.body;

    await WidgetLayout.update(
      {
        w,
        h,
      },
      {
        where: {
          WidgetId: widgetId,
        },
      },
    );

    getIO().to(`workspace-${workspaceId}`).emit("widget:resized", req.body);

    res.json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

exports.pinWidget = async (req, res, next) => {
  try {
    const widget = req.widget; // from middleware

    widget.isPinned = !widget.isPinned;
    await widget.save();

    getIO()
      .to(`workspace-${req.workspaceId}`) // ✅ from middleware
      .emit("widget:pinned", widget);

    res.json({
      success: true,
      data: widget,
    });
  } catch (err) {
    next(err);
  }
};

exports.getWidgetsByDashboard = async (req, res, next) => {
  try {
    const { dashboardId } = req.params;

    const widgets = await Widget.findAll({
      where: { DashboardId: dashboardId },
      include: [
        {
          model: WidgetLayout,
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    res.json({
      success: true,
      data: widgets,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteWidget = async (req, res, next) => {
  try {
    const { workspaceId } = req.body;

    const widget = await Widget.findByPk(req.params.id);

    if (!widget) {
      return res.status(404).json({
        success: false,
        message: "Widget not found",
      });
    }

    await widget.destroy();

    getIO().to(`workspace-${workspaceId}`).emit("widget:deleted", {
      widgetId: req.params.id,
    });

    res.json({
      success: true,
      message: "Widget deleted",
    });
  } catch (err) {
    next(err);
  }
};
