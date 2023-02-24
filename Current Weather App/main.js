//! SELECTORS
let cityInput = document.querySelector (".city");
let day = document.querySelector(".day");
let date_year = document.querySelector (".date");
let time = document.querySelector(".time");
let temperature = document.querySelector(".temperature");
let maxTemperature = document.querySelector(".maxtemperature")
let minTemperature = document.querySelector(".mintemperature")
    let weatherStatus = document.querySelector(".weather-status");
let windSpeed = document.querySelector(".wind-speed");
let humidity = document.querySelector(".humidity");
let pressure = document.querySelector(".pressure");
let sunriseTime = document.querySelector(".sunrise-time");
let sunsetTime = document.querySelector(".sunset-time");
let image = document.querySelector(".image");


cityInput.addEventListener("keyup",showWeather);
function showWeather(e){
    if(e.keyCode === 13){
        let city = cityInput.value;
        let xml = new XMLHttpRequest();
        xml.open(
            "GET",
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=df00027da47c22350f131b088a502f90&units=metric`
        );
        xml.onreadystatechange = function(){
            if(xml.readyState === 4 && xml.status === 200){
                displayResult(JSON.parse(xml.responseText));
            }
        };
        xml.send();
    }
    function displayResult(data){
        let date = new Date()
        let localTime = date.getTime();
        let localOffset = date.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;

        let utcTime = utc + 1000* data.timezone;
        let newCity = new Date(utcTime);

        let minSunrise = new Date(data.sys.sunrise * 1000).getMinutes();
        let minSunset= new Date(data.sys.sunset * 1000).getMinutes();
        let hoursSunrise = new Date(data.sys.sunrise * 1000).getHours();
        let hoursSunset = new Date(data.sys.sunset * 1000).getHours();

hoursSunrise < 10? hoursSunrise = "0" + hoursSunrise : hoursSunrise;
hoursSunset < 10? hoursSunset = "0" + hoursSunset : hoursSunset;
minSunrise < 10? minSunrise = "0" + minSunrise : minSunrise;
minSunset < 10? minSunset = "0" + minSunset : minSunset;

        let cityHour = newCity.getHours();
        let cityMin = newCity.getMinutes();
cityHour <10 ? cityHour = "0" + cityHour : cityHour;
cityMin <10? cityMin = "0" + cityMin : cityMin;

temperature.innerHTML = `${Math.round(data.main.temp)} &deg;C`;
maxTemperature.innerHTML = `Max: ${Math.round(data.main.temp_max)} &deg;C`;
minTemperature.innerHTML = `Min: ${Math.round(data.main.temp_min)} &deg;C`;

windSpeed.innerHTML = ` ${data.wind.speed} Km/h`;
humidity.innerHTML = ` ${data.main.humidity}%`;
pressure.innerHTML = ` ${data.main.pressure} hPa`;
sunriseTime.innerHTML = `${hoursSunrise}:${minSunrise} h`;
sunsetTime.innerHTML = `${hoursSunset}:${minSunset} h`;
weatherStatus.innerHTML = `Weather Status: ${data.weather[0].description}`;

let currentStatus = data.weather[0].description;
if (currentStatus.includes("mist")) {
    image.setAttribute("src", "images/mist.png");
} else if (currentStatus.includes("clear sky")) {
    image.setAttribute("src", "images/sun.png");
}else if (currentStatus.includes("rain")) {
    image.setAttribute("src", "images/rain.png");
}else if (currentStatus.includes("snow")) {
    image.setAttribute("src", "images/snow.png");
}else if (currentStatus.includes("thunderstorm")) {
    image.setAttribute("src", "images/thunderstorm.png");
}else if (currentStatus.includes("shower rain")) {
    image.setAttribute("src", "images/shower rain.png");
} else if (currentStatus.includes("broken clouds")) {
    image.setAttribute("src", "images/broken clouds.png");
}else if (currentStatus.includes("scattered clouds")) {
    image.setAttribute("src", "images/cloud.png");
}else if (currentStatus.includes("few clouds")) {
    image.setAttribute("src", "images/halfsun.png");
}else if (currentStatus.includes("overcast clouds")) {
    image.setAttribute("src", "images/broken clouds.png");
}else if (currentStatus.includes("fog")) {
    image.setAttribute("src", "images/mist.png");
}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "April", "June", "July", "August", "September", "October","November", "December"];

      day.innerHTML = days[newCity.getDay()];
      date_year.innerHTML = `${months[newCity.getMonth()]} ${newCity.getUTCDate()}, ${newCity.getFullYear()}`;

        time.innerHTML = `${cityHour}:${cityMin} h`;
    }
}