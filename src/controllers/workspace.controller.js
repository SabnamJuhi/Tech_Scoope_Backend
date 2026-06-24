const { Workspace, WorkspaceMember } = require("../models");

exports.createWorkspace = async (req, res) => {
  const workspace = await Workspace.create({
    name: req.body.name,
  });

  await WorkspaceMember.create({
    WorkspaceId: workspace.id,
    UserId: req.user.id,
    role: "ADMIN",
  });

  res.json(workspace);
};

// exports.getWorkspaces = async (req, res) => {
//   const data = await Workspace.findAll();

//   res.json(data);
// };

exports.getWorkspaces = async (req, res) => {
  try {

    const data = await Workspace.findAll({
      include: [
        {
          model: WorkspaceMember,
          where: {
            UserId: req.user.id,
          },
          attributes: ["role"],
        },
      ],
    });

    res.json(data);

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
