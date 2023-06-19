<template>
  <div class="principal">
    <h2>LibraiISIS</h2>
  </div>
  <AffichListLivres></AffichListLivres>
</template>

<script setup>
import AffichListLivres from "./components/AffichListLivres.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h2 {
  color: red;
}
.principal {
}
.listLivre {
  background-image: url("./images/chemin.jpg");
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 90%;
  text-decoration: none;
  text-align: center;
  color: white;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
ul {
  list-style: none;
}
</style>
