<template>
  <div class="container">
    <div class="grid grid-cols-5">
      <div class="mx-2">
        <label for="">Nombre:</label>
        <input
          class="required:border-red-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="usuarios.nombre"
          type="text"
        />
      </div>
      <div class="mx-2">
        <label for="">Autor:</label>
        <input
          class="required:border-red-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="usuarios.autor"
          type="text"
        />
      </div>

      <div>
        <label for="">Foto:</label>
        <input
          class="required:border-red-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="usuarios.foto"
          type="text"
        />
      </div>
      <div>
        <label for="">Software:</label>
        <select v-model="usuarios.software" name="cars" id="cars">
          <option disabled value="">Seleccione</option>
          <option>MidJourney</option>
          <option>Dall-e</option>
          <option>Stable Diffusion</option>
        </select>
      </div>

      <div>
        <label for="">Categoria:</label>
        <select v-model="usuarios.categoria" name="cars" id="cars">
          <option disabled value="">Seleccione</option>
          <option>3D</option>
          <option>Paisajes</option>
          <option>caricaturas</option>
          <option>animales</option>
        </select>
      </div>

      <button class="bg-orange-400 m-2" @click="insertUser">Enviar</button>
    </div>

    <div class="max-w-6xl mx-auto">
      <div
        class="p-4 bg-gray-50 rounded-lg border shadow-md sm:p-8 dark:bg-gray-200 opacity-95 dark:border-gray-900"
      >
        <div class="flex justify-between items-center mb-4">
          <h3
            class="text-xl font-bold leading-none text-gray-900 dark:text-teal-500"
          >
            Desplegar
          </h3>
          <div class="text-teal-600">
            <div
              class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
            >
              <select
                class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                v-model="category"
                name="cars"
                id="cars"
              >
                <option disabled value="">Seleccione</option>
                <option>todos</option>
                <option>caricaturas</option>
                <option>3D</option>
              </select>
            </div>

            <button class="bg-orange-400 m-2" @click="getUser(category)">
              Filtrar
            </button>

            <button class="bg-orange-400 m-2" @click="sortItems">
              Ordenar
            </button>
          </div>
        </div>
        <div class="flow-root grid grid-cols-2">
          <ul
            v-for="usuario in datosPaginados"
            :key="usuario.id"
            role="list"
            class="divide-y divide-gray-100 dark:divide-gray-700"
          >
            <li class="py-3 sm:py-4">
              <p
                class="text-gray-700 text-xl fonttitle text-center bg-teal-500 mx-2 rounded-t-2xl py-2"
              >
                {{ usuario.nombre }}
              </p>
              <div
                class="flex items-center space-x-4 bg-teal-50 hover:bg-teal-100 rounded-b-2xl shadow mx-2"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded-full mx-2"
                    src="https://media.discordapp.net/attachments/1010211132671275058/1020361444203708446/6bea349a-59f3-40d4-a3d2-a661ccc7ef6c_progress_image_100.webp?width=663&height=663"
                    alt="Neil image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-00 truncate dark:text-gray-400">
                    {{ usuario.autor }}
                  </p>
                </div>
                <div
                  class="items-center text-base font-semibold text-teal-300 dark:text-teal-300"
                >
                  <p>{{ usuario.software }}</p>
                  <span class="inline-flex text-gray-600"
                    ><img
                      @click="pointVote('like', usuario.id)"
                      class="h-8 cursor-pointer p-0.5 animate__animated animate__rotateIn"
                      src="https://cdn-icons-png.flaticon.com/512/3128/3128313.png"
                      alt=""
                    />{{ usuario.like }}</span
                  >
                  <span class="inline-flex text-gray-600"
                    ><img
                      @click="pointVote('dislike', usuario.id)"
                      class="h-7 cursor-pointer p-0.5 animate__animated animate__rotateIn"
                      src="https://cdn-icons-png.flaticon.com/512/8279/8279702.png"
                      alt=""
                    />{{ usuario.dislike }}</span
                  >
                </div>

                <div id="defaultModal">
                  <img
                    @click="zoomPhoto"
                    class="imgs cursor-pointer m-2 rounded-md shadow"
                    :src="usuario.foto"
                    alt=""
                  />
                </div>

                <img
                  @click="toogleMenu = true"
                  class="h-8 w-auto cursor-pointer"
                  src="https://cdn-icons-png.flaticon.com/512/1632/1632602.png"
                  alt=""
                />

                <div v-if="toogleMenu == true">
                  <div
                    class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
                  >
                    <div class="bg-white px-16 py-14 rounded-md text-center">
                      <h1 class="text-xl mb-4 font-bold text-slate-500">
                        Ingrese contraseña para eliminar
                      </h1>
                      <label for="">Contraseña</label>
                      <input v-model="password" type="text" />
                      <button @click="deleteItem(usuario.id)">Enviar</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          {{ totalPage() }}
          <nav aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px">
              <li
                v-for="pagina in totalPage()"
                @click="getDataPage(pagina)"
                :key="pagina.id"
              >
                <a
                  href="#"
                  class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >Pag {{ pagina }}</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserGalery from "./UserGalery.vue";
import { ref, onMounted } from "vue";
import firebase from "../firebase";
import { addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, setDoc, increment } from "firebase/firestore";
import db from "../firebase";
import DeleteElement from "./DeleteElement.vue";
import "animate.css";
import misfunciones from "./misfunciones.js";
// Con ES Modules (Si, estas usando del lado del cliente, parecido a React)

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase

// Initialize Cloud Firestore and get a reference to the service

let password = ref("");
let bdUsers = ref([]);
let category = ref("");
let software = ref("");
let toogleMenu = ref(false);
let elementPage = ref(4);
let datosPaginados = ref([]);
let medida = ref(null);
let usuarios = ref({
  nombre: "",
  autor: "",
  software: "",
  foto: "",
  categoria: "",
  like: 0,
  dislike: 0,
});


/* Redodea al paginar */
const totalPage = () => {
  return Math.ceil(bdUsers.value.length / elementPage.value);
};

/* divide la cantidad de item en el numero de pagina */
const getDataPage = (noPag) => {
  datosPaginados.value = [];
  let ini = noPag * elementPage.value - elementPage.value;
  let fin = noPag * elementPage.value;

  datosPaginados.value = bdUsers.value.slice(ini, fin);
};


onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  querySnapshot.forEach((doc) => {
    bdUsers.value.push(doc.data());
  });
  getDataPage(1);
});


/* Inserta en la bd de firebase */
let insertUser = async () => {
  if (
    usuarios.value.nombre == "" ||
    usuarios.value.autor == "" ||
    usuarios.value.foto == ""
  ) {
    alert("favor completar datos");
  } else {
    try {
      const docRef = await addDoc(collection(db, "users"), usuarios.value);
      await setDoc(doc(db, "users", docRef.id), {
        nombre: usuarios.value.nombre,
        autor: usuarios.value.autor,
        software: usuarios.value.software,
        foto: usuarios.value.foto,
        id: (usuarios.value.id = docRef.id),
        categoria: usuarios.value.categoria,
        like: usuarios.value.like,
        dislike: usuarios.value.dislike,
      });

      bdUsers.value = [];
      /*       console.log("Document written with ID: ", docRef.id); */

      getUser();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};

/* Elimina item db firebase */
const deleteItem = (item, select) => {
  if (password.value == "1234") {
    deleteDoc(doc(db, "users", item));
    toogleMenu.value = false;
  } else {
    alert("contraseña incorrecta");
  }
};

/* Obtiene datos del servidor de firebase */
const getUser = async (filtro) => {
  bdUsers.value = [];

  if (filtro == "" || filtro == undefined || filtro == "todos") {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      bdUsers.value.push(doc.data());
      datosPaginados.value = bdUsers.value;
    });
  } else {
    bdUsers.value = [];

    const q = query(collection(db, "users"), where("categoria", "==", filtro));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      bdUsers.value.push(doc.data());
      datosPaginados.value = bdUsers.value;
    });
  }
};

/* Puntuacion de usuario */
const pointVote = async (option, id) => {
  if (option == "like") {
    const ref = doc(db, "users", id);

    await updateDoc(ref, {
      like: increment(1),
    });

    const unsub = onSnapshot(doc(db, "users", id), (doc) => {
      /*  console.log("Current data: ", doc.data()); */
    });
  } else {
    const ref = doc(db, "users", id);

    await updateDoc(ref, {
      dislike: increment(1),
    });
  }
};

/* Ordena items */
const sortItems = () => {
  bdUsers.value.sort((a, b) => {
    return b.like - a.like;
  });
};

getUser();
</script>
<!-- https://firebase.google.com/docs/firestore/query-data/get-data
https://firebase.google.com/docs/firestore/quickstart#web-version-9_4 -->
<!--  -->