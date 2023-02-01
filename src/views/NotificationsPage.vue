<template>
  <base-layout page-title="Powiadomienia">
    <ion-content>
        <ion-grid>
          <ion-row>
            <ion-col size="7">
              <ion-row>
                <h5 class="text-custom">Powiadomienia o możliwym wyrojeniu</h5>
              </ion-row>
              <ion-row>
                <ion-text class="ion-text-start">Alarm</ion-text>
              </ion-row>
            </ion-col>
            <ion-col class="center" text-center size="3">
              <ion-toggle @ionChange="update_alarm_state($event)" :checked="checked"></ion-toggle>
            </ion-col>
          </ion-row>
      </ion-grid>
    
    </ion-content>
  </base-layout>
</template>

<script>

import { 
  IonContent,
  IonToggle,
  IonRow,
  IonCol,
  IonGrid,
  IonText

} from '@ionic/vue';
import { defineComponent , ref} from 'vue';
import axios from "axios"

export default defineComponent({
  components: {
    IonContent,
    IonToggle,
    IonRow,
    IonCol,
    IonGrid,
    IonText
  },
  setup() {
    const checked = ref([]);
    return { checked };
  },
  methods: {
    update_alarm_state(event) {
      const alarm_data = new FormData();
      let user_name = this.$store.getters.username;
      alarm_data.set('user_name', user_name);
      alarm_data.append('alarm_state', event.target.checked);

      console.log(user_name, event.target.checked)

      axios.post("http://192.3.81.66/strona/php/update_alarm.php", alarm_data)
      .then(res => {
          console.log(res.status)
      })
      .catch(error => {
      console.log(error)
          // Manage errors if found any
      })
    },
    set_alarm_state(state) {
      if (state == 1)
        this.checked = true
      else
        this.checked = false
    }
  },
  created() {
    const get_alarm_data = new FormData();
    get_alarm_data.set('user_name', this.$store.getters.username);
    axios.post("http://192.3.81.66/strona/php/get_Alarm.php", get_alarm_data)
      .then(res => {

        console.log("Alarm state: " + res.data)
        this.set_alarm_state(res.data)

      })
      .catch(error => {
        console.log(error)
         // Manage errors if found any
      })
  }

});
</script>

<style>
    ion-toggle {
      width: 60px;
      height: 30px;
      --handle-spacing: 4px;
      --handle-height: 80%;
      --handle-width: 40%;
      --border-radius: 15px 15px 15px 15px
    }
    .center {
      margin: auto
    }
    .text-custom {
      font-weight: 500;
    }
  </style>
