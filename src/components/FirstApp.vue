<template>
  <div>Componentes hoy</div>

  <div class="container">
    <div class="grid grid-cols-5">
      <div class="mx-2">
        <label for="">Nombre:</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="usuarios.nombre"
          type="text"
        />
      </div>
      <div class="mx-2">
        <label for="">Autor:</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="usuarios.autor"
          type="text"
        />
      </div>

      <div>
        <label for="">Foto:</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
  </div>

  <div class="container m-4">
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
          </div>
        </div>
        <div class="flow-root grid grid-cols-2">
          <ul
            v-for="usuario in bdUsers"
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
                      class="h-8 cursor-pointer p-0.5 animate__animated  animate__rotateIn"
                      src="https://cdn-icons-png.flaticon.com/512/3128/3128313.png"
                      alt=""
                    />{{ usuario.like }}</span
                  >
                  <span class="inline-flex text-gray-600"
                    ><img
                      @click="pointVote('dislike', usuario.id)"
                      class="h-7 cursor-pointer p-0.5 animate__animated  animate__rotateIn"
                      src="https://cdn-icons-png.flaticon.com/512/8279/8279702.png"
                      alt=""
                    />{{ usuario.dislike }}</span
                  >
                </div>

                <div>
                  <img
                    class="cursor-pointer m-2 rounded-md shadow"
                    :src="usuario.foto"
                    alt=""
                  />
                </div>
                <img
                @click="showDetails"
                class="h-8 w-auto cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/1632/1632602.png"
                alt=""
              />
              <p>{{toogleMenu}}</p>
<div v-if="toogleMenu">
  <DeleteElement :toogle="toogleMenu"></DeleteElement>
</div> 

               
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <UserGalery :usuarios="bdUsers"></UserGalery>
  <UserGalery :delClick="gets"></UserGalery>

  <UserGalery :del-users="getUser"></UserGalery>
  
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
import 'animate.css';
// Con ES Modules (Si, estas usando del lado del cliente, parecido a React)

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase

// Initialize Cloud Firestore and get a reference to the service

let gets = ref("");
let bdUsers = ref([]);
let category = ref("");
let software = ref("");
let toogleMenu = ref(false);

let usuarios = ref({
  nombre: "",
  autor: "",
  software: "",
  foto: "",
  categoria: "",
  like: 0,
  dislike: 0,
});

defineProps({});

let insertUser = async () => {
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

    /*  usuarios.value.id=docRef.id */

    bdUsers.value = [];
    console.log("Document written with ID: ", docRef.id);

    console.log(usuarios.value);
    getUser();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getUser = async (filtro) => {
  bdUsers.value = [];

  if (filtro == "" || filtro == undefined || filtro == "todos") {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      bdUsers.value.push(doc.data());
    });
  } else {
    bdUsers.value = [];

    const q = query(collection(db, "users"), where("categoria", "==", filtro));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      bdUsers.value.push(doc.data());
    });
  }
};

const deleteUsers = async (id) => {
  await deleteDoc(doc(db, "users", id));
  bdUsers.value = [];

  getUser();
};

const filterCategory = async (filtro) => {
  const q = query(collection(db, "users"), where("categoria", "==", filtro));
  getUser();
};

const pointVote = async (option, id) => {
  console.log(option, id);

  if (option == "like") {
    const ref = doc(db, "users", id);

    // Atomically increment the population of the city by 50.
    await updateDoc(ref, {
      like: increment(1),
    });
  } else {
    const ref = doc(db, "users", id);

    // Atomically increment the population of the city by 50.
    await updateDoc(ref, {
      dislike: increment(1),
    });
  }
};

const showDetails = () => {
  toogleMenu.value =true;
};



getUser();
</script>
<!-- https://firebase.google.com/docs/firestore/query-data/get-data
https://firebase.google.com/docs/firestore/quickstart#web-version-9_4 -->
