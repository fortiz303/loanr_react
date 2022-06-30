
module.exports = (server: any) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
    transports: ["polling", "websocket"],
  });
  const users = [];
  io.on("connection", (socket: any) => {
    console.log("Client connected");
    socket.on("disconnect", () => console.log("Client disconnected"))

  });
  
};