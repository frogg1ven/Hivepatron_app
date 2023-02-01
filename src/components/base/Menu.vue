<template>
  <ion-menu side="end"  type="overlay" menu-id="app-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button @click="menuNavigation('/hives')">
          <ion-icon slot="start" :icon="videocam"></ion-icon>
          <ion-label>Pasieka</ion-label>
        </ion-item>
        <ion-item button @click="menuNavigation('/tables')">
          <ion-icon slot="start" :icon="grid"></ion-icon>
          <ion-label>Tabele</ion-label>
        </ion-item>
        <ion-item button @click="menuNavigation('/settings')">
          <ion-icon slot="start" :icon="settings"></ion-icon>
          <ion-label>Ustawienia</ion-label>
        </ion-item>
        <ion-item button @click="menuNavigation('/wifi')">
          <ion-icon slot="start" :icon="wifi"></ion-icon>
          <ion-label>Logowanie do WiFi</ion-label>
        </ion-item>
        <ion-item button type="submit" @click="logout()">
          <ion-icon slot="start" :icon="logOut"></ion-icon>
          <ion-label>Wyloguj</ion-label>
        </ion-item>
        <var style="height: 100px;"></var>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import firebase from "firebase/app"
import 'firebase/auth'

import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  menuController,
} from "@ionic/vue";

import {
  settings,
  logOut,
  videocam,
  wifi,
  batteryFull,
  batteryHalf,
  batteryDead,
  grid
} from "ionicons/icons";

export default {
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
  },

  setup() {
    return {
      settings,
      logOut,
      videocam,
      wifi,
      batteryFull,
      batteryHalf,
      batteryDead,
      grid
    };
  },

  methods: {
    menuNavigation(url){
      menuController.close("app-menu");
      this.$router.push(url);
    },

    logout() {
      firebase.auth().signOut().then(() => {
        menuController.close("app-menu");
        this.$router.push('/login');
      })
    },
  },

  created() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          menuController.enable(true, "app-menu");
        } else {
          menuController.enable(false, "app-menu")
        }
      }
    )
  }
};
</script>
