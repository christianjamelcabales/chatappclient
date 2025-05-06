<template>
  <headerSection />
  <div class="container text-center pt-5">
      <h3>Introducing <strong>Yukimeet</strong> </h3>
      <h4><i>Jump into real-time conversations with strangers online. <br>
        No sign-up, no hassle. Just pure connection.</i></h4>
      <div class="mt-5">
        <router-link to="/chat"><strong>[Chat Now]</strong></router-link>
      </div>
      <br>
      
      <div class="fixed-bottom mb-5">
        <img src="../../public/cjlogonew2.png" class="mt-5" alt="">
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