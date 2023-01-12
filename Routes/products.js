const express = require("express");
const Container = require('../class');
const fs = require("fs");
const validateBody = require("../middlewares/validateBody");
const validateUser = require("../middlewares/validateUser");
const moment = require("moment");
const router = express.Router();

const productFile = new Container('files/products.txt');
// const messageFile = new Container('files/messages.txt');

router.use((req, res, next) => {
  console.log("Time: ", Date());
  next();
});

router.get("/products", async (req, res) => {
  let allProducts = await (fs.promises.readFile(productFile.fileName, "utf-8"));
  allProducts = JSON.parse(allProducts);
  // const context = {
  //   allProducts,
  //   printProducts: true,
  // };

  // res.render("index", context);
  return res.status(200).send({ allProducts });
});

router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  let products = await fs.promises.readFile(productFile.fileName, "utf-8");
  products = JSON.parse(products);
  const searchedProduct = products.find((product) => product.id == id);
  if (searchedProduct === undefined) {
    res.status(404).send({ error: 'producto no encontrado' });
  }
  else {
    res.status(200).send({ product: searchedProduct });
  }
});

router.post("/products", express.json(), validateBody, validateUser, async (req, res) => {
  try {
    const { name, price, url, description, code, stock } = req.body;
    let products = await fs.promises.readFile(productFile.fileName, "utf-8");
    products = JSON.parse(products);
    let id = products.length + 1;
    const time = moment().format('lll');
    const newProduct = {
      "id": id,
      "timeStamp": time,
      "name": name,
      "description": description,
      "code": code,
      "url": url,
      "price": price,
      "stock": stock
    }
    products.push(newProduct);
    await fs.promises.writeFile(productFile.fileName, JSON.stringify(products));
    res.status(200).send(console.log("Producto cargado con exito"));
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

// router.post("/messages", express.json(), validateBody, async (req, res) => {
//   try {
//     const { email, texto } = req.body;
//     let newMessage = {};
//     let messages = await fs.promises.readFile(messageFile.fileName, "utf-8");
//     messages = JSON.parse(messages);
//     const time= moment().format('lll');;
//     newMessage = {
//       author: email,
//       time,
//       text: texto
//     }
//     messages.push(newMessage);
//     await fs.promises.writeFile(messageFile.fileName, JSON.stringify(messages));
//     res.redirect("/");
//   } catch (error) {
//     return res.status(404).send({ error: error.message });
//   }
// })

router.put("/products/:id", validateBody, validateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, url, description, code, stock } = req.body;
    let products = await fs.promises.readFile(productFile.fileName, "utf-8");
    products = JSON.parse(products);
    const time = moment().format('lll');
    const searchedProduct = products.find((product) => product.id == parseInt(id));
    if (searchedProduct == undefined) {
      res.status(404).send({ error: 'producto no encontrado' });
    }
    else {
      let productoActualizado = {};
      products.find((product) => {
        if (product.id === parseInt(id)) {
          productoActualizado = {
            id: parseInt(id),
            timeStamp: time,
            name: name,
            description: description,
            code: code,
            url: url,
            price: price,
            stock: stock
          }
        }
      });
      products = products.filter((item) => {
        return item.id !== parseInt(id);
      });
      products.push(productoActualizado);
      await fs.promises.writeFile(productFile.fileName, JSON.stringify(products));
      res.status(200).send({ product: productoActualizado });
    }
  }
  catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

router.delete("/products/:id", validateUser, async (req, res) => {
  try {
    const { id } = req.params;
    let products = await fs.promises.readFile(productFile.fileName, "utf-8");
    products = JSON.parse(products);
    const searchedProduct = products.find((product) => product.id == parseInt(id));
    if (searchedProduct == undefined) {
      res.status(404).send({ error: 'producto no encontrado' });
    }
    else {
      products = products.filter((item) => {
        return item.id !== parseInt(id);
      });
      console.log(products);
      await fs.promises.writeFile(productFile.fileName, JSON.stringify(products));
      res.status(200).send(`El producto con id ${id} fue eliminado del inventario`);
    }
  }
  catch (error) {
    return res.status(404).send({ error: error.message });
  }

});


module.exports = router;