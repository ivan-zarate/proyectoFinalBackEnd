const dataEntry=document.querySelector('#products');
const renderProducts=(image)=>{
    dataEntry.setAttribute('src', image);
}
fetch('./files/products.txt',{
})
.then(response=>response.json())
.then(data=> renderProducts(data[0].url))
