let baseUrl="http://localhost:8080";
let productos=[];

const obtenerProductos=()=>{
    fetch(baseUrl + '/api/products').then(res=>{
        res.json().then(json=>{
            productos=json;
            printProducts()
        })
    })
}
const printProducts=()=>{
    let container=document.getElementById('products');
    container.innerHTML="";
    productos.allProducts.forEach(producto=>
        {
            container.innerHTML+=mapProducts(producto);
        })
}

const mapProducts=(product)=>{
        return  `<div>
            
            <h5>${product.name}</h5>
            <p>$${product.price}</p>
            <img src="${product.url}" alt="${product.name}">
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Eliminar</button>
            <button type="button" class="btn btn-warning btn-sm" onclick="populateData(${product.id})">Actualizar</button>
            </div>
            `
            
}

const deleteProduct=(productId)=>{
    fetch(baseUrl + '/api/products/' + productId, {method:"Delete"}).then(res=>{
        console.log(res);
        obtenerProductos();
    })
}

const addProduct=()=>{
   let data={
    name:document.getElementById("name").value,
    description:document.getElementById("description").value,
    code:document.getElementById("code").value,
    url:document.getElementById("url").value,
    price:document.getElementById("price").value,
    stock:document.getElementById("stock").value,
   }
   fetch(baseUrl +'/api/products/',{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
        "Content-Type":'application/json; charset=UTF-8'
    }
   }).then(res=>{
    obtenerProductos();
   })
}

const populateData=(productId)=>{
    let product=productos.allProducts.filter(product=>product.id==productId)[0];
    document.getElementById("name").value=product.name;
    document.getElementById("description").value=product.description;
    document.getElementById("code").value=product.code;
    document.getElementById("url").value=product.url;
    document.getElementById("price").value=product.price;
    document.getElementById("stock").value=product.stock;
    document.getElementById("productId").value=product.id;
}

const actualizeProduct=()=>{
    let data={
     name:document.getElementById("name").value,
     description:document.getElementById("description").value,
     code:document.getElementById("code").value,
     url:document.getElementById("url").value,
     price:document.getElementById("price").value,
     stock:document.getElementById("stock").value,
     id:document.getElementById("productId").value
    }
    console.log(data.id)
    fetch(baseUrl +'/api/products/' + data.id,{
     method:"PUT",
     body:JSON.stringify(data),
     headers:{
         "Content-Type":'application/json; charset=UTF-8'
     }
    }).then(res=>{
     obtenerProductos();
    })
 }
const productsInCart=()=>{
    fetch(baseUrl + '/api/cart/1/products').then(res=>{
        res.json().then(json=>{
            productos=json;
            console.log(productos)
            printCartProducts()
        })
    })
}

const printCartProducts=()=>{
    let container=document.getElementById('cartProducts');
    container.innerHTML="";
    productos.products.forEach(producto=>
        {
            container.innerHTML+=mapCartProducts(producto);
        })
}

const mapCartProducts=(product)=>{
    return  `
        <div>
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <img src="${product.url}" alt="${product.name}">
        </div>
        
        `
        
}













// const list=document.querySelector('.products');
// fetch('./files/products.txt',{
// })
// .then(response=>response.json())
// .then(data=> {
//     list.innerHTML = "";
//             data.forEach((product) => {
//                 let div = document.createElement('div');
//                 div.innerHTML += `
//                 <input placeholder="${product.name}">
//                 <input placeholder="${product.price}">
//                 <input placeholder="${product.description}">
//                 <input placeholder="${product.code}">
//                 <input placeholder="${product.stock}">
//                 <input placeholder="${product.url}">
//                 <img src="${product.url}" alt="${product.name}">
//                 <div id="buttons">
//                 <button id="edit" class="btn btn-success my-2 my-sm-0" type="button" onclick="editProduct()">Actualizar</button>
//                 <button id="delete" class="btn btn-success my-2 my-sm-0" type="button" onclick="deleteProduct()">Eliminar</button>
//                 </div>
//                 <button class="btn btn-success my-2 my-sm-0" type="button" onclick="addProduct()">Agregar</button>
//                 `
//             //     let btn = document.createElement('button');
//             // btn.addEventListener('click', (e) => {
//             //     e.preventDefault();
//             // })
//                 list.append(div);
//             })
            
// })

