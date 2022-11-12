const getProductsById = (id) => {
  let endpoint = `http://ec2-54-82-194-198.compute-1.amazonaws.com:3000/products/${id}`;
  fetch(endpoint)
    .then((respuesta) => respuesta.json())
    .then((datos) => mostrarData(datos))
    .catch((e) => console.log(e));
};

const searchProduct = () => {
  search = document.getElementById("busqueda").value;
  let endpoint = `http://ec2-54-82-194-198.compute-1.amazonaws.com:3000/product-search/${search}`;
  fetch(endpoint)
    .then((respuesta) => respuesta.json())
    .then((datos) => mostrarData(datos))
    .catch((e) => console.log(e));
};

const mostrarData = (data) => {
  console.log(data);
  let body = "";
  for (let i = 0; i < data.length; i++) {
    body += `<div class="card" style="width: 20%; margin: 0.5%">
    <img src="${data[i].url_image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data[i].name}</h5>
      <p class="card-text">$ ${data[i].price}</p>
      <p class="card-text">${data[i].discount}% de descuento</p>
      <a href="#" class="btn btn-primary">Añadir al carro</a>
    </div>
  </div>`;
  }
  console.log(body);
  document.getElementById("data").innerHTML = body;
};
