const router =
  require("express").Router();

const auth =
  require("../middlewares/auth.middleware");

const {
  updateFilter,
} = require(
  "../controllers/filter.controller"
);

router.post(
  "/update",
  auth,
  updateFilter
);

module.exports = router;