function init()
{

    var button = document.getElementById( 'get' );
    button.addEventListener( 'click' , get , false );

}

function get()
{

    /*
    
    intentará obtener la ubicación más exacta posible del dispositivo en no más de 
    10 segundos, pero solo si no hay una ubicación previa en el caché capturada menos 
    de 60 segundos atrás (si existe una ubicación previa con menos de 60 segundos de 
    antigüedad, éste será el objeto Position retornado).
    
    */

    var geoconfig =
    {

        // Properties 
        enableHighAccuracy: true, // GPS Systems
        timeout: 10000,
        maximumAge: 60000

    };

    /*
    
    El atributo maximumAge determina qué tan seguido la información será enviada a 
    la función mostrar() . Si la nueva ubicación es obtenida 60 segundos (60000
    milisegundos) luego de la anterior, entonces será mostrada, en caso  contrario 
    la función mostrar() no será llamada.
    
    */

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

/*

Una implementación de la API Geolocation es sencilla: declaramos el método
getCurrentPosition() y creamos una función que mostrará los valores retornados por
el mismo. El método getCurrentPosition() es un método del objeto geolocation .
Este es un nuevo objeto que es parte del objeto navigator , un objeto Javascript que fue
anteriormente implementado para retornar información acerca del navegador y el sistema.
Por lo tanto, para acceder al método getCurrentPosition() la sintaxis a usar es
navigator.geolocation.getCurrentPosition(función) , donde función es una
función personalizada que recibirá el objeto Position y procesará la información que
contiene.
En el código del Listado 9-2, llamamos a esta función mostrar() . Cuando el método
getCurrentPosition() es llamado, un nuevo objeto Position es creado con la
información de la ubicación actual del usuario y es enviado a la función mostrar() .
Referenciamos este objeto dentro de la función con la variable posicion , y luego usamos
esta variable para mostrar los datos.
El objeto Position tiene dos importantes atributos: coords y timestamp . En
nuestro ejemplo solo usamos coords para acceder a la información que queremos
mostrar (latitud, longitud y exactitud). Estos valores son grabados en la variable datos y
luego mostrados en la pantalla como el nuevo contenido del elemento ubicacion .

Los mensajes de error son ofrecidos para uso interno. El propósito es ofrecer un
mecanismo para que la aplicación reconozca la situación y proceda de acuerdo al error
recibido. En el código agregamos un segundo atributo al método getCurrentPosition() 
(otra función) y creamos la función error() para mostrar la información de los atributos
code y message . El valor de code será un número entre 0 y 3 de acuerdo al número de error 
El objeto PositionError es enviado a la función error() y representado en esta
función por la variable error . Para propósitos didácticos, usamos un método alert() que
muestra los datos recibidos, pero usted debería procesar esta información en silencio, si es
posible, sin alertar al usuario de nada. Podemos también controlar por errores de forma 
individual ( error.PERMISSION_DENIED , por ejemplo) y actuar solo si ese error en particular
ocurrió.

Las funciones más efectivas y prácticas están orientadas hacia dispositivos móviles.
El valor true (verdadero) para la propiedad enableHighAccuracy , por ejemplo, le 
solicitará al navegador usar sistemas como GPS para obtener la ubicación más exacta 
posible (un sistema casi exclusivo de dispositivos móviles), y los métodos watchPosition() 
y clearWatch() , trabajan sobre ubicaciones actualizadas constantemente, algo solo posible,
por supuesto, cuando el dispositivo que está accediendo la aplicación es móvil (y se está
moviendo). Esto trae a la luz dos asuntos importantes. Primero, la mayoría de nuestros
códigos tendrán que ser probados en un dispositivo móvil para saber exactamente cómo
trabajan en una situación real. Y segundo, deberemos ser responsables con el uso de esta
API. GPS y otros sistemas de localización consumen muchos recursos y en la mayoría de
los casos pueden acabar pronto con la batería del dispositivo si no somos cautelosos.

*/