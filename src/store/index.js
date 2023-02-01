import { createStore } from 'vuex';
// import axios from "axios"

/* Firebase */
import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyA898wIkXHIj9sxhNH37MEtWAv6UFN4TZE",
  authDomain: "hive-patron.firebaseapp.com",
  projectId: "hive-patron",
  storageBucket: "hive-patron.appspot.com",
  messagingSenderId: "272958826549",
  appId: "1:272958826549:web:49f0586385f4a9d2fd297c",
  measurementId: "G-F50WPMMZ30"
});

const store = createStore({
    state: {
        status: null,
        username: null,
        weightData: [],
        tempData: [],
        humiData: [],
        soundData: [],
        userData: [],
        batteryData: [],
        hiveNumber: 0,
        chartsChangeCounter: 0,
        tableChangeCounter: 0,
        tableData: [],
    },
    getters: {
        msg_token: state => {
            return state.msg_token;
        },
        username: state => {
            return state.username;
        },
    },
    mutations: {
        updateToken(state, token) {
            state.status = token
        },
        sendToken(state, user_name) {
            const msgFormData = new FormData();
            msgFormData.set('user_name', user_name);
            msgFormData.append('msg_token', state.status);

            // axios.post("http://192.3.81.66/strona/php/update_msg_token.php", msgFormData)
            // .then(res => {
            //     console.log(res.status)
            // })
            // .catch(error => {
            // console.log(error)
            //     // Manage errors if found any
            // })
        },
        updateUsername(state, username){
            state.username = username
        },
        updateHivenumber(state, number){
            state.hiveNumber = number - 1;
        },
        updateWeight(state, weight){
            // if (!state.weightData.len){
            //     for (var i=0; i<state.userData[2]; i++){
            //         state.weightData[i] = [];
            //     }
            // }
            state.weightData[state.hiveNumber] = weight;

        },
        updateTemp(state, temp){
            state.tempData[state.hiveNumber] = temp;
        },
        updateHumi(state, humi){
            state.humiData[state.hiveNumber] = humi;
        },
        updateSound(state, sound){
            state.soundData[state.hiveNumber] = sound;
        },
        updateBattery(state, battery){
            state.batteryData[state.hiveNumber] = battery;
        },
        updateUser(state, user){
            state.userData = user;
        },
        incChartCounter(state){
            state.chartsChangeCounter++;
        },
        incTableCounter(state){
            state.tableChangeCounter++;
        },
        updateTable(state, table){
            state.tableData[state.hiveNumber] = table;
        },
    },
    actions: {

    }
});

export default store;