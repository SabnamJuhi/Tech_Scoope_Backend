const router =
  require("express").Router();

const auth =
  require("../middlewares/auth.middleware");

const {
  createWorkspace,
  getWorkspaces,
} = require(
  "../controllers/workspace.controller"
);

router.post(
  "/",
  auth,
  createWorkspace
);

router.get(
  "/",
  auth,
  getWorkspaces
);

module.exports = router;