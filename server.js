const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs");
const path = require("path");

const router = require("./Routes/products");
const cartRouter = require("./Routes/cart");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.use('/api', router);
app.use('/api', cartRouter);
app.use(express.static("public"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let allProducts=[{}];

// let messages = fs.readFileSync("files/messages.txt", "utf-8");
// messages = JSON.parse(messages);
// const renew= (data) =>{
//   if(data.length> messages.length){
//     messages=data;
//   }
// }
app.get("/", (req, res) => {
  const context = {
    name: "Producto",
    description:"Breve descripcion",
    code:"codigo",
    price: "Precio",
    stock: "Stock",
    url: "imagen",
    allProducts,
    printProducts: false,
    // messages:renew
  }

  res.render("index", context);
});

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

module.exports = io;