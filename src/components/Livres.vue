<script setup>
import AffichListLivres from "./AffichListLivres.vue";
import FormRechercheLivre from "./FormRechercheLivre.vue";
import { ref } from "vue";

const recherche = ref("");

function handlerTexte(texte) {
  recherche.value = texte;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div>
    <h3>Ma petite librairie</h3>
    <!--<FormRechercheLivre @addc="handlerTexte" />  -->
    <AffichListLivres :recherche="recherche" />
  </div>
</template>
