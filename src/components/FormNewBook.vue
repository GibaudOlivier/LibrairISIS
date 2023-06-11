<script setup>
import { defineEmits, reactive } from "vue";
import Livre from "../Livre.js";
const livre = reactive(Livre);
const emit = defineEmits(["add-livre"]);
</script>

<template>
  <h3>Ajouter un nouveau livre :</h3>
  <form @submit.prevent="$emit('add-livre', livre)">
    <input type="text" v-model="livre.titre" placeholder="titre ?" />
    <input type="number" v-model="livre.prix" placeholder="prix ?" />
    <input type="number" v-model="livre.qtestock" placeholder="stock ?" />
    <input type="submit" value="Valider" />
  </form>
</template>

<style>
</style>