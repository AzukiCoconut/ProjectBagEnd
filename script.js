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

function displayTime() {
    let rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}  

northBtn.on('click', northButtonClick);
southBtn.on('click', southButtonClick);
displayTime();
setInterval(displayTime, 1000);
