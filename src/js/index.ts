import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IForecast {
    temp: number,
    pressure: number,
    humidity: number
}

let baseURI: string = "http://localhost:61565/api/Weathers";

function GetCurrentWeather(): void {
    let currentTempSpanElement: HTMLSpanElement = <HTMLSpanElement>document.getElementById("currentTemp");
    let currentHumiditySpanElement: HTMLSpanElement = <HTMLSpanElement>document.getElementById("currentHumidity");
    let currentPressureSpanElement: HTMLSpanElement = <HTMLSpanElement>document.getElementById("currentPressure");

axios.get<IForecast>(baseURI + "/Current")
.then(function (response: AxiosResponse): void {
    let currentForecast: IForecast = response.data;
    currentTempSpanElement.innerHTML = currentForecast.temp.toString();
    currentHumiditySpanElement.innerHTML = currentForecast.humidity.toString();
    currentPressureSpanElement.innerHTML = currentForecast.pressure.toString();
})
.catch(function (error: AxiosError): void {
if (error.response){
    currentTempSpanElement.innerHTML = error.message;
    currentHumiditySpanElement.innerHTML = " ";
    currentPressureSpanElement.innerHTML = " ";
}
else {
    currentTempSpanElement.innerHTML = error.message;
    currentHumiditySpanElement.innerHTML = " ";
    currentPressureSpanElement.innerHTML = " ";
}
})

}

//let currentButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("currentWeatherButton");
//currentButton.addEventListener("click", GetCurrentWeather);

function UpdateCurrentWeather(): void {
setInterval(GetCurrentWeather, 10000)
}

GetCurrentWeather()
UpdateCurrentWeather()
