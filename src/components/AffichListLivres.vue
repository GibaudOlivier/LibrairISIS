<template>
  <div>
    <FormRechercheLivre @recherche-l="handlerSearch" />
  </div>
  <h3>Liste des livres en Stock:</h3>
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

//Fonctions
//Permet de récupérer les livres
function getLivres() {
  //Vide la liste pour éviter les doublons
  listeLivres.splice(0, listeLivres.length);
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

//Permet de prendre en charge la modification des livres
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

//Gére la suppression définitive d'un livre (pas seulement -1 en stock)
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
      getLivres();
    })
    .catch((error) => console.log(error));
}

//Ajoute un livre au stock
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

//Supprime un livre au stock
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
        getLivres();
      } else {
        handlerDelete(livre.id);
      }
    })
    .catch((error) => console.log(error));
}

//Permet la création d'un nouveau livre, où on choisira le titre, le prix, et le stock
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

//Permet la fonctionnalité de recherche
function handlerSearch(recherche) {
  const fetchOptions = { method: "GET" };
  const urlsearch =
    "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/8/livres?search=";
  document.getElementById("listeRecherche").innerHTML = "";
  fetch(urlsearch + recherche, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      let listeLivre = dataJSON;
      let resultat = "";
      for (let livre of listeLivre) {
        resultat +=
          "<li>" +
          livre.titre +
          "; Stock : (" +
          livre.qtestock +
          ") Prix : (" +
          livre.prix +
          ")</li>";
      }
      //Gére le cas où la liste de recherche est vide
      if (listeLivre.length == 0) {
        resultat = "Aucun livre trouvé";
      }
      document.getElementById("listeRecherche").innerHTML += resultat;
    })
    .catch((error) => console.log(error));
}

onMounted(() => {
  getLivres();
});
</script>

