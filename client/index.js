//console.log(document.getElementById("cerveza").attributes.key.value);
const getProductsById = (id) => {
  let endpoint = `http://192.168.100.2:3000/products/${id}`;
  fetch(endpoint)
    .then((respuesta) => respuesta.json())
    .then((datos) => mostrarData(datos))
    .catch((e) => console.log(e));
};

const searchProduct = (search) => {
  let endpoint = `http://192.168.100.2:3000/product-search/${search}`;
  fetch(endpoint)
    .then((respuesta) => respuesta.json())
    .then((datos) => mostrarData(datos))
    .catch((e) => console.log(e));
};

const mostrarData = (data) => {
  console.log("Received data");
  console.log(data);
  let body = "";
  for (let i = 0; i < data.length; i++) {
    //body += `<tr><td>${data[i].name}</td><td>${data[i].price}</td></tr>`;
    body += `<div class="card" style="width: 18rem;">
    <img src="${data.url_image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text">$ ${data.price}</p>
      <p class="card-text">${data.discount}% de descuento</p>
      <a href="#" class="btn btn-primary">Añadir al carro</a>
    </div>
  </div>`;
  }
  document.getElementById("data").innerHTML = body;
};
