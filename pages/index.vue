<template>
  <section class="container">
       <form v-on:submit.prevent="login">
         <h1>Login</h1>
          <div class="form-group">
              <input type="text" placeholder="email" class="form-control" v-model="email"/>
          </div>
          <div class="form-group">
              <input type="password" placeholder="password" class="form-control" v-model="password"/>
          </div>
          <div class="form-group">
              <input type="submit" class="btn btn-primary" value="Login"/>
          </div>
        </form>

        <div class="form-group">
              <input @click="logout" type="submit" class="btn btn-primary" value="Logout"/>
          </div>

       <form v-on:submit.prevent="register">
         <h1>Register</h1>
          <div class="form-group">
              <input type="text" placeholder="email" class="form-control" v-model="email"/>
          </div>
          <div class="form-group">
              <input type="text" placeholder="username" class="form-control" v-model="username"/>
          </div>
          <div class="form-group">
              <input type="password" placeholder="password" class="form-control" v-model="password"/>
          </div>
          <div class="form-group">
              <input type="submit" class="btn btn-primary" value="Login"/>
          </div>
        </form>
  </section>
</template>

<script>
import firebase from "firebase"
import { db } from "~/plugins/firebase"

export default {
  firebase: {
    users: db.ref('users')
  },
  data () {
    return {
      email: '',
      user: '',
      username: '',
      password: ''
    }
  },
  methods: {
    register () {
      let self = this
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function (user) {
        var currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({
          displayName: self.username,
        }).then(function() {
          alert('updated')
        }).catch(function(error) {
          alert(error)
        });
        console.log(user)
        let userData = {}
        userData.email = user.user.email
        userData.id = user.user.uid
        userData.name = self.username
        self.$firebaseRefs.users.push(userData)
        self.email = ''
        self.password = ''
        self.username = ''
        self.$router.push('chat')
      }, function(error){
        alert(error)
      })

    },
    login () {
      let self = this
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (response){
        console.log(response)
        self.email = ''
        self.password = ''
        self.$router.push('chat')
      }, function (error) {
        alert(error)
      })
    },
    logout() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert('signedout')
      }).catch(function(error) {
        // An error happened.
        alert(error)
      });
    }
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
