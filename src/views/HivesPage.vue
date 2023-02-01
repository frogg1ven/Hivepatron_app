<template>
  <base-layout page-title="Pasieka">
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
      <ion-item>
        <ion-label class="label-text">Czas</ion-label>
        <ion-select placeholder="1 dzień" @ionChange="changeUnit()" v-model="selectedTime" interface="popover">
          <ion-select-option value="1" >1 godz.</ion-select-option>
          <ion-select-option value="2">2 godz.</ion-select-option>
          <ion-select-option value="3">6 godz.</ion-select-option>
          <ion-select-option value="4">12 godz.</ion-select-option>
          <ion-select-option value="5">1 dzień</ion-select-option>
          <ion-select-option value="6">2 dni</ion-select-option>
          <ion-select-option value="7">6 dni</ion-select-option>
          <ion-select-option value="8">12 dni</ion-select-option>
          <ion-select-option value="9">30 dni</ion-select-option>
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
    
    <div class="chart">
      <div class="bg-img2" >
        <highcharts ref="weightGraph" :options="weightOptions"></highcharts>
      </div>
      <div class="bg-img2">
        <highcharts ref="tempGraph" :options="tempOptions"></highcharts>
      </div>
      <div class="bg-img2">
        <highcharts ref="humiGraph" :options="humiOptions"></highcharts> 
      </div> 
      <div class="bg-img2">
        <highcharts ref="soundGraph" :options="soundOptions" :callback="chartCallback"></highcharts> 
      </div> 
    </div>

  </base-layout>
</template>

<script>
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonCol, IonRow, IonRefresher, IonRefresherContent} from "@ionic/vue";

import { defineComponent } from "vue";
// import axios from "axios"
import BaseLayout from "../components/base/BaseLayout.vue";

import firebase from "firebase/app";
import 'firebase/auth';

import { sendMessage } from '../worker-api';
import store from "../store/index.js";

// const formData = new FormData();
// let formData_one = new FormData();
// let formDataArr = [];

