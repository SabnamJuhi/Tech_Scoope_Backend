// const router =
//   require("express").Router();

// const auth =
//   require("../middlewares/auth.middleware");

// const role =
//   require("../middlewares/role.middleware");

// const {
//   createDashboard,
//   getDashboard,
//   deleteDashboard,
//   getAllDashboards,
//   getDashboardsByWorkspace,
// } = require(
//   "../controllers/dashboard.controller"
// );
// const workspaceAccessMiddleware = require("../middlewares/workspaceAccess.middleware");

// router.post(
//   "/workspace/:workspaceId",
//   auth,
//   workspaceAccessMiddleware,
//   role("ADMIN", "ANALYST"),
//   createDashboard
// );

// router.get("/", auth, getAllDashboards);

// router.get(
//   "/:id",
//   auth,
//   getDashboard
// );



// router.get(
//     "/workspace/:workspaceId",
//     auth,
//     workspaceAccessMiddleware,
//     getDashboardsByWorkspace
// );

// router.delete(
//   "/:id/:workspaceId",
//   auth,
//   workspaceAccessMiddleware,
//   role("ADMIN", "ANALYST"),
//   deleteDashboard
// );

// module.exports = router;




const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const {
  createDashboard,
  getDashboard,
  deleteDashboard,
  getAllDashboards,
  getDashboardsByWorkspace,
} = require("../controllers/dashboard.controller");

const workspaceAccessMiddleware =
  require("../middlewares/workspaceAccess.middleware");


// Create dashboard
router.post(
  "/workspace/:workspaceId",
  auth,
  workspaceAccessMiddleware,
  role("ADMIN", "ANALYST"),
  createDashboard
);


// Get dashboards of a workspace
router.get(
  "/workspace/:workspaceId",
  auth,
  workspaceAccessMiddleware,
  getDashboardsByWorkspace
);


// Get all dashboards
router.get(
  "/",
  auth,
  getAllDashboards
);


// Get single dashboard
router.get(
  "/:id",
  auth,
  getDashboard
);


// Delete dashboard
router.delete(
  "/:id/:workspaceId",
  auth,
  workspaceAccessMiddleware,
  role("ADMIN", "ANALYST"),
  deleteDashboard
);

module.exports = router;