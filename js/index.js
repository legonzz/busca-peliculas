import {
  getPopulares,
  limitarCaracteres,
  buscarPeliculasPorNombre,
} from "./funciones.js";
import { URL_IMG } from "./variables.js";
//FUNCIÓN PARA LLAMAR ELEMENTO DEL HTML.
const contenedorCarrusel = document.getElementById("contenedor-carrusel");
const inputBuscador = document.getElementById("input-buscador");
const resultados = document.getElementById("resultados");

/* Creando barra de búsqueda */
inputBuscador.onkeyup = (e) => {
  if (inputBuscador.value.length < 3) {
    //limpiar la zona de resultados
    resultados.innerHTML = "";
    return;
  }
  buscarPeliculasPorNombre(inputBuscador.value).then((rpta) => {
    console.log(rpta);
    dibujarBusqueda(rpta);
  });
};

//FUNCIÓN PARA LLAMAR ESTILOS Y CARRUSEL DE FLICKITY
//A este elemento se le hace el flickity.append();
const flickity = new Flickity(contenedorCarrusel, {
  freeScroll: true,
  autoPlay: 2000,
});

const dibujarBusqueda = ({ results }) => {
  results.innerHTML = "";
    results.forEach((objPelicula) => {
      let col = document.createElement("div");
      col.classList.add("col-md-2");
      col.innerHTML = `
      <div class = "card">
        <img class="card-img-top" src="${URL_IMG}${
        objPelicula.poster_path
      }" alt="imagen de la película">
            <div class="card-body">
            <h4 class="card-title">${objPelicula.title}</h4>
        <p class="card-text">${limitarCaracteres(objPelicula)}</p>
        </div>
      </div>
        `;
      resultados.appendChild(col);
    });
};
//FUNCIÓN PARA DIBUJAR ELEMENTOS EN EL HTML
//Se utiliza el método de la destructuración para
//llamar elementos de la data API. Con este método,
//sólo llegarán los elementos pertenecientes al
//objeto {results}. El objeto results tiene 3 instancias
//con las que trabajaremos: title, overview e imagen.
const dibujarPopulares = ({ results }) => {
  results.forEach((objPelicula) => {
    //En este apartado se creará un elemento en el HTML para dibujar
    //dentro de este los cards por utilizando un innerHTML en el
    //elemento card que acabamos de crear => card.innerHTML = ...
    //Se crean clases en el div para no hacer un div de más.
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("text-left");
    card.classList.add("card-flickity");
    //Los elementos serán llenados con el método forEach y dentro
    //del card, en cada apartado, se llenarán los elementos con la
    //información proporcionada por la base de datos de la API. Entonces,
    //en el apartado título del card: <h4 class="card-title">Title</h4>,
    //se colocará <h4 class="card-title">${objPeliculas.title}</h4>. Así
    //se irán llenado los elementos.
    //SE DEBE DELIMITAR EL ANCHO A GUSTO PARA QUE NO OCUPEN TODA LA PANTALLA
    //Para llamar a la imagen, se importó la URL de la imagen como una variable
    //de nuestro documento de variables. Para esto, se concateno el
    //la etiqueta source en la imagen: ${URL_IMG}${objPelicula.poster_path}.
    //El poster_path, es un elemento que podemos sacar de los elementos
    //que nos provee la API en el console.log(rpta) que le hicimos.
    card.innerHTML = `
        <img class="card-img-top" src="${URL_IMG}${
      objPelicula.poster_path
    }" alt="imagen de la película">
            <div class="card-body">
            <h4 class="card-title">${objPelicula.title}</h4>
        <p class="card-text">${limitarCaracteres(objPelicula)}</p>
        </div>
        `;
    //Todos los elementos se les hará un append, pero según su librería,
    //a veces tienen sus propios métodos de append. Mirar siempre la documentación.
    flickity.append(card);
  });
  /* Dos formas de que el carrusel comience después del card 1 */
  flickity.select(results.length / 2);
  /* flickity.select(3); */
  /* paginación:
   flick.on("settle", function (index){
     if ( index === 19) {
       console.log("fin");
       //llamar nuevamente a la API, pero en la siguente página
     }
   }) */
};

getPopulares().then((rpta) => {
  console.log(rpta);
  dibujarPopulares(rpta);
});
