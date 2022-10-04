<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import FirstApp from './components/FirstApp.vue';
import UserGalery from './components/UserGalery.vue';
import DeleteElement from './components/DeleteElement.vue';



</script>

<template>
  <div>

   <Suspense>
    <FirstApp />

   </Suspense>

  </div>
 
</template>

<style scoped>
</style>
