<template>
  <ion-page>
    <ion-header :translucent="true"  class="ion-no-border">
      <ion-toolbar translucent>
        <ion-menu-button style="position: absolute; right: 0;" slot="end" @click="openMenu()" class="menuButton">
        </ion-menu-button>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <slot />

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  menuController,
  IonMenuButton
  
} from "@ionic/vue";

import {
  menu
} from "ionicons/icons";

export default {
  props: ["pageTitle"],

  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton
  },

  methods: {
    openMenu() {
      menuController.open("app-menu")
    }
  },

  setup() {
    return {
      menu,
    };
  },

};
</script>
