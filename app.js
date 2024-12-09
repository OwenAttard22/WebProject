var navLinks = document.getElementById("navLinks");
            function showMenu(){
                navLinks.style.right = "0";
            }
            function hideMenu(){
                navLinks.style.right = "-200px";
            }

function renderWeather(weather) {
    console.log(weather);
    var resultsContainer = document.querySelector("#weather-results");

    var city = document.createElement("h2");
    city.textContent = weather.name;
    resultsContainer.append(city);
    
    var temp = document.createElement("p");
    temp.textContent = "Temperature " + weather.main.temp + " °C";
    resultsContainer.append(temp);
    
    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    resultsContainer.append(humidity);
    
    var wind = document.createElement("p");
    wind.textContent = "Wind: " + weather.wind.speed + " kph";
    resultsContainer.append(wind);
    
    details.append("");
}


function fetchWeather(query) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=45.7640&lon=4.8357&units=metric&appid=4b56dbee1706553fd1936fe330be1100";
    
    fetch(url)
        .then((response) => response.json())
        .then((data) => renderWeather(data));
}

fetchWeather();

var map = L.map('map').setView([45.7640, 4.8357], 13);
    
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
    
var marker = L.marker([45.7640, 4.8357]).addTo(map);
marker.bindPopup("LYON").openPopup();

function getGeoNames(){
  
    var geonames = "http://api.geonames.org/findNearbyWikipediaJSON?lat=45.7640&lng=4.8357&maxRows=100&username=OwenAttard";
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){
        const jsonResponse2 = JSON.parse(xhr.responseText);
        console.log(jsonResponse2);

        for(var i=0; i <= geonames.length; i++){
            const TestLang = jsonResponse2.geonames[i].lng;
            const TestLat = jsonResponse2.geonames[i].lat;
            const TestDesc = jsonResponse2.geonames[i].title
            
            if(jsonResponse2.geonames[i].rank < 80){
                var marker = L.marker([TestLat,TestLang]).addTo(map);
                marker.bindPopup(TestDesc).openPopup();
            }
        }
    }
    
      xhr.open('GET', geonames, true);
      xhr.send();
}

getGeoNames();

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
var hour = date.getHours();
var minute = date.getMinutes();
var datetime = year + "-" + month + "-" + day + "T" + hour+":"+minute;
document.getElementById("both").value = datetime;
