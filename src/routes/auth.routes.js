const router =
  require("express").Router();

const {
  register,
  login,
  logout,
  me,
  getUsers,
} = require(
  "../controllers/auth.controller"
);
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
 "/logout",
 authMiddleware,
 logout
);

router.get(
 "/me",
 authMiddleware,
 me
);
router.get("/", authMiddleware, getUsers);

module.exports = router;