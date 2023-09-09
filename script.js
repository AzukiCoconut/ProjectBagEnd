$(document).ready(function () {
var locationOne = '';
var locationTwo = '';
var northBtn = $('#northBtn');
var southBtn = $('#southBtn');
var photoLocationOne = $('#NorthCardPhoto');
var photoLocationTwo = $('#SouthCardPhoto');

const GOOGLE_API_KEY = 'AIzaSyDPIrf1wp-rgDqR4oUstiS_JzehChWazsA';

function getPlaceID (city, location) {
    var googleSearch = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + city + '&inputtype=textquery&key=' + GOOGLE_API_KEY;
    console.log(googleSearch);
    fetch(googleSearch)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                var placeID = data.candidates[0].place_id;
                getPhotoReference(placeID, location);
            })
        } 
    })
}


function getPhotoReference(placeID, location) {
    var referenceSearch = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeID + '&key=' + GOOGLE_API_KEY;
    console.log(referenceSearch);
    fetch(referenceSearch)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                
                var photoReference = data.result.photos[0].photo_reference;
                getLocationPhoto(photoReference, location);
            })
        }
    })
}

function getLocationPhoto(photoReference, location) {
    var photoSearch = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + photoReference + '&key=' + GOOGLE_API_KEY;
    var image = $('<img>');
    image.attr('src', photoSearch);
   

    if (location === 'north') { 
        image.attr('alt', 'Photo for ' + locationOne);
        photoLocationOne.append(image);
    } else {
        image.attr('alt', 'Photo for ' + locationTwo);
        photoLocationTwo.append(image);
    }
       
}

function northButtonClick() {
    locationOne = $('#city-search-north').val();
    if (locationOne === '') {
        return;
    }
    getPlaceID(locationOne, 'north');
}

function southButtonClick() {

    locationTwo = $('#city-search-south').val();
    if (locationTwo === ''){
        return;
    }
    getPlaceID(locationTwo, 'south');
}

let timeDisplayEl = $('#time-display');


    var city = "fredericton";
    var APIKey = "8b9c973be8ff8777178ef11119ab4c94";
  
    weatherGet(city)
    //Listen search button, trim user input and store the value in city.
    $("#searchBtn").on("click", function (event) {
      event.preventDefault();
      var city = $("#cityInput").val().toLowerCase().trim();
      weatherGet(city);
    });
      //Fetch openweather API by user input argument: city.
    function weatherGet(city) {
      var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        APIKey;
      // Send an API request by using the JQuery ajax method.
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        //Parse API response, get current Day
        var currentDay = response.dt;
        console.log(dayjs.unix(currentDay).format('MMM D, YYYY, hh:mm:ss a'));
        console.log(response)
        $("#NorthCard").empty()
        //dynamically add HTML element and CSS class to the Page
        var card = $("<div>").addClass("card text-black bg-light");
        var cardBody = $("<div>").addClass("card-body currentWeather");
        var cardTitle = $("<div>")
          .addClass("card-title")
          .text(dayjs.unix(currentDay).format("MMM D, YYYY, hh:mm:ss A"));
  
        var cityDiv = $("<div>")
          .addClass("card-text")
          .text("City: " + city);
        //Apply weather-conditions, use https://openweathermap.org/img/wn/ type of icon to show the condition
        var iconDiv = $(`<img src=" https://openweathermap.org/img/wn/${response.weather[0].icon}.png"></img>`);
        var tempDiv = $("<div>")
          .addClass("card-text")
          .text("Temperature: " + Math.floor(response.main.temp) + "°F");
        var humDiv = $("<div>")
          .addClass("card-text")
          .text("Humidity: " + Math.floor(response.main.humidity) + "%");
        var windSpeed = $("<div>").text(
          "Wind speed: " + response.wind.speed + " MPH"
        );
  
        $("#NorthCard")
         .append(
            card.append(
              cardBody
                .append(cardTitle)
                .append(cityDiv, iconDiv, tempDiv, humDiv, windSpeed)
            )
          );
        //Parse lat & lon from API response, 


  uvGet(response.coord.lat, response.coord.lon);
      });
    }
    function uvGet(lat, lon) {
        var queryURLU = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    
        $.ajax({
          url: queryURLU,
          method: "GET",
        }).then(function (responseU) {
          var uviC = $("<div>").text("UVI ");
          var newSpan = $("<span>").addClass("dangerr").text(responseU.value);
    
          $(".currentWeather").append(uviC.append(newSpan));
    
          if (parseInt(responseU.value) > 5) {
            newSpan.attr("style", "background-color : red");
          } else {
            newSpan.attr("style", "background-color : green");
          }
        });
      }
}); 

northBtn.on('click', northButtonClick);
southBtn.on('click', southButtonClick);
displayTime();
setInterval(displayTime, 1000);

