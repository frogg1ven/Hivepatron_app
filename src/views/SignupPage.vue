<template>
  <base-layout page-title="Rejestracja">
    <ion-content>
      <div class="center">
        <div class="bg-img">
          <form @submit.prevent="userRegistration">
            <div>
              <div class="ion-margin">
                <ion-input class="input-border"
                  v-model="user.email"
                  name="email"
                  type="email"
                  placeholder="Wprowadź email"
                  ngModel
                  required
                ></ion-input>
              </div>
              <div class="ion-margin">
                <ion-input class="input-border"
                  v-model="user.password"
                  name="password"
                  type="password"
                  placeholder="Wprowadź hasło"
                  ngModel
                  required
                ></ion-input>
              </div>
              <div class="ion-margin">
                <ion-input class="input-border"
                  v-model="user.rep_password"
                  name="rep_password"
                  type="password"
                  placeholder="Powtórz hasło"
                  ngModel
                  required
                ></ion-input>
              </div>
            </div>
            <div>
              <ion-button class="ion-margin nice-btn" size="large" type="submit" expand="block"
                >Zarejestruj</ion-button
              >
              <p class="forgot-password text-right">
                Masz już konto?
                <router-link :to="{ name: 'Login' }" class="a-link">
                  Zaloguj się</router-link
                >
              </p>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </ion-content>
  </base-layout>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

const data1 = new FormData();
const data2 = new FormData();

import {
  IonContent,
  IonInput,
  IonButton,
} from "@ionic/vue";

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
        password: "",
        rep_password: "",
      },
      t: "",
    };
  },

  methods: {
    userRegistration() {
      if (this.user.password != this.user.rep_password) {
        window.alert("Wprowadzone hasła nie są identyczne");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
            data1.append("username", this.user.email);
            data1.append("token", this.t);
            data1.append("hives", 1);

            console.log(this.t);

            data2.set("token", this.t + "1");

            // add user info
            axios
              .post("http://192.3.81.66/strona/php/add_user.php", data1)
              .catch((error) => {
                console.log(error);
                // Manage errors if found any
              });

            // create individual db
            axios
              .post("http://192.3.81.66/strona/php/install.php", data2)
              .catch((error) => {
                console.log(error);
                // Manage errors if found any
              });

            this.$router.push("/login");
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    },

    token() {
      return (
        Math.random()
          .toString(36)
          .substr(2) +
        Math.random()
          .toString(36)
          .substr(2)
      );
    },
  },
};
</script>
