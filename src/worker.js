import axios from "axios";

self.addEventListener("message", (e) => {
    console.log("odebrane dane: ", e.data)

    let formData = new FormData();
    formData.set('current_user', e.data[0]);
    formData.append('fun', 'user');
    
    axios.post("http://192.3.81.66/assets/php/app/index.php", formData)
    .then(res => {
        // console.log("data: ", res.data)
        // odpowiedź do api
        self.postMessage(["user", res.data]);
        
        formData = new FormData();
        formData.set('token', res.data[1] + e.data[1]);
        formData.append('fun', 'fill');
        
        switch(e.data[2]){
            case 'chart':
                // poiberanie danych
                axios.post("http://192.3.81.66/assets/php/app/index.php", formData)
                .then(res => {
                    let calcArray = [];
                    let battery;

                    // temperatura
                    calcArray[0] = res.data[6].map((el, index) => [Date.parse(el + " " + res.data[7][index]), res.data[0].map(Number)[index]]);
                    // wilgotność
                    calcArray[1] = res.data[6].map((el, index) => [Date.parse(el + " " + res.data[7][index]), res.data[1].map(Number)[index]]);
                    // dźwięk
                    calcArray[2] = res.data[6].map((el, index) => [Date.parse(el + " " + res.data[7][index]), res.data[2].map(Number)[index]]);
                    // waga
                    calcArray[3] = res.data[6].map((el, index) => [Date.parse(el + " " + res.data[7][index]), res.data[3].map(Number)[index]]);

                    battery = [+(71 * parseFloat(res.data[4][0]) - 129).toFixed()];

                    calcArray[0] = calcArray[0].filter( value => !Number.isNaN(value[0]));
                    calcArray[1] = calcArray[1].filter( value => !Number.isNaN(value[0]));
                    calcArray[2] = calcArray[2].filter( value => !Number.isNaN(value[0]));
                    calcArray[3] = calcArray[3].filter( value => !Number.isNaN(value[0]));

                    // odpowiedź do api
                    // [case switcha, [tmp, humi, sound, weight], battery, hiveNumber]
                    self.postMessage(["chartData", calcArray, battery, e.data[1]]);
                }).catch(error => {
                    console.log(error)
                })
                break;
            case 'table':
                axios.post("http://192.3.81.66/assets/php/app/index.php", formData)
                .then(res => {
                    console.log(res.data)
                    let tableData = [];
                    for (let i=0; i < 3000; i++){
                        tableData.push({ weight: res.data[3][i], temp: res.data[0][i], humi: res.data[1][i], sound: res.data[2][i], date: res.data[7][i] + " " + res.data[6][i]})
                    }
                    let battery = [+(71 * parseFloat(res.data[4][0]) - 129).toFixed()];
                    // odpowiedź do api
                    self.postMessage(["tableData", tableData, battery, e.data[1]]);
                }).catch(error => {
                    console.log(error)
                })
                break;
        }
        
    }).catch(error => {
        console.log(error)
    });
    
});