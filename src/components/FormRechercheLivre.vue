<template>
  <form @submit.prevent="$emit('recherche-l', recherche)">
    <input type="text" v-model="recherche" placeholder="Quel Livre ?" />
    <input type="submit" value="Valider" />
    <p>{{ recherche }}</p>
  </form>
</template>

<script setup >
import { ref } from "vue";
const recherche = ref("");
</script>