import { createRouter, createWebHistory } from "vue-router";
import Livres from "../components/Livres.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "livres",
      component: Livres
    }
  ]
});
export default router;
