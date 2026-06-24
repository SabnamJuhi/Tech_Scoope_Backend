const router = require("express").Router();

const auth =
require("../middlewares/auth.middleware");

const layoutController =
require("../controllers/layout.controller");

router.patch(
  "/",
  auth,
  layoutController.updateLayout
);

module.exports = router;