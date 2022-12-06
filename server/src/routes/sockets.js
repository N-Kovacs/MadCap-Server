/*
 * SocketIo connection logic
 */

module.exports = (app) => {
  app.io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    socket.on("ping", (id) => {
      app.io.emit("pong");
      console.log("pinged");
      console.log(socket.id);
    });
    socket.on("send-message", (message) => {
      console.log(message);
      app.io.in(message.room).emit("message", message);
    });
    socket.on("send-vote", (vote) => {
      console.log(vote);
      app.io.in(vote.room).emit("vote", vote);
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
    socket.on("set-room", (room) => {
      console.log(socket.id, "joined room", room);
      socket.join(room);
      console.log(socket.rooms);
      
    });
    socket.on("request-state-from-host", (room) => {
      console.log("state requested", room);
      app.io.in(room).emit("request-state");
    });
    socket.on("send-state", (state) => {
      console.log("sending state");
      console.log(state)
      app.io.in(state.room).emit("sync-state", state);
    });
    socket.on("host-start-game", (room) => {
      console.log("startinggame");
      console.log(room)
      app.io.in(room).emit("start-game");
    });
    socket.on("joined-game", (room) => {
      console.log("joined game at ", room)
      app.io.in(room).emit("update-players");
    });
    socket.on("send-others", (obj) => {
      console.log("send others at", obj.room, "to", obj.url)
      app.io.in(obj.room).emit("sent-next", obj.url);
    });
  });
};
