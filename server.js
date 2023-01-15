const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs");
const cors=require('cors');

const router = require("./Routes/products");
const cartRouter = require("./Routes/cart");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.use('/api', router);
app.use('/api', cartRouter);
app.use(express.static("public"));


//Futuro mensaje flotante

// io.on("connection", (socket) => {
//   console.log("usuario conectado " + socket.id);
//   socket.emit("messages", messages);
//   socket.on("new-message", (data) => {
//     messages.push(data);
//     io.emit("messages", messages);
//   });
// });

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     console.log(socket.id);
//     console.warn("chat message", msg);
//     io.emit("chat message", msg);
//   });
// });

const server = http.listen(port, () => {
  console.log(`Escuchando app en el puerto ${server.address().port}`);
});
