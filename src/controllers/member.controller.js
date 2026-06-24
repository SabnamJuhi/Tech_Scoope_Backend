const { User, WorkspaceMember } = require("../models");

exports.inviteMember = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const member = await WorkspaceMember.create({
      WorkspaceId: req.params.workspaceId,
      UserId: user.id,
      role,
    });

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMembers = async (req, res, next) => {
  try {
    const members = await WorkspaceMember.findAll({
      where: {
        WorkspaceId: req.params.workspaceId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.json({
      success: true,
      data: members,
    });
  } catch (err) {
    next(err);
  }
};

exports.changeRole = async (req, res, next) => {
  try {
    const member = await WorkspaceMember.findByPk(req.params.memberId);

    if (!member)
      return res.status(404).json({
        message: "Member not found",
      });

    member.role = req.body.role;

    await member.save();

    res.json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
   const member = await WorkspaceMember.findOne({
  where: {
    UserId: req.params.memberId,
    WorkspaceId: req.params.workspaceId,
  },
});

if (!member) {
  return res.status(404).json({ message: "Member not found" });
}

await member.destroy();
  } catch (err) {
    next(err);
  }
};
