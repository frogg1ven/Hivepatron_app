<template>
  <ion-app>
    <Menu></Menu>
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { PushNotifications } from '@capacitor/push-notifications';
import Menu from './components/base/Menu.vue'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Menu,
  },
  data() {
    return {
      user: "",
    }
  },
  mounted() {
    PushNotifications.requestPermissions().then(result => {
      console.log('result ' + JSON.stringify(result));
      // Initialize the registration with FCM Token
      PushNotifications.register();
    });
    // On registration we can get the token
    PushNotifications.addListener('registration', (token) => {
      console.log('Push registration success, token: ' + token.value);
      this.$store.commit('updateToken', token.value)
    });
    // Add Notification received
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        alert("Możliwe wyrojenie!")
        console.log(`notification received ${JSON.stringify(notification)}`);
      }
    ),
    // Add Action performed
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      async (notification) => {
        alert("Możliwe wyrojenie!")
        console.log(`notification performed ${JSON.stringify(notification)}`);
      }
    )
  }
});
</script>