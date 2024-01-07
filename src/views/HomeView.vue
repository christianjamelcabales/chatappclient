<template>
  <headerSection />
  <div class="container text-center pt-5">
      <h3>Intoducing <strong>StrangersLink</strong> </h3>
      <h4><i>Discover Connections in the Online Space</i></h4>
      <div class="mt-5">
        <router-link to="/chat"><strong>Chat Now</strong></router-link>
      </div>
      <br>
      <div class="fixed-bottom mb-5">
        <img src="../../public/cjlogonew.png" class="mt-5" alt="">
        <p>&copy; 2024. All Rights Reserved </p>
        <hr>
      </div>
      

  </div>
</template>

<script setup>
import headerSection from '@/components/headerSection.vue';

</script>

<style scoped>


img{
  height: 50px;
  width: 50px;
}

</style>