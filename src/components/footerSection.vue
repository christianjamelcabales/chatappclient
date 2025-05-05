<template>
  <div class="main">
    <!-- Scrollable content -->
    <div v-if="!chatStore.isLoading" class="scrollable-content mb-2">
      <div
        class="container pt-1"
        v-for="(item, index) in chatStore.singleconvo.chat"
        :key="index"
        ref="messageContainer"
      >
      <div v-if="item.message!=='!@#$%^&*'" class="card my-1">
          <div 
            class="card-body"
            :class="{ 
              chat1: item.user === Number(chatStore.clientId),
              chat2: item.user !== Number(chatStore.clientId)
            }"
          >
            <p :class="{ 'text-end': item.user === Number(chatStore.clientId) }">
              {{ item.message}}
            </p>
          </div>
        </div>
        <div>
      <div class="container fixed-bottom mb-5" :class="{'d-none': chatStore.hideTypingMessage }" style="opacity: 0.2;">

          <div class="spinner-grow spinner-grow-sm mr-2" role="status"></div>
          <em>Stranger is typing...</em>
          <p></p>
        </div>
        </div>


      </div>

  <!-- Your existing code -->
      <div ref="scrollTarget" class="mt-5"></div>
    </div>
    <div v-else>
        <div class="scrollable-content mb-2">
          <div class="container pt-1">
            <div class="card my-1">
              <div class="card-body chat2">
                  <p> *** Connecting you to a stranger, please wait... *** </p>
              </div>
            </div>
          </div>
        </div>
    </div>

    <!-- Fixed bottom container -->
    <div class="input-group mt-5 fixed-bottom botdiv">
      <input
        type="text"
        v-model="message"
        class="form-control"
        placeholder="Type your message..."
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        @keyup.enter="send"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="input-group-text" id="basic-addon2">
        <button @click="send" :class="{ disabled: message.trim() === '' || chatStore.singleconvo.chat.length<2 }" class="btn">Send</button>
      </span>
      <span class="input-group-text" id="basic-addon2">
        <button @click="reset" class="btn">New Chat</button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onBeforeMount, watch } from 'vue'

import { useChatStore } from '@/stores/chat'
const chatStore = useChatStore()

const scrollTarget = ref(null)


chatStore.getSingle();


const showtyping = () =>{
  chatStore.hideTypingMessage = false;

  setTimeout(() => {
    chatStore.hideTypingMessage = true;
  }, 2000);
}

const handleFocus = async () => {
  await chatStore.updateConvo()
  await chatStore.getSingle()
  socket.send('!@#$%^&*')
  
}

const handleBlur = async () => {
  chatStore.singleconvo.chat.filter(obj => obj.message !== '!@#$%^&*');
  
}



const beforeUnloadHandler = (event) => {
  const message = 'Are you sure you want to leave?'
  event.returnValue = message
  return message
}

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeUnloadHandler)
})

onBeforeMount(() => {
  window.addEventListener('beforeunload', beforeUnloadHandler)
})

const reset = async () => {
  await chatStore.deleteConvo()

  location.reload()
}

let message = ref('')
// Create WebSocket connection.

const socket = new WebSocket('wss://chatappserver-34od.onrender.com/');



// Ensure the WebSocket connection is open before interacting with it.
socket.addEventListener('open', async () => {
  // Perform actions after the WebSocket connection is open.
  console.log('WebSocket connection opened')

  // Get chat data when the WebSocket connection is open.
  await chatStore.getSingle()
})

// Connection opened
const send = async () => {
  // Ensure the WebSocket connection is open before sending a message.
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message.value)
  }

  // Log the updated convo state after sending a message.
  await chatStore.getSingle()

  console.log('Message sent')
  message.value = ''
  
}

let clientIdSet = false

socket.addEventListener('message', async (event) => {
 
 
  // Log the received message and update the convo state.
  console.log('Received message:', event.data)
 

  // Update clientId if not set.
  if (!clientIdSet) {
    chatStore.clientId = event.data
    clientIdSet = true
  }

  // Log the updated convo state after receiving a message.
  await chatStore.getSingle()

  console.log('You are ' + chatStore.clientId)
  //console.log('Log this:', JSON.stringify(chatStore.singleconvo, null, 2))
  if (chatStore.singleconvo.chat.length > 2) {
    scrollTarget.value.scrollIntoView({ behavior: 'smooth' })
  }

  if (Number(chatStore.singleconvo.status) !== Number(chatStore.clientId) && Number(chatStore.singleconvo.status)!==0 && !chatStore.singleconvo.pair.includes(0))
  {
    await showtyping()
  }

 
 

})

socket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed:', event)
  // Additional handling if needed
})
</script>

<style scoped>
.scrollable-content {
  max-height: calc(100vh - 10); /* Adjust the value as needed */
  overflow-y: auto;
}

/* Hide scrollbar */
.scrollable-content::-webkit-scrollbar {
  display: none;
}

.main {
  background-color: #eeeeee;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
}

.chat1 {
  background-image: linear-gradient(45deg, #8e37d7 0%, #2cd8d5 100%);

  border-radius: 5px;
}

.chat2 {
  background-image: linear-gradient(45deg, #ffc796 0%, #ff6b95 100%);
  border-radius: 5px;
}

p {
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

button {
  background-color: #27296d;
  color: aliceblue;
}

button:hover {
  background-color: #27296d;
  color: aliceblue;
  box-shadow: 2px 2px 5px #888888; /* Add a box shadow on hover */
  transform: scale(1.1); /* Scale the button on hover */
}

/* Additional styles for the disabled state */
.btn.disabled {
  background-color: #27296d;
  color: aliceblue;
  cursor: not-allowed; /* Example: Change cursor to indicate not clickable */
  /* Add any other styles you want for the disabled state */
}

.botdiv {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}


.alert{
 
}
</style>
