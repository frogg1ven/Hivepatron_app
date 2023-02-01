<template>
  <ion-page>
    <ion-content>
        <div class="center">
          <div class="bg-img">
          <form @submit.prevent="userLogin">
            <div class="ion-margin">
              <ion-input class="input-border" v-model="user.email" name="email" type="email" placeholder="Wprowadź adres email..." ngModel required></ion-input>
            </div>
            <div class="ion-margin">
              <ion-input class="input-border" v-model="user.password" name="password" type="password" placeholder="Wprowadź hasło..." ngModel required></ion-input>
            </div>
            <div>
              <ion-button class="ion-margin nice-btn" size="large" type="submit" expand="block">Zaloguj</ion-button>
              <!-- <div>
                <ion-item class="checkbox-item center2">
                  <ion-checkbox class="box" color="primary"></ion-checkbox>
                  <ion-label class="label" color="medium">Nie wylogowuj mnie.</ion-label>
                </ion-item>
              </div> -->
              <p class="forgot-password text-right mt-2 mb-4 ion-margin">
                <router-link to="/forgot-password" class="a-link">Zapomniałeś hasła?</router-link>
              </p>
            </div>
            <div>
              <p class="signup text-right mt-2 mb-4 ion-margin">
                <router-link to="/signup" class="a-link"> Stwórz nowe konto!</router-link>
              </p>
            </div>
            <hr>
            <div>
              <ion-button class="ion-margin nice-btn" size="large" type="button" expand="block" @click="openWifi()">Zaloguj do WiFi</ion-button>
            </div>
          </form>
          </div>
        </div>
    </ion-content>
  </ion-page>
</template>

<script>

import firebase from 'firebase/app'
import 'firebase/auth'

import {
  // IonItem,
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  // IonCheckbox,
  // IonLabel,
} from "@ionic/vue";

export default {
  components: {
    // IonItem,
    IonContent,
    IonPage,
    IonInput,
    IonButton, 
    // IonCheckbox,
    // IonLabel,
  },

  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userLogin() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push('/hives')
          this.$store.commit('updateUsername', this.user.email)
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    openWifi() {
        this.$router.push('/wifi')
    },
  }
};
</script>