export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    BaseLayout,
    IonCol, 
    IonRow,
    IonRefresher,
    IonRefresherContent,
  },
  data() {
    return {
      user: "",
      key: "",
      user_info: [],
      token: "",
      hives: [],
      selectedOption: 1,
      selectedTime: 5,
      weightData: store.state.weightData,
      tempData: store.state.tempData,
      humiData: store.state.humiData,
      soundData: store.state.soundData,
      battery: store.state.batteryData,
      battery_var: "0%",
      // wykres wagi
      weightOptions: {
        chart: {
          type: "spline",
        },
        boost: {
          enabled: true,
          useGPUTranslations: true,
          usePreAllocated: true
        },
        title: {
          text: 'Waga'
        },
        navigator: {
          enabled: true
        },
        scrollbar: {
          enabled: true
        },
        time: {
          useUTC: false
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f} kg'
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
              text: 'Waga (kg)'
          },
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: "#f9db1a",
              lineWidth: 1
            }
          }
        },
      },
      // wykres temperatury
      tempOptions: {
        chart: {
          type: "spline",
        },
        boost: {
          enabled: true,
          useGPUTranslations: true,
          usePreAllocated: true
        },
        title: {
          text: 'Temperatura'
        },
        time: {
          useUTC: false
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f} °C'
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
              text: 'Temperatura (°C)'
          },
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: "#f9db1a",
              lineWidth: 1
            }
          }
        },
      },
      // wykres wilgotności
      humiOptions: {
        chart: {
          type: "spline",
        },
        boost: {
          enabled: true,
          useGPUTranslations: true,
          usePreAllocated: true
        },
        title: {
          text: 'Wilgotność'
        },
        time: {
          useUTC: false
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f} %'
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
              text: 'Wilgotność (%)'
          },
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: "#f9db1a",
              lineWidth: 1
            }
          }
        },
      },
      // wykres dźwięku
      soundOptions: {
        chart: {
          type: "spline",
        },
        boost: {
          enabled: true,
          useGPUTranslations: true,
          usePreAllocated: true
        },
        title: {
          text: 'Dźwięk'
        },
        time: {
          useUTC: false
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f} V'
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
              text: 'Dźwięk (V)'
          },
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: "#f9db1a",
              lineWidth: 1
            }
          }
        },
      },
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        store.commit('sendToken', this.user.email)
        
        // formData.set('current_user', this.user.email);
        // formData.append('fun', 'user');

        this.$refs.weightGraph.chart.showLoading("Wczytywanie danych...");
        this.$refs.tempGraph.chart.showLoading("Wczytywanie danych...");
        this.$refs.humiGraph.chart.showLoading("Wczytywanie danych...");
        this.$refs.soundGraph.chart.showLoading("Wczytywanie danych...");

        sendMessage([this.user.email, 1, 'chart']);
        
      } else {
        this.user = "";
        this.$router.push('/login')
      }
    });
  },
  computed: {
    counterUpdated() {
      return store.state.chartsChangeCounter;
    }
  },
  watch: {
    counterUpdated (){
      console.log("Hives data updated!")
      this.fillCharts();
    }
  },
  methods: {
    chartCallback() {
      console.log("callback")
      setTimeout(() => {
        this.$refs.weightGraph.chart.reflow();
        this.$refs.tempGraph.chart.reflow();
        this.$refs.humiGraph.chart.reflow();
        this.$refs.soundGraph.chart.reflow();
      },100);
    },
    fillCharts() {
      this.user_info = store.state.userData;
      if(!this.hives.length)
        for (var i=0; i < this.user_info[2]; i++) this.hives.push(i + 1);
      
      this.tempData = store.state.tempData[this.selectedOption - 1];
      this.humiData = store.state.humiData[this.selectedOption - 1];
      this.soundData = store.state.soundData[this.selectedOption - 1];
      this.weightData = store.state.weightData[this.selectedOption - 1];
      this.battery = store.state.batteryData[this.selectedOption - 1];
      
      if (this.battery > 100)
        this.battery_var = "100%";
      else 
        this.battery_var = this.battery + "%";
      
      this.$refs.weightGraph.chart.addSeries({
        name: 'Waga',
        color: "#f9db1a",
        data: [],
        boostThreshold: 1000,
        cropThreshold: 3000,
      });

      this.$refs.tempGraph.chart.addSeries({
        name: 'Temperatura',
        color: "#f9db1a",
        data: [],
        boostThreshold: 1000,
        cropThreshold: 3000
      });

      this.$refs.humiGraph.chart.addSeries({
        name: 'Wilgotność',
        color: "#f9db1a",
        data: [],
        boostThreshold: 1000,
        cropThreshold: 3000
      });

      this.$refs.soundGraph.chart.addSeries({
        name: 'Dźwięk',
        color: "#f9db1a",
        data: [],
        boostThreshold: 1000,
        cropThreshold: 3000
      });

      this.$refs.weightGraph.chart.hideLoading();
      this.$refs.tempGraph.chart.hideLoading();
      this.$refs.humiGraph.chart.hideLoading();
      this.$refs.soundGraph.chart.hideLoading();

      this.$refs.weightGraph.chart.series[0].setData(this.weightData);
      this.$refs.tempGraph.chart.series[0].setData(this.tempData);
      this.$refs.humiGraph.chart.series[0].setData(this.humiData);
      this.$refs.soundGraph.chart.series[0].setData(this.soundData);
    },
    changeUnit(){
      if (this.selectedTime == 1){ // 1 godzina
        this.$refs.weightGraph.chart.xAxis[0].setExtremes(this.weightData[this.selectedOption - 1][0][0] - 3600000, this.weightData[this.selectedOption - 1][0][0]);
        this.$refs.tempGraph.chart.xAxis[0].setExtremes(this.tempData[this.selectedOption - 1][0][0] - 3600000, this.tempData[this.selectedOption - 1][0][0]);
        this.$refs.humiGraph.chart.xAxis[0].setExtremes(this.humiData[this.selectedOption - 1][0][0] - 3600000, this.humiData[this.selectedOption - 1][0][0]);
        this.$refs.soundGraph.chart.xAxis[0].setExtremes(this.soundData[this.selectedOption - 1][0][0] - 3600000, this.soundData[this.selectedOption - 1][0][0]);
      }
      else if (this.selectedTime == 2){ // 2 godziny
        this.$refs.weightGraph.chart.xAxis[0].setExtremes(this.weightData[this.selectedOption - 1][0][0] - 7200000,this.weightData[this.selectedOption - 1][0][0]);
        this.$refs.tempGraph.chart.xAxis[0].setExtremes(this.tempData[this.selectedOption - 1][0][0] - 7200000, this.tempData[this.selectedOption - 1][0][0]);
        this.$refs.humiGraph.chart.xAxis[0].setExtremes(this.humiData[this.selectedOption - 1][0][0] - 7200000, this.humiData[this.selectedOption - 1][0][0]);
        this.$refs.soundGraph.chart.xAxis[0].setExtremes(this.soundData[this.selectedOption - 1][0][0] - 7200000, this.soundData[this.selectedOption - 1][0][0]);
      }
      else if (this.selectedTime == 3){ // 6 godzin
        this.$refs.weightGraph.chart.xAxis[0].setExtremes(this.weightData[this.selectedOption - 1][0][0] - 21600000, this.weightData[this.selectedOption - 1][0][0]);
        this.$refs.tempGraph.chart.xAxis[0].setExtremes(this.tempData[this.selectedOption - 1][0][0] - 21600000, this.tempData[this.selectedOption - 1][0][0]);
        this.$refs.humiGraph.chart.xAxis[0].setExtremes(this.humiData[this.selectedOption - 1][0][0] - 21600000, this.humiData[this.selectedOption - 1][0][0]);
        this.$refs.soundGraph.chart.xAxis[0].setExtremes(this.soundData[this.selectedOption - 1][0][0] - 21600000, this.soundData[this.selectedOption - 1][0][0]);
      }
      else if (this.selectedTime == 4){ // 12 godzin
        this.$refs.weightGraph.chart.xAxis[0].setExtremes(this.weightData[this.selectedOption - 1][0][0] - 43200000,this.weightData[this.selectedOption - 1][0][0]);
        this.$refs.tempGraph.chart.xAxis[0].setExtremes(this.tempData[this.selectedOption - 1][0][0] - 43200000, this.tempData[this.selectedOption - 1][0][0]);
        this.$refs.humiGraph.chart.xAxis[0].setExtremes(this.humiData[this.selectedOption - 1][0][0] - 43200000, this.humiData[this.selectedOption - 1][0][0]);
        this.$refs.soundGraph.chart.xAxis[0].setExtremes(this.soundData[this.selectedOption - 1][0][0] - 43200000, this.soundData[this.selectedOption - 1][0][0]);
      }
      else if (this.selectedTime == 5){ // 1 dzień
        this.$refs.weightGraph.chart.xAxis[0].setExtremes(this.weightData[this.selectedOption - 1][0][0] - 86400000, this.weightData[this.selectedOption - 1][0][0]);
        this.$refs.tempGraph.chart.xAxis[0].setExtremes(this.tempData[this.selectedOption - 1][0][0] - 86400000, this.tempData[this.selectedOption - 1][0][0]);
        this.$refs.humiGraph.chart.xAxis[0].setExtremes(this.humiData[this.selectedOption - 1][0][0] - 86400000, this.humiData[this.selectedOption - 1][0][0]);
        this.$refs.soundGraph.chart.xAxis[0].setExtremes(this.soundData[this.selectedOption - 1][0][0] - 86400000, this.soundData[this.selectedOption - 1][0][0]);
      }
      else if (this.selectedTime == 6){ // 2 dni
        this.$refs.weightGraph.chart.xAxis[0].setExtremes(this.weightData[this.selectedOption - 1][0][0] - 172800000, this.weightData[this.selectedOption - 1][0][0]);
        this.$refs.tempGraph.chart.xAxis[0].setExtremes(this.tempData[this.selectedOption - 1][0][0] - 172800000, this.tempData[this.selectedOption - 1][0][0]);
        this.$refs.humiGraph.chart.xAxis[0].setExtremes(this.humiData[this.selectedOption - 1][0][0] - 172800000, this.humiData[this.selectedOption - 1][0][0]);
        this.$refs.soundGraph.chart.xAxis[0].setExtremes(this.soundData[this.selectedOption - 1][0][0] - 172800000, this.soundData[this.selectedOption - 1][0][0]);
      }
      else if (this.selectedTime == 7){ // 6 dni
        this.$refs.weightGraph.chart.xAxis[0].setExtremes(this.weightData[this.selectedOption - 1][0][0] - 518400000, this.weightData[this.selectedOption - 1][0][0]);
        this.$refs.tempGraph.chart.xAxis[0].setExtremes(this.tempData[this.selectedOption - 1][0][0] - 518400000, this.tempData[this.selectedOption - 1][0][0]);
        this.$refs.humiGraph.chart.xAxis[0].setExtremes(this.humiData[this.selectedOption - 1][0][0] - 518400000, this.humiData[this.selectedOption - 1][0][0]);
        this.$refs.soundGraph.chart.xAxis[0].setExtremes(this.soundData[this.selectedOption - 1][0][0] - 518400000, this.soundData[this.selectedOption - 1][0][0]);
      }
      else if (this.selectedTime == 8){ // 12 dni
        this.$refs.weightGraph.chart.xAxis[0].setExtremes(this.weightData[this.selectedOption - 1][0][0] - 1036800000, this.weightData[this.selectedOption - 1][0][0]);
        this.$refs.tempGraph.chart.xAxis[0].setExtremes(this.tempData[this.selectedOption - 1][0][0] - 1036800000, this.tempData[this.selectedOption - 1][0][0]);
        this.$refs.humiGraph.chart.xAxis[0].setExtremes(this.humiData[this.selectedOption - 1][0][0] - 1036800000, this.humiData[this.selectedOption - 1][0][0]);
        this.$refs.soundGraph.chart.xAxis[0].setExtremes(this.soundData[this.selectedOption - 1][0][0] - 1036800000, this.soundData[this.selectedOption - 1][0][0]);
      }
      else if (this.selectedTime == 9){ // 30 dni
        this.$refs.weightGraph.chart.xAxis[0].setExtremes(this.weightData[this.selectedOption - 1][0][0] - 2592000000, this.weightData[this.selectedOption - 1][0][0]);
        this.$refs.tempGraph.chart.xAxis[0].setExtremes(this.tempData[this.selectedOption - 1][0][0] - 2592000000, this.tempData[this.selectedOption - 1][0][0]);
        this.$refs.humiGraph.chart.xAxis[0].setExtremes(this.humiData[this.selectedOption - 1][0][0] - 2592000000, this.humiData[this.selectedOption - 1][0][0]);
        this.$refs.soundGraph.chart.xAxis[0].setExtremes(this.soundData[this.selectedOption - 1][0][0] - 2592000000, this.soundData[this.selectedOption - 1][0][0]);
      }

    },
    changeHive(){
      // poiberanie danych
      this.$refs.weightGraph.chart.series[0].remove();
      this.$refs.tempGraph.chart.series[0].remove();
      this.$refs.humiGraph.chart.series[0].remove();
      this.$refs.soundGraph.chart.series[0].remove();

      this.$refs.weightGraph.chart.addSeries({
        name: 'Waga',
        color: "#f9db1a",
        data: [],
        boostThreshold: 1000,
        cropThreshold: 3000
      });

      this.$refs.tempGraph.chart.addSeries({
        name: 'Temperatura',
        color: "#f9db1a",
        data: [],
        boostThreshold: 1000,
        cropThreshold: 3000
      });

      this.$refs.humiGraph.chart.addSeries({
        name: 'Wilgotność',
        color: "#f9db1a",
        data: [],
        boostThreshold: 1000,
        cropThreshold: 3000
      });

      this.$refs.soundGraph.chart.addSeries({
        name: 'Dźwięk',
        color: "#f9db1a",
        data: [],
        boostThreshold: 1000,
        cropThreshold: 3000
      });

      this.$refs.weightGraph.chart.showLoading("Wczytywanie danych...");
      this.$refs.tempGraph.chart.showLoading("Wczytywanie danych...");
      this.$refs.humiGraph.chart.showLoading("Wczytywanie danych...");
      this.$refs.soundGraph.chart.showLoading("Wczytywanie danych...");

      // worker message
      if (!store.state.batteryData[this.selectedOption - 1])
        sendMessage([this.user.email, this.selectedOption, 'chart']);
      else
        this.fillCharts();
    },
    doRefresh(event) {
      this.$refs.weightGraph.chart.series[0].remove();
      this.$refs.tempGraph.chart.series[0].remove();
      this.$refs.humiGraph.chart.series[0].remove();
      this.$refs.soundGraph.chart.series[0].remove();

      this.$refs.weightGraph.chart.showLoading("Wczytywanie danych...");
      this.$refs.tempGraph.chart.showLoading("Wczytywanie danych...");
      this.$refs.humiGraph.chart.showLoading("Wczytywanie danych...");
      this.$refs.soundGraph.chart.showLoading("Wczytywanie danych...");

      sendMessage([this.user.email, this.selectedOption, 'chart']);
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
  },
});
</script>
