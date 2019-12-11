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
let ThirdPartySixteenDaysBaseURI: string = "http://api.weatherbit.io/v2.0/forecast/daily?key=49723e60fdf2450db46f0b67d9d152ea&&city=Roskilde&&lang=da&&days=16";

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
            ChooseWeatherIcon(splitWeatherConditionString);
            currentWeatherConditionElement.innerHTML = splitWeatherConditionString.substring(1, splitWeatherConditionString.length - 2);
        })
        .catch(function (error: AxiosError): void {
            currentWeatherConditionElement.innerHTML = error.message;
        })
}

function ChooseWeatherIcon(weatherDescription: string): void {
    let currentOutsideWeatherConditionIconElement: HTMLDivElement = <HTMLDivElement>document.getElementById("currentOutsideWeatherConditionIcon");
    let weatherIcon: string = '<img class="img-fluid" src="';
    if (weatherDescription.toUpperCase().indexOf("SOL") !== -1) {
        weatherIcon += 'https://www.dmi.dk/fileadmin/templates/img/1.svg';
    }
    else if (weatherDescription.toUpperCase().indexOf("SKY") !== -1) {
        weatherIcon += 'https://www.dmi.dk/fileadmin/templates/img/3.svg';
    }
    else if (weatherDescription.toUpperCase().indexOf("REGN") !== -1) {
        weatherIcon += 'https://www.dmi.dk/fileadmin/templates/img/63.svg';
    }
    else if (weatherDescription.toUpperCase().indexOf("SNE") !== -1) {
        weatherIcon += 'https://www.dmi.dk/fileadmin/templates/img/73.svg';
    }
    else if (weatherDescription.toUpperCase().indexOf("TÅGE") !== -1) {
        weatherIcon += 'https://www.dmi.dk/fileadmin/templates/img/45.svg';
    }

    weatherIcon += '" alt="">';

    currentOutsideWeatherConditionIconElement.innerHTML = weatherIcon;
}


function GetCurrentOutsideWeatherTemperature(): void {
    let currentOutsideWeatherTemperature: HTMLDivElement = <HTMLDivElement>document.getElementById("currentOutsideWeatherTemperature");
    axios.get(ThirdPartyOneDayBaseURI)
        .then(function (response: AxiosResponse): void {

            let JsonString: string = JSON.stringify(response.data);
            let position1: number = JsonString.indexOf("\"temp\"");
            let position1Over: number = JsonString.indexOf(",", position1);
            let sub1: string = JsonString.substr(position1 + 7, position1Over - position1 - 7);
            currentOutsideWeatherTemperature.innerHTML = sub1;

        }).catch(function (error: AxiosError): void {
            currentOutsideWeatherTemperature.innerHTML = error.message;
        })
}


function GetCurrentOutsideWeatherTemperatureThreeDays(): void {
    let currentOutsideWeatherTemperatureThreeDays: HTMLDivElement = <HTMLDivElement>document.getElementById("currentOutsideWeatherTemperatureThreeDays");
    axios.get(ThirdPartySixteenDaysBaseURI)
        .then(function (response: AxiosResponse): void {

            let JsonString: string = JSON.stringify(response.data);
            let position1: number = JsonString.indexOf("\"temp\"");
            let position1Over: number = JsonString.indexOf(",", position1);
            let sub1: string = JsonString.substr(position1 + 7, position1Over - position1 - 7);

            let position2: number = JsonString.indexOf("\"temp\"", position1Over)
            let position2Over: number = JsonString.indexOf(",", position2)
            let sub2: string = JsonString.substr(position2 + 7, position2Over - position2 - 7)

            let position3: number = JsonString.indexOf("\"temp\"", position2Over)
            let position3Over: number = JsonString.indexOf(",", position3)
            let sub3: string = JsonString.substr(position3 + 7, position3Over - position3 - 7)

            currentOutsideWeatherTemperatureThreeDays.innerHTML = sub1 + ", " + sub2 + ", " + sub3;
        }).catch(function (error: AxiosError): void {
            currentOutsideWeatherTemperatureThreeDays.innerHTML = error.message;
        })
}


function GetCurrentOutsideWeatherWindspeed(): void {
    let currentOutsideWeatherWindspeed: HTMLDivElement = <HTMLDivElement>document.getElementById("currentOutsideWeatherWindspeed");
    axios.get(ThirdPartyOneDayBaseURI)
        .then(function (response: AxiosResponse): void {

            let JsonString: string = JSON.stringify(response.data);
            let position1: number = JsonString.indexOf("\"wind_spd\"");
            let position1Over: number = JsonString.indexOf(",", position1);
            let sub1: string = JsonString.substr(position1 + 11, position1Over - position1 - 11);
            currentOutsideWeatherWindspeed.innerHTML = sub1;

        }).catch(function (error: AxiosError): void {
            currentOutsideWeatherWindspeed.innerHTML = error.message;
        })
}


let currentOutsideWeatherTemperatureButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("currentOutsideWeatherTemperatureButton");
currentOutsideWeatherTemperatureButton.addEventListener("click", GetCurrentOutsideWeatherTemperature);

let currentOutsideWeatherWindspeedButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("currentOutsideWeatherWindspeedButton");
currentOutsideWeatherWindspeedButton.addEventListener("click", GetCurrentOutsideWeatherWindspeed);

let currentOutsideWeatherConditionButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("currentOutsideWeatherConditionButton");
currentOutsideWeatherConditionButton.addEventListener("click", GetCurrentOutsideWeatherCondition);


let currentOutsideWeatherTemperatureThreeDaysButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("currentOutsideWeatherTemperatureThreeDaysButton");
currentOutsideWeatherTemperatureThreeDaysButton.addEventListener("click", GetCurrentOutsideWeatherTemperatureThreeDays);


function UpdateCurrentIndoorWeather(): void {
    setInterval(GetCurrentIndoorWeather, 10000)
}

GetCurrentIndoorWeather()
UpdateCurrentIndoorWeather()
