const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { setIO } = require("../services/socket.service");

let io;

exports.initSocket = (server) => {
  io = new Server(server, {
    // cors: {
    //   origin: process.env.FRONTEND_URL,
    //   credentials: true,
    // },
    cors: {
    origin: [
      "http://localhost:5173",
      "https://tech-scoope-frontend.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
  });

  setIO(io);

  // socket authentication
  io.use((socket, next) => {
    try {
      console.log("AUTH CALLED");

      const cookies = cookie.parse(socket.handshake.headers.cookie || "");

      console.log(cookies);

      const token = cookies.accessToken; // your cookie name

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = decoded;

      next();
    } catch (err) {
      console.log(err);

      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    /*
      Join Workspace
    */
    socket.on("joinWorkspace", (workspaceId) => {
      socket.join(`workspace-${workspaceId}`);

      console.log(`${socket.user.email} joined workspace ${workspaceId}`);
    });

    /*
      Leave Workspace
    */
    socket.on("leaveWorkspace", (workspaceId) => {
      socket.leave(`workspace-${workspaceId}`);
    });

    /*
      Widget Created
    */
    socket.on("widget:create", (payload) => {
      io.to(`workspace-${payload.workspaceId}`).emit("widget:created", payload);
    });

    /*
      Widget Updated
    */
    socket.on("widget:update", (payload) => {
      io.to(`workspace-${payload.workspaceId}`).emit("widget:updated", payload);
    });

    /*
      Widget Deleted
    */
    socket.on("widget:delete", (payload) => {
      io.to(`workspace-${payload.workspaceId}`).emit("widget:deleted", payload);
    });

    /*
      Widget Pin
    */
    socket.on("widget:pin", (payload) => {
      io.to(`workspace-${payload.workspaceId}`).emit("widget:pinned", payload);
    });

    /*
      Drag Widget
    */
    socket.on("widget:move", (payload) => {
      io.to(`workspace-${payload.workspaceId}`).emit("widget:moved", payload);
    });

    /*
      Resize Widget
    */
    socket.on("widget:resize", (payload) => {
      io.to(`workspace-${payload.workspaceId}`).emit("widget:resized", payload);
    });

    /*
      Entire layout update
    */
    socket.on("layout:update", (payload) => {
      io.to(`workspace-${payload.workspaceId}`).emit("layout:updated", payload);
    });

    /*
      Filter update
    */
    socket.on("filter:update", (payload) => {
      io.to(`workspace-${payload.workspaceId}`).emit("filter:updated", payload);
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected", socket.id);
    });
  });

  return io;
};
