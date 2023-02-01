<template>
  <base-layout page-title="Ustawienia">
  <ion-content>
    <div class="center">
        <div class="bg-img">
          <ion-row>
            <ion-label class="label-text">Powiadomienia o możliwym wyrojeniu</ion-label>
          </ion-row>
          <ion-row>
            <ion-col>
              <p>Alarm</p>
            </ion-col>
            <ion-col>
              <ion-toggle @ionChange="update_alarm_state($event)" :checked="checked"></ion-toggle>
            </ion-col>
          </ion-row>
      </div>
    </div>
    
    </ion-content>
  </base-layout>
</template>

<script>

import { 
  IonContent,
  IonToggle,
  IonRow,
  IonCol,
  IonLabel,
} from '@ionic/vue';
import { defineComponent , ref} from 'vue';
import axios from "axios"

export default defineComponent({
  components: {
    IonContent,
    IonToggle,
    IonRow,
    IonCol,
    IonLabel
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
      alarm_data.append('fun', 'update_alarm');

      // console.log(user_name, event.target.checked)

      axios.post("http://192.3.81.66/assets/php/app/index.php", alarm_data)
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
    get_alarm_data.append('fun', 'get_alarm');
    axios.post("http://192.3.81.66/assets/php/app/index.php", get_alarm_data)
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
