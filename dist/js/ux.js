import{guardarListaPokemones,analizarLocalStorage,crearListaPokemonesStorage}from"./localStorage.js";import mapearRespuestaApi,{mapearListadoPokemones}from"./mapeadores.js";import{ocultarBotonAnterior,mostrarBotonAnterior,borrarLista,mostrarResultadoPokemon,mostrarNombresPokemon}from"./ui.js";let urlBase="https://pokeapi.co/api/v2/pokemon",indiceLista=0,listaStoragePokemones=[];async function informacionApi(o){const e=await fetch(o);o=await e.json();if(200!==e.status)throw new Error("La URL no funciona correctamente");return o}async function informacionApiPokemon(o){const e=await fetch("https://pokeapi.co/api/v2/pokemon/"+o);o=await e.json();if(200!==e.status)throw new Error("La URL con el pokemon seleccionado no funciona correctamente");return o}async function crearListaPokemones(){const e=document.querySelector(".list-pokemon__ul");if(analizarLocalStorage(indiceLista)){var o=JSON.parse(localStorage.getItem("listaPokemones__"+indiceLista));crearListaPokemonesStorage(o,e)}else try{var t=await informacionApi(urlBase);const r=mapearListadoPokemones(t);null===r.urlAnterior&&ocultarBotonAnterior(),Object.keys(r.nombresPokemones).forEach(o=>{o=r.nombresPokemones[o];listaStoragePokemones.push(o),mostrarNombresPokemon(o,e),guardarListaPokemones(listaStoragePokemones,indiceLista)})}catch(o){console.log("Error: "+o)}}function crearSiguienteListaPokemon(){const o=document.querySelector("#boton-siguiente-list");o.onclick=async()=>{await informacionApi(urlBase).then(o=>{null!=o.next&&(urlBase=o.next,borrarLista(),indiceLista+=1,crearListaPokemones(),mostrarBotonAnterior(),listaStoragePokemones=[])}).catch(o=>console.log("Error: "+o))}}function crearAnteriorListaPokemon(){const o=document.querySelector("#boton-anterior-list");o.onclick=async()=>{await informacionApi(urlBase).then(o=>{urlBase=o.previous,borrarLista(),--indiceLista,crearListaPokemones(),listaStoragePokemones=[]}).catch(o=>console.log("Error: "+o))}}function aplicarDatosPokemonSeleccionado(o){const e=document.querySelector(".mostrar-pokemon__header-p-name"),t=document.querySelector(".mostrar-pokemon__header-p-id"),r=document.querySelector(".mostrar-pokemon-img__front"),a=document.querySelector(".mostrar-pokemon-img__back"),n=document.querySelector(".mostrar-pokemon-datos__altura-p"),s=document.querySelector(".mostrar-pokemon-datos__peso-p");e.textContent=o.nombre,t.textContent="Nº"+o.id,r.src=o.fotoFront,a.src=o.fotoBack,n.textContent=""+o.altura,s.textContent=""+o.peso}async function obtenerDatosPokemonSeleccionado(o){try{var e=await informacionApiPokemon(o);aplicarDatosPokemonSeleccionado(mapearRespuestaApi(e))}catch(o){console.log("Error: "+o)}}function manejarBotonera(){crearSiguienteListaPokemon(),crearAnteriorListaPokemon()}function manejarClicks(){const o=document.querySelector(".list-pokemon__ul");let t;o.onclick=o=>{const e=o.target;e.classList.contains("pokemon")&&(obtenerDatosPokemonSeleccionado(t=e.id),mostrarResultadoPokemon())}}export{crearListaPokemones,manejarBotonera,manejarClicks};