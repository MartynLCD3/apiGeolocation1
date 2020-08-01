function init()
{

    var button = document.getElementById( 'get' );
    button.addEventListener( 'click' , get , false );

}

function get()
{

    var geoconfig =
    {

        // Properties 
        enableHighAccuracy: true, // GPS Systems
        timeout: 10000,
        maximumAge: 60000

    };

    // Attributes getCurrentPosition 
    //navigator.geolocation.getCurrentPosition( show , error , geoconfig );

    // Attributes + watchPosition (live-position) -> mobiles
    control = navigator.geolocation.watchPosition( show , error, geoconfig );

    clearWatch( control );

}

function show( position )
{

    var geolocation = document.getElementById( 'geolocation' );
    var data = '';

    data += 'Latitude: '  + position.coords.latitude  + '<br>';
    data += 'Longitude: ' + position.coords.longitude + '<br>';
    data += 'Accuracy: '  + position.coords.accuracy  + 'mts.<br>';
    
    geolocation.innerHTML = data;

}

function error( error )
{

    alert( 'Error: ' + error.code + '' + error.message );

}

window.addEventListener( 'load' , init , false );