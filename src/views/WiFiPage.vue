<template>
  <base-layout page-title="Wysyłanie danych WiFi">
    <ion-content>
      <div class="center">
        <div class="bg-img">
          <form @submit.prevent="sendCredentials">
            <div>
              <div class="ion-margin">
                <ion-input class="input-border" v-model="wifi.ssid" name="ssid" type="ssid" placeholder="SSID" ngModel required></ion-input>
              </div>
              <div class="ion-margin">
                <ion-input class="input-border" v-model="wifi.password" name="password" type="password" placeholder="Hasło" ngModel required></ion-input>
              </div>
            </div>
            <div>
              <ion-button class="ion-margin nice-btn" size="large" type="submit" expand="block">Wyślij dane logowania</ion-button>
              <hr v-if="hide">
              <ion-button class="ion-margin nice-btn btn-red" size="large" type="button" expand="block" v-if="hide" @click="backToLogin()">Powrót do logowania</ion-button>
            </div>
          </form>
        </div>
      </div>
    </ion-content>
  </base-layout>
</template>

<script>

import { 
  IonContent,
  IonInput,
  IonButton,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from "axios"
import firebase from "firebase/app";


export default defineComponent({
  components: {
    IonContent,
    IonInput,
    IonButton, 
  },
  data() {
    return {
      wifi: {
        ssid: '',
        password: ''
      },
      hide: false
    };
  },
  methods: {
    sendCredentials(){
      console.log("Wysyłanie danych")
      axios.get("http://192.168.4.1/update", {params: {ssid: this.wifi.ssid, password: this.wifi.password}})
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    backToLogin() {
        this.$router.push('/login')
    }
  },
  updated() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.hide = false;
      } else {
        this.hide = true;
      }
    });
  }
});

</script>
