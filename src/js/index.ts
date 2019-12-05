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
let ThirdPartyOneDayBaseURI: string = "http://api.weatherbit.io/v2.0/current?key=49723e60fdf2450db46f0b67d9d152ea&&city=Roskilde&&lang=da";

function GetCurrentIndoorWeather(): void {
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
            if (error.response) {
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

function GetCurrentOutsideWeatherCondition(): void {
    let currentWeatherConditionElement: HTMLDivElement = <HTMLDivElement>document.getElementById("currentOutsideWeatherCondition");

    axios.get(ThirdPartyOneDayBaseURI)
        .then(function (response: AxiosResponse): void {
            let jsonString: string = JSON.stringify(response.data);
            let splitWeatherConditionString: string = jsonString.split('"description":', 2)[1].split(',', 2)[0];
            currentWeatherConditionElement.innerHTML = splitWeatherConditionString.substring(1, splitWeatherConditionString.length-2);
        })
        .catch(function (error: AxiosError): void {
            currentWeatherConditionElement.innerHTML = error.message;
        })
}

let currentOutsideWeatherConditionButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("currentOutsideWeatherConditionButton");
currentOutsideWeatherConditionButton.addEventListener("click", GetCurrentOutsideWeatherCondition);

function UpdateCurrentIndoorWeather(): void {
    setInterval(GetCurrentIndoorWeather, 10000)
}

GetCurrentIndoorWeather()
UpdateCurrentIndoorWeather()
