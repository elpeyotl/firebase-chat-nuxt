import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
import createStore from '@/store';

Vue.use(VueFire)

// explicit installation required in module environments
// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBdA2Sc2ZRRFoWMJuScm8upB_DjrilED18",
        authDomain: "phil-5e463.firebaseapp.com",
        databaseURL: "https://phil-5e463.firebaseio.com",
        projectId: "phil-5e463",
        storageBucket: "phil-5e463.appspot.com",
        messagingSenderId: "519922370091"
    })
}
export default ({ store }) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(store)
            store.commit('setUser', user)
        } else {
            // No user is signed in.
        }
    });
}

export const db = firebase.database()



