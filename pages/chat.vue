<template>
  <section class="container">
    <div class="chat">
      <ul v-for="(messageItem,key) in chatMessages" :key="key">
        <h2> {{messageItem.contact}} </h2>
        <li v-for="(message, key) in messageItem.messages" :key="key">
        {{message}}
        </li>
         <div class="form-group">
              <input  placeholder="reply" type="text" class="form-control" v-model="replyMessage"/>
              <button @click="reply(messageItem)">Send</button>
          </div>
      </ul>
      <br><br><br>
       <form v-on:submit.prevent="sendMessage">
          <div class="form-group">
              <input type="text" placeholder="start conversation" class="form-control" v-model="message"/>
          </div>
        </form>

        <p>Send message to:</p>
        <ul>
          <li @click="startConversation(user.name)" v-for="(user,key) in users" :key="key">
            {{user.name}}
          </li>
        </ul>

              {{$store.state.user.displayName}} // {{$store.state.user.uid}}

    </div>
  </section>
</template>

<script>
import { db } from "~/plugins/firebase"
import firebase from "firebase"

export default {
  firebase: {
    chat: db.ref('messages'),
    users: db.ref('users'),
  },
  data () {
    return {
      replyMessage: '',
      message: '',
      messages: [],
      username: '',
      userUid: '',
      chatMessages: ''
    }
  },
  methods: {
      startConversation(recipient) {
        var date = new Date();
        var time = date.getTime();
        this.messages.push(this.message)
        db.ref('messages/' + this.$store.state.user.displayName + '/' + time).set({
          messages: this.messages,
          contact: recipient,
          id: time
        })
        db.ref('messages/' + recipient + '/' + time).set({
          messages: this.messages,
          contact: this.$store.state.user.displayName,
          id: time
        })
         this.message = '';
      },
      reply(message) {
        var chat = message.messages;
        console.log(chat, message)
        chat.push(this.replyMessage);
        db.ref('messages/' + message.contact + '/' + message.id).update({
          messages: chat,
        })
        db.ref('messages/' + message.contact + '/' + message.id).update({
          messages: chat,
        })


      }
  },
  mounted: function () {
    var data = db.ref('messages/' + this.$store.state.user.displayName)
    var self = this;
    data.on('value', function(snapshot) {
      self.chatMessages = snapshot.val();
    });


  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

ul li {
  list-style-type:none;
  padding: 0;
}

ul {
  padding: 0;
}
</style>
