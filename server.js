import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

let players = {};
let enemies = { zombie: { x: 500, y: 500, energy: 100 } };

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);
  players[socket.id] = { id: socket.id, x: 100, y: 100, energy: 100 };

  socket.emit("players", { players, enemies });
  socket.broadcast.emit("newPlayer", players[socket.id]);

  let ddd = true;
  setInterval(() => {
    if (ddd) {
      io.emit("moveEnemy", {
        x: Math.random() * -500,
        y: Math.random() * -500,
      });
      ddd = false;
    } else {
      io.emit("moveEnemy", { x: Math.random() * 500, y: Math.random() * 500 });
      ddd = true;
    }
  }, 3000);

  socket.on("hitEnemy", (hitEnemy) => {
    const { fire } = hitEnemy;
    enemies["zombie"].energy--;
    io.emit("hitEnemy", { enemies, fire });
  });

  socket.on("movePlayer", (player) => {
    players[player.id].x = player.x;
    players[player.id].y = player.y;
    socket.broadcast.emit("movePlayer", players[player.id]);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
    io.emit("removePlayer", socket.id);
    delete players[socket.id];
  });
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
