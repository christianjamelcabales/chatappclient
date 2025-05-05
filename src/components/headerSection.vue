<template>

  <div class="main d-flex justify-content-center sticky-top py-1">
    <img src="/cjlogonew.png" alt="Logo" class="logo mr-3 shadow-sm rounded-circle">
    <div class="d-flex flex-column align-items-center">
        <h1 class="my-auto"> Chatyuki </h1> <!-- Bootstrap class "my-auto" vertically centers the title -->
    </div>
  </div>

</template>

<script setup>

</script>

<style scoped>

.main{
  background-color: #27296d;
  color: aliceblue;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
}

h1{
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

img{
  height: 50px;
  width: 50px;
}

</style>