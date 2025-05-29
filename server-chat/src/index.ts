import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 3001;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("Usuario conectado: " + socket.id);

  socket.on("mensagem", (msg) => {
    console.log("mensagem: " + msg);

    io.emit("mensagem", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("OK Api.");
});

server.listen(PORT, () => {
  console.log("Servidor Rodando.");
});
