<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-menu-button slot="start"></ion-menu-button>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-menu side="start" menu-id="first" content-id="main">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Start Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item>Strona główna</ion-item>
            <ion-item>Ul numer 1</ion-item>
            <ion-item>Powiadomienia</ion-item>
            <ion-item>Ustawienia</ion-item>
            <ion-item>Wyloguj</ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>

      <slot />

      <ion-router-outlet id="main"></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<style>
ion-menu-button {
  --color: "dark";
}
</style>

<script>
import {
  IonMenuButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  menuController,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: ["pageTitle"],
  components: {
    IonMenuButton,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonRouterOutlet,
    IonTitle,
    IonToolbar,
  },
  methods: {
    openFirst() {
      menuController.enable(true, "first");
      menuController.open("first");
    },
  },
});
</script>
