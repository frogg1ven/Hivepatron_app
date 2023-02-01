<template>
  <base-layout page-title="Przypominanie hasła">
    <ion-content>
      <div class="center">
        <div class="bg-img">
          <form @submit.prevent="forgetPassword">
            <div class="ion-margin">
              <ion-input
                class="input-border"
                v-model="user.email"
                name="email"
                type="email"
                placeholder="Wprowadź email"
                ngModel
                required
              ></ion-input>
            </div>
            <div>
              <ion-button class="ion-margin  nice-btn" size="large" type="submit" expand="block"
                >Resetuj hasło</ion-button
              >
              <hr>
              <ion-button
                class="ion-margin  nice-btn btn-red"
                size="large"
                type="button"
                expand="block"
                @click="backToLogin()"
                >Powrót</ion-button
              >
            </div>
          </form>
        </div>
      </div>
    </ion-content>
  </base-layout>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

import { IonContent, IonInput, IonButton } from "@ionic/vue";

export default {
  components: {
    IonContent,
    IonInput,
    IonButton,
  },

  data() {
    return {
      user: {
        email: "",
      },
    };
  },

  methods: {
    forgetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          alert("Sprawdź email, przez który założyłeś konto!");
          this.user = {
            email: "",
          };
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error);
        });
    },

    backToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
