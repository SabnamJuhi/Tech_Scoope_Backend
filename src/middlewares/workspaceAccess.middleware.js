// const { WorkspaceMember } = require("../models");


// module.exports = async (req, res, next) => {
//   try {
//     const workspaceId = req.params.workspaceId || req.body.workspaceId;

//     const member = await WorkspaceMember.findOne({
//       where: {
//         WorkspaceId: workspaceId,
//         UserId: req.user.id,
//       },
//     });

//     if (!member) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not a member of this workspace",
//       });
//     }

//     req.workspaceRole = member.role;

//     next();
//   } catch (err) {
//     next(err);
//   }
// };





// const { WorkspaceMember, Dashboard } = require("../models");

// module.exports = async (req, res, next) => {
//   try {
//     let workspaceId = req.params.workspaceId;

//     // 🔥 fallback for dashboard routes
//     if (!workspaceId && req.params.id) {
//       const dashboard = await Dashboard.findByPk(req.params.id);

//       if (!dashboard) {
//         return res.status(404).json({
//           success: false,
//           message: "Dashboard not found",
//         });
//       }

//       workspaceId = dashboard.WorkspaceId;
//     }

//     if (!workspaceId) {
//       return res.status(400).json({
//         success: false,
//         message: "WorkspaceId not found",
//       });
//     }

//     const member = await WorkspaceMember.findOne({
//       where: {
//         WorkspaceId: workspaceId,
//         UserId: req.user.id,
//       },
//     });

//     if (!member) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not a member of this workspace",
//       });
//     }

//     req.workspaceRole = member.role;

//     next();
//   } catch (err) {
//     next(err);
//   }
// };




const { WorkspaceMember } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const workspaceId =
      req.params.workspaceId || req.body.workspaceId;

    if (!workspaceId) {
      return res.status(400).json({
        success: false,
        message: "WorkspaceId is required",
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

    next();
  } catch (err) {
    next(err);
  }
};