const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");

const role = require("../middlewares/role.middleware");

const {
  createWidget,
  updateLayout,
  deleteWidget,
  pinWidget,
  getWidgetsByDashboard,
  moveWidget,
  resizeWidget,
} = require("../controllers/widget.controller");

const workspaceAccessMiddleware = require("../middlewares/workspaceAccess.middleware");
const widgetAccessMiddleware = require("../middlewares/widgetAccess.middleware");
const dashboardAccessMiddleware = require("../middlewares/dashboardAccess.middleware");

router.post(
  "/",
  auth,
  dashboardAccessMiddleware,
  role("ADMIN", "ANALYST"),
  createWidget,
);


router.put(
  "/layout",
  auth,
  widgetAccessMiddleware,
  role("ADMIN", "ANALYST"),
  updateLayout,
);


router.patch(
  "/move",
  auth,
  widgetAccessMiddleware,
  role("ADMIN", "ANALYST"),
  moveWidget,
);

router.patch(
  "/resize",
  auth,
  widgetAccessMiddleware,
  role("ADMIN", "ANALYST"),
  resizeWidget,
);

router.get(
  "/:dashboardId",
  auth,
  dashboardAccessMiddleware,
  getWidgetsByDashboard,
);


router.patch(
  "/:id/pin",
  auth,
  widgetAccessMiddleware,
  role("ADMIN", "ANALYST"),
  pinWidget,
);

router.delete(
  "/:id",
  auth,
  widgetAccessMiddleware,
  role("ADMIN", "ANALYST"),
  deleteWidget,
);

module.exports = router;
