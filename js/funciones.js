import {URL_BACKEND, API_KEY} from "./variables.js";

//Importar varias funciones del documento variables
//En la concatenación del url y el api se agregara:
//${variables.URL_BACKEND} y ${variables.API_KEY} => se le pone 
//variables.(elemento a exportar), porque de todo el documento 
//variables sólo quiero extraer la URL_BACKEND y el API_KEY
/* import * as variables from './variables.js' */

export const buscarPeliculasPorNombre = async(busqueda)=>{
  let response = await fetch(`${URL_BACKEND}search/movie?api_key=${API_KEY}&language=es-PE&page=1&include_adult=false&query=${busqueda}`);
  const json = await response.json();
  return json;
}

export const getPopulares = async()=>{
  let response = await fetch(`${URL_BACKEND}movie/popular?api_key=${API_KEY}&language=es-PE&page=1`);
  const json = await response.json();
  return json;
};

export const limitarCaracteres = ({title, overview})=>{
  if (title.length >= 40) {
    return overview.substr(0,50) + " <a href='#'> Ver más... </a>";
  } else{
    return overview.substr(0,100) + " <a href='#'> Ver más... </a>";
  }
}


//Importar múltimples funciones de un documento
//externo con un objeto.
/* export const exportar = {
  URL: "COLOCARURL.COM",
  API: "COLOCAR CLAVE API",
  funcionCuadrado: (n)=>{
    return n*n;
  };
}; */