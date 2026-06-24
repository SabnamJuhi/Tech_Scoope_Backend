const express =
  require("express");
const cors = require("cors");
const cookieParser =
  require("cookie-parser");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(
  "/api/auth",
  require("./routes/auth.routes")
);

app.use(
  "/api/workspaces",
  require("./routes/workspace.routes")
);
app.use(
  "/api/members",
  require("./routes/member.routes")
);
app.use(
  "/api/filters",
  require("./routes/filter.routes")
);

app.use(
  "/api/dashboards",
  require("./routes/dashboard.routes")
);

app.use(
  "/api/widgets",
  require("./routes/widget.routes")
);

app.use(
  "/api/analytics",
  require("./routes/analytics.routes")
);

app.use(
  require(
    "./middlewares/error.middleware"
  )
);

module.exports = app;