
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors=require("cors")
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const userRoutes = require("./routes/UserRoute");
require ("dotenv").config()
const connectDB=require("./db/db")

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(index);
app.use(cors())
const server = http.createServer(app);


app.use("/api/user", userRoutes);
const io = socketIo(server);
connectDB()


let interval;

io.on("connection", (socket) => {
  console.log("New client connected")
  if (interval) {
    clearInterval(interval);
  }else{
    console.log("false")
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
})

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));