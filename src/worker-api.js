import Worker from 'worker-loader!./worker';
import store from "@/store/index.js";

const worker = new Worker();

worker.addEventListener('message', (e) => {
    switch (e.data[0]){
        case "user":
            store.commit("updateUser", e.data[1])
            break;
        case "chartData":
            // numer ula
            store.commit("updateHivenumber", e.data[3]);
            // dane uli
            store.commit("updateTemp", e.data[1][0]);
            store.commit("updateHumi", e.data[1][1]);
            store.commit("updateSound", e.data[1][2]);
            store.commit("updateWeight", e.data[1][3]);
            store.commit("updateBattery", e.data[2]);
            store.commit("incChartCounter");
            break;
        case "tableData":
            // numer ula
            store.commit("updateHivenumber", e.data[3]);
            // dane uli
            store.commit("updateTable", e.data[1]);
            store.commit("updateBattery", e.data[2]);
            store.commit("incTableCounter");
            break;
    }
});

// wysyłanie danych do workera
export function sendMessage(data){
    worker.postMessage(data)
}
