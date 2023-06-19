<template>
  <div>
    <FormRechercheLivre @recherche="t" />
  </div>
  <h3>Liste des livres disponibles:</h3>
  <div class="listLivre">
    <ul>
      <UnLivre
        v-for="livre of listeLivres"
        :key="[livre.id]"
        :livre="livre"
        @deletel="deleteOneBook"
        @addl="addOneBook"
        @alldeletel="handlerDelete"
      />
      <FormNewBook @add-livre="handlerNewBook" />
    </ul>
  </div>
</template>

<script setup>
import { reactive, watch, defineProps, onMounted } from "vue";
import Livre from "../Livre.js";
import FormRechercheLivre from "./FormRechercheLivre.vue";
import UnLivre from "./UnLivre";
import FormNewBook from "./FormNewBook.vue";

const fetchOptions = { method: "GET" };
const listeLivres = reactive([]);

const apiKey = "8";
let url =
  "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/" +
  apiKey +
  "/livres";

const props = defineProps(["recherche"]);

// watch(
//   () => props.recherche,
//   (newcritere) => {
//     getLivres(newcritere);
//   }
// );

//Fonctions
function getLivres() {
  listeLivres.splice(0, listeLivres.lenght);
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
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

function modifieLivre(livre) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(livre),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
    })
    .catch((error) => console.log(error));
}

function handlerDelete(id) {
  const fetchOptions = {
    method: "DELETE",
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

function addOneBook(id) {
  const fetchOptions = { method: "GET" };
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((livre) => {
      livre.qtestock = livre.qtestock + 1;
      modifieLivre(livre);
      getLivres();
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
      getLivres();
    })
    .catch((error) => console.log(error));
}

function deleteOneBook(id) {
  const fetchOptions = { method: "GET" };
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((livre) => {
      if (livre.qtestock - 1 > 0) {
        livre.qtestock = livre.qtestock - 1;
        modifieLivre(livre);
      } else {
        handlerDelete(livre.id);
      }
    })
    .catch((error) => console.log(error));
}

onMounted(() => {
  getLivres();
});
</script>

