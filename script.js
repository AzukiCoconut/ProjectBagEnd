var locationOne = 'Saint John';
var locationTwo = 'Sydney';
var photoLocationOne = $('#NorthCardPhoto');

const GOOGLE_API_KEY = 'AIzaSyDPIrf1wp-rgDqR4oUstiS_JzehChWazsA';

function getPlaceID (city) {
    var googleSearch = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Saint%20John&inputtype=textquery&key=' + GOOGLE_API_KEY;
    console.log(googleSearch);
    fetch(googleSearch)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                var placeID = data.candidates[0].place_id;
                getPhotoReference(placeID);
            })
        } 
    })
}


function getPhotoReference(placeID) {
    var referenceSearch = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeID + '&key=' + GOOGLE_API_KEY;
    console.log(referenceSearch);
    fetch(referenceSearch)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                
                var photoReference = data.result.photos[0].photo_reference;
                getLocationPhoto(photoReference);
            })
        }
    })
}

function getLocationPhoto(photoReference) {
    var photoSearch = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + photoReference + '&key=' + GOOGLE_API_KEY;
    var image = $('<img>');
    image.attr('src', photoSearch);
    image.attr('alt', 'Photo for ' + locationOne);

    photoLocationOne.append(image);
       
}
let timeDisplayEl = $('#time-display');

function displayTime() {
    let rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}  

getPlaceID(locationOne);
displayTime();
setInterval(displayTime, 1000);
