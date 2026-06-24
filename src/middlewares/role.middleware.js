// const { WorkspaceMember } = require("../models");

// module.exports = (...roles) => {
//   return async (req, res, next) => {
//     const member = await WorkspaceMember.findOne({
//       where: {
//         WorkspaceId: req.params.workspaceId,
//         UserId: req.user.id,
//       },
//     });
//     if (!member || !roles.includes(member.role)) {
//       return res.status(403).json({
//         message: "Access denied",
//       });
//     }

//     next();
//   };
// };






const { WorkspaceMember, Dashboard, Widget } = require("../models");

// module.exports = (...roles) => {
//   return async (req, res, next) => {
//     try {
//       let workspaceId;

//       // 1. direct workspace routes
//       if (req.params.workspaceId) {
//         workspaceId = req.params.workspaceId;
//       }

//       // 2. widget routes
//       else if (req.params.id) {
//         const widget = await Widget.findByPk(req.params.id);

//         if (!widget) {
//           return res.status(404).json({
//             message: "Widget not found",
//           });
//         }

//         const dashboard = await Dashboard.findByPk(widget.DashboardId);

//         workspaceId = dashboard?.WorkspaceId;
//       }

//       if (!workspaceId) {
//         return res.status(400).json({
//           message: "WorkspaceId could not be resolved",
//         });
//       }

//       const member = await WorkspaceMember.findOne({
//         where: {
//           WorkspaceId: workspaceId,
//           UserId: req.user.id,
//         },
//       });

//       if (!member || !roles.includes(member.role)) {
//         return res.status(403).json({
//           message: "Access denied",
//         });
//       }

//       req.workspaceId = workspaceId;
//       req.workspaceRole = member.role;

//       next();
//     } catch (err) {
//       next(err);
//     }
//   };
// };




module.exports = (...roles) => {
  return async (req, res, next) => {
    try {

      // FIRST use workspaceId already set by previous middleware
      let workspaceId = req.workspaceId;

      if (!workspaceId && req.params.workspaceId) {
        workspaceId = req.params.workspaceId;
      }

      else if (!workspaceId && req.params.id) {

        const widget = await Widget.findByPk(req.params.id);

        if (!widget) {
          return res.status(404).json({
            message: "Widget not found",
          });
        }

        const dashboard = await Dashboard.findByPk(widget.DashboardId);

        workspaceId = dashboard?.WorkspaceId;
      }

      if (!workspaceId) {
        return res.status(400).json({
          message: "WorkspaceId could not be resolved",
        });
      }

      const member = await WorkspaceMember.findOne({
        where: {
          WorkspaceId: workspaceId,
          UserId: req.user.id,
        },
      });

      if (!member || !roles.includes(member.role)) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      req.workspaceId = workspaceId;
      req.workspaceRole = member.role;

      next();

    } catch (err) {
      next(err);
    }
  };
};