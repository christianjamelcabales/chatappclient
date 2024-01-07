<template>
  <headerSection />
  <div class="container text-center pt-5">
      <h3>Intoducing <strong>StrangersLink</strong> </h3>
      <h4>Discover Online Connections </h4>
      
      <router-link to="/chat"><strong>Chat Now</strong></router-link>
      <br>
      <img src="../../public/cjlogonew.png" class="mt-5" alt="">
      <p>&copy; 2024. All Rights Reserved </p>
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