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
     
}

