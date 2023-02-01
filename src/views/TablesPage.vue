<template>
  <base-layout page-title="Tabele">
    <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content ></ion-refresher-content>
    </ion-refresher>
    <div class="bg-img2">
      <ion-label class="label-text">Witaj</ion-label>
      <p>{{user.email}}</p>
    </div>
    <div class="bg-img2">
      <ion-item>
        <ion-label class="label-text">Wybrany ul</ion-label>
        <ion-select placeholder=1 @ionChange="changeHive()" v-model="selectedOption" interface="popover">
          <ion-select-option v-for="(item, index) in hives" :key="index" :value="item">{{item}}</ion-select-option>
        </ion-select>
      </ion-item>
    </div>
    <div class="bg-img2">
        <ion-row>      
          <ion-label class="label-text">Bateria</ion-label>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-label>{{battery_var}}</ion-label>
          </ion-col>
          <ion-col size=9>
            <div class="progress progress-sm mr-2" style="margin-top: 8px;">
              <div class="progress-bar bg-info" role="progressbar"
                :style="{width: battery + '%'}" aria-valuenow="90" aria-valuemin="0"
                aria-valuemax="100" id="batery" ref="batery">
              </div>
            </div>
          </ion-col>
        </ion-row>
    </div>
    <div class="bg-img2">
      <EasyDataTable
        :headers="headers"
        :items="items"
        alternating
        border-cell
        buttons-pagination
        table-class-name="customize-table"
        empty-message="Wczytywanie danych"
        :hide-rows-per-page="hideRowsPerPage"
        :rows-per-page="rowsPerPAge"
        :loading="loading"
        :theme-color="themecolor"
      >
        <template #loading>
          <img
            src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
            style="width: 100px; height: 80px;"
          />
        </template>
      </EasyDataTable>
    </div>
  </base-layout>
</template>

<script>

import firebase from "firebase/app";
import 'firebase/auth';
import store from "../store/index.js";
import { sendMessage } from '../worker-api';

import { 
  IonRefresher,
  IonRefresherContent,
  IonLabel,
  IonSelectOption,
  IonSelect,
  IonItem,
  IonRow,
  IonCol,
} from '@ionic/vue';
import { defineComponent } from 'vue';
 

export default defineComponent({
  components: {
    IonRefresher,
    IonRefresherContent,
    IonLabel,
    IonSelectOption,
    IonSelect,
    IonItem,
    IonRow,
    IonCol,
    EasyDataTable: window['vue3-easy-data-table'],
  },
  data() {
    return {
      user: "",
      battery_var: "0%",
      selectedOption: 1,
      battery: 0,
      hives: [],
      headers: [
          { text: "Waga [kg]", value: "weight", sortable: true },
          { text: "Temp. [°C]", value: "temp", sortable: true },
          { text: "Wilg. [%]", value: "humi", sortable: true },
          { text: "Dźwięk [V]", value: "sound", sortable: true },
          { text: "Data", value: "date", sortable: false },
        ],
        items: [],
        rowsPerPAge: 100,
        hideRowsPerPage: true,
        loading: true,
        themecolor: "#FFDE7C",
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        store.commit('sendToken', this.user.email)
        sendMessage([this.user.email, 1, 'table']);
        console.log(store.state.weightData)
        
      } else {
        this.user = "";
        this.$router.push('/login')
      }
    });
  },
  computed: {
    counterUpdated() {
      return store.state.tableChangeCounter;
    }
  },
  watch: {
    counterUpdated (){
      console.log("Table data updated!")
      this.fillTable();
    }
  },
  methods: {
    fillTable(){
      this.user_info = store.state.userData;
      if(!this.hives.length)
        for (var i=0; i < this.user_info[2]; i++) this.hives.push(i + 1);
      this.items = store.state.tableData[this.selectedOption - 1];
      this.battery = store.state.batteryData[this.selectedOption - 1];
      
      if (this.battery > 100)
        this.battery_var = "100%";
      else 
        this.battery_var = this.battery + "%";
      this.loading = false;
    },
    changeHive(){
      this.loading = true;
      this.items = [];
      // worker message
      if (!store.state.batteryData[this.selectedOption - 1])
        sendMessage([this.user.email, this.selectedOption, 'table']);
      else
        this.fillTable();
    },
    doRefresh(event) {
      this.loading = true;
      this.items = [];
      sendMessage([this.user.email, this.selectedOption, 'table']);
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
  },
});
</script>

<style scoped>
.customize-table {
  --easy-table-body-even-row-background-color:	#fffde0;
}
</style>