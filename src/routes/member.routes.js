const router =
  require("express").Router();

const auth =
  require("../middlewares/auth.middleware");

const workspaceAccess =
  require(
    "../middlewares/workspaceAccess.middleware"
  );

const role =
  require("../middlewares/role.middleware");

const {
  inviteMember,
  getMembers,
  changeRole,
  removeMember,
} = require(
  "../controllers/member.controller"
);

router.post(
  "/:workspaceId/invite",
  auth,
  workspaceAccess,
  role("ADMIN"),
  inviteMember
);

router.get(
  "/:workspaceId",
  auth,
  workspaceAccess,
  getMembers
);

router.patch(
  "/:workspaceId/:memberId",
  auth,
  workspaceAccess,
  role("ADMIN"),
  changeRole
);

router.delete(
  "/:workspaceId/:memberId",
  auth,
  workspaceAccess,
  role("ADMIN"),
  removeMember
);

module.exports = router;