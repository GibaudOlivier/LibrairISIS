<template>
  <h3>Recherche d'un Livre</h3>
  <form @submit.prevent="$emit('recherche-l', recherche)">
    <input type="text" v-model="recherche" placeholder="Quel Livre ?" />
    <input type="submit" value="Valider" />
    <!--<p>{{ recherche }}</p>-->
      <p><ul id="listeRecherche"></ul></p>

  </form>
  
</template>

<script setup >
import { ref, defineEmits } from "vue";
const recherche = ref("");
const emit = defineEmits(["recherche-l"]);
</script>