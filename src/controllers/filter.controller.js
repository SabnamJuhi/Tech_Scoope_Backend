const { DashboardFilter } = require("../models");

const { getIO } = require("../services/socket.service");

exports.updateFilter = async (req, res, next) => {
  try {
    const { dashboardId, filterKey, filterValue, workspaceId } = req.body;

    let filter = await DashboardFilter.findOne({
      where: {
        dashboardId,
        filterKey,
      },
    });

    if (filter) {
      filter.filterValue = filterValue;

      await filter.save();
    } else {
      filter = await DashboardFilter.create({
        dashboardId,
        filterKey,
        filterValue,
      });
    }

    getIO().to(`workspace-${workspaceId}`).emit("filter:updated", {
      dashboardId,
      filterKey,
      filterValue,
    });

    res.json({
      success: true,
      data: filter,
    });
  } catch (err) {
    next(err);
  }
};
