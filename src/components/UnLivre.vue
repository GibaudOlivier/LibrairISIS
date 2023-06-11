<script setup>
defineProps(["livre"]);
</script>
<template>
  <li>
    {{ livre.pourAfficher() }} <br />
    <button @click="$emit('deletel', livre.id)">-</button>
    <button @click="$emit('addl', livre.id)">+</button>
    <button @click="$emit('alldeletel', livre.id)">Supprimer</button>
  </li>
</template>
<style>
</style>