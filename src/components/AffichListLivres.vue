<template>
  <div>
    <FormRechercheLivre @recherche="t" />
  </div>
  <h3>Liste des livres</h3>
  <ul>
    <!--<li v-for="livre in listeLivres" :key="[livre.id]">
      {{ livre.pourAfficher() }} <br />
      <button @click="$emit('deletel', livre.id)">-</button>
    </li>-->
    <UnLivre
      v-for="livre of listeLivres"
      :key="[livre.id]"
      :livre="livre"
      @deletel="deleteLivre"
    />
  </ul>
</template>

<script setup>
import { reactive } from "vue";
import { watch } from "vue";
import { defineProps } from "vue";
import Livre from "../Livre.js";
import FormRechercheLivre from "./FormRechercheLivre.vue";
import UnLivre from "./UnLivre";

const fetchOptions = { method: "GET" };
const listeLivres = reactive([]);

const props = defineProps(["recherche"]);

watch(props, (newcritere) => {
  getTodos(newcritere.recherche);
});

const apiKey = "2";
let url =
  "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/" +
  apiKey +
  "/livres";

getTodos();

//Fonctions
function getTodos(recherche) {
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      dataJSON.forEach((livres) =>
        listeLivres.push(
          new Livre(livres.id, livres.titre, livres.qtestock, livres.prix)
        )
      );
      console.log(listeLivres);
    })
    .then((error) => {
      console.log(error);
    });
}

/*function getRecherche(recherche) {
  url =
    "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/4/livres?search=" +
    recherche;
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      dataJSON.forEach((livres) =>
        listeLivres.push(
          new Livre(livres.id, livres.titre, livres.qtestock, livres.prix)
        )
      );
      console.log(listeLivres);
    })
    .then((error) => {
      console.log(error);
    });
}*/

function handlerDelete(id) {
  const fetchOptions = {
    method: "delete",
  };
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
    })
    .catch((error) => console.log(error));
}

function handlerAdd(l) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ libelle: l }),
  };
  let p = new Livre(l);
  listeLivres.push(p);

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      dataJSON.forEach((v) =>
        listeLivres.push(new Livre(v.id, v.libelle, v.fait))
      );
    })
    .catch((error) => console.log(error));
}

function handlerNewBook(livre) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      titre: livre.titre,
      qtestock: livre.qtestock,
      prix: livre.prix,
    }),
  };

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      dataJSON.forEach((v) =>
        listeLivres.push(new Livre(v.id, v.libelle, v.fait))
      );
    })
    .catch((error) => console.log(error));
}
</script>

