<template>
    <div v-for="(item, index) in chatStore.singleconvo.chat" :key="index" >
      <div class="card">
        <div class="card-body"><p>{{ item.message }}</p></div>
      </div>
    </div>
  </template>
  
  <script setup>

  import {useChatStore} from '../stores/chat.js'
  const chatStore = useChatStore()


  </script>
  
  <style scoped></style>
  