const router =
  require("express").Router();

const auth =
  require("../middlewares/auth.middleware");

const {
 
  sales,
} = require(
  "../controllers/analytics.controller"
);

router.get(
  "/sales",
  auth,
  sales
);

module.exports = router;