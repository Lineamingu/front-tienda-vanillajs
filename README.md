# front-tienda-vanillajs
## Frontend Aplicación de tienda hecho con HTML y vanilla Javascript.

<img src="https://user-images.githubusercontent.com/48871135/201491827-20b22f8c-3f9a-45b1-bd11-e66f32344f21.png" alt="image" width="180"> <img src="https://user-images.githubusercontent.com/48871135/201491843-766b0ac6-a844-4259-a432-f6281151fbb9.png" alt="image" width="200">
<img src="https://user-images.githubusercontent.com/48871135/201491854-250e7a0c-2345-44ea-87ad-33358744e2ce.png" alt="image" width="143"> <img src="https://user-images.githubusercontent.com/48871135/201492896-e5d23910-8e54-4937-afc9-c0b83d2e46b8.png" alt="image" width="200">

Esta parte de la aplicación se desarrolló unicamente con vanilla [Javascript](https://www.javascript.com/about) (sin frameworks o librerías), junto con [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) y [CSS](https://developer.mozilla.org/es/docs/Web/CSS)+[Bootstrap](https://getbootstrap.com/) para el diseño de interfaz web y la aplicación de estilos. La metodología de esta aplicación es bastante sencilla, se obtienen los datos desde el endpoint de la [API](https://github.com/Lineamingu/back-tienda-vanilajs), ya sean productos por categoría o una búsqueda específica, y luego se despliegan en la página HTML.

1. HTML body (de [index.html](/client/index.html)):
```
<body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        crossorigin="anonymous"></script>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="https://cdn.discordapp.com/attachments/774884412424323114/1040368922425311282/Paomedia-Small-N-Flat-Shop.ico"
                    alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                Tienda Online
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" id="5" href="#" onclick="getProductsById(id)">Snacks</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Bebidas
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" id="4" href="#" onclick="getProductsById(id)">Bebidas
                                    Gaseosas</a></li>
                            <li><a class="dropdown-item" id="1" href="#" onclick="getProductsById(id)">Bebidas
                                    Energéticas</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Bebidas Alcohólicas
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" id="2" href="#" onclick="getProductsById(id)">Pisco</a></li>
                            <li><a class="dropdown-item" id="3" href="#" onclick="getProductsById(id)">Ron</a></li>
                            <li><a class="dropdown-item" id="7" href="#" onclick="getProductsById(id)">Vodka</a></li>
                            <li><a class="dropdown-item" id="6" href="#" onclick="getProductsById(id)">Cerveza</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Busca un producto" aria-label="Search"
                        id="busqueda" />
                    <button class="btn btn-outline-success" type="submit" onclick="searchProduct()">Buscar</button>
                </form>
            </div>
        </div>
    </nav>
    <div class="container-fluid" id="data">
    </div>
    <script src="index.js"></script>
</body>
```
De este segmento de código se hace énfasis en el [navbar](https://getbootstrap.com/docs/5.2/components/navbar/) de Bootstrap, donde se nota que cada elemento o item, ya sea nav-link o dropdown-item, cuenta con un evento de tipo onClick, el cual invoca la función getProductsById(), que se explicará mas adelante. De la misma manera, la barra de búsqueda cuenta con un botón que también cuenta con un evento onClick que invoca la función searchProduct().

Por último, se debe indicar que se está ocupando el script dentro de [index.js](/client/index.js).

2. Index.js (de [index.js](/client/index.js)):

2.1. Endpoints fetch: En esta primera parte se realizan las respectivas peticiones get al endpoint de la API (ya sea para obtener todos los productos de una categoría, o para obtener el resultado de una búsqueda. Mas información en la [documentación](https://github.com/Lineamingu/back-tienda-vanilajs) de la API), para luego capturar la respuesta y enviarla a la función mostrarData() en ambos casos:
```
const getProductsById = (id) => {
  let endpoint = `http://ec2-54-82-194-198.compute-1.amazonaws.com/products/${id}`;
  fetch(endpoint)
    .then((respuesta) => respuesta.json())
    .then((datos) => mostrarData(datos))
    .catch((e) => console.log(e));
};

const searchProduct = () => {
  search = document.getElementById("busqueda").value;
  let endpoint = `http://ec2-54-82-194-198.compute-1.amazonaws.com/product-search/${search}`;
  fetch(endpoint)
    .then((respuesta) => respuesta.json())
    .then((datos) => mostrarData(datos))
    .catch((e) => console.log(e));
};
```

2.2. mostrarData(): Esta función recibe los datos y procesa, iterando sobre cada elemento contenido en data y agregandolos al body dentro de una [card](https://getbootstrap.com/docs/5.2/components/card/) de Boostrap. Una vez se termina de iterar, este body se inserta dentro del container principal del html con la función document.getElementById().innerHTML:
```
const mostrarData = (data) => {
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

```
