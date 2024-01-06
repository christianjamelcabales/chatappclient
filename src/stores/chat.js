import { defineStore } from 'pinia';
import { myAxios } from '../../config/axios';

export const useChatStore = defineStore('chat', {
  state: () => ({
    convo: null,
    clientId: null,
    convoId: null,
    singleconvo: null,
    isLoading: true,
    hideTypingMessage: true,
    whoIsTyping: null
  }),
  actions: {
    async getAll() {
      
      try {
        const response = await myAxios.get('/chat/');
        this.convo = response.data;
      } catch (error) {
        console.error('Error fetching all conversations:', error);
      } 
    },

    async getSingle() {
      await this.getAll()
      // Find the conversation
      let myconvo = this.convo.find((item) => item.pair.includes(Number(this.clientId)));

      // Check if conversation is found before making the API request
      if (myconvo) {
    
        try {
          const response = await myAxios.get(`/chat/${myconvo._id}`);
          this.singleconvo = response.data;
          this.isLoading = false
        } catch (error) {
          console.error('Error fetching single conversation:', error);
        } 
      } else {
        console.log('Conversation not found for the specified client ID. ' + this.clientId);
      }

     

    },

    async updateConvo(){
      
      let myconvo = this.convo.find((item) => item.pair.includes(Number(this.clientId)));
      await myAxios.patch(`/chat/${myconvo._id}`, {
        status: this.clientId
      });
     
      
    
    },

    async deleteConvo(){
      await this.getAll()
      // Find the conversation
      let myconvo = this.convo.find((item) => item.pair.includes(Number(this.clientId)));
      try {
       // await myAxios.delete(`http://localhost:3000/chat/${myconvo._id}`);
        if(myconvo.pair.length===1){
          await myAxios.delete(`/chat/${myconvo._id}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
});
