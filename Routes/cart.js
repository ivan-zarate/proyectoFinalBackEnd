const express = require("express");
const Container = require('../class');
const fs = require("fs");
const validateBody = require("../middlewares/validateBody");
const moment = require("moment");
const cartRouter = express.Router();

const cartFile = new Container('files/cart.txt');
const productFile = new Container('files/products.txt');

cartRouter.use((req, res, next) => {
    console.log("Time: ", Date());
    next();
});

cartRouter.post("/cart", express.json(), async (req, res) => {
    try {
        let carts = await fs.promises.readFile(cartFile.fileName, "utf-8");
        carts = JSON.parse(carts);
        const id = carts.length + 1;
        const time = moment().format('lll');
        const newCart = {
            id: id,
            timeStamp: time
        }
        carts.push(newCart);
        await fs.promises.writeFile(cartFile.fileName, JSON.stringify(carts));
        return res.status(200).send({ cart: newCart });
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
});

cartRouter.delete("/cart/:id", express.json(), async (req, res) => {
    try {
        let { id } = req.params;
        id = parseInt(id);
        let carts = await fs.promises.readFile(cartFile.fileName, "utf-8");
        carts = JSON.parse(carts);
        const searchedCart = carts.find((cart) => cart.id == id);
        if (searchedCart == undefined) {
            res.status(404).send({ error: 'carrito no encontrado' });
        }
        else {
            carts.splice(id - 1, 1);
            console.log(carts);
            await fs.promises.writeFile(cartFile.fileName, JSON.stringify(carts));
            res.status(200).send(`El carrito con id ${id} fue eliminado del inventario`);
        }
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
});

cartRouter.get("/cart/:id/products", express.json(), async (req, res) => {
    try {
        let { id } = req.params;
        id = parseInt(id)
        let productsInCart = await (fs.promises.readFile(cartFile.fileName, "utf-8"));
        productsInCart = JSON.parse(productsInCart);
        const searchedCart = productsInCart.find((cart) => cart.id == id);
        if (searchedCart == undefined) {
            res.status(404).send({ error: 'carrito no encontrado' });
        }
        else{
            res.status(200).send({products: productsInCart.map((product=>product.productos))});
        }
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
});

cartRouter.post("/cart/:id/products/:id_prod", express.json(), async (req, res) => {
    try {
        const { id } = req.params;
        const { id_prod } = req.params;
        let productsInCart = await (fs.promises.readFile(cartFile.fileName, "utf-8"));
        productsInCart = JSON.parse(productsInCart);
        let products = await (fs.promises.readFile(productFile.fileName, "utf-8"));
        products = JSON.parse(products);
        const searchedProduct = products.find((product) => product.id == parseInt(id_prod));
        const searchedCart = productsInCart.find((cart) => cart.id == parseInt(id));
        if (searchedCart == undefined || searchedProduct == undefined) {
            res.status(404).send({ error: 'carrito/producto no encontrado' });
        }
        else{
            let listProducts=productsInCart.map((product=>product.productos));
            // listProducts=[searchedProduct, ...listProducts];
            console.log(productsInCart);
            console.log("then", listProducts);
            res.status(200).send({newCart: listProducts });
        }
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
});


module.exports = cartRouter;