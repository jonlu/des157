//generate user id
function guid() {
  function rnd() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return rnd() + rnd() + '-' + rnd() + '-' + rnd() + '-' + rnd() + '-' + rnd() + rnd() + rnd();
}

//get user id
var myUuid = localStorage.getItem('myUuid');
if (!myUuid) {
  myUuid = guid();
  localStorage.setItem('myUuid', myUuid);
}

//route the url
var mapId = location.hash.replace(/^#/, '');
if (!mapId) {
  mapId = (Math.random() + 1).toString(32).substring(2, 12);
  location.hash = mapId;
}

// var fbconfig = {
//   apikey: config.firebase.apiKey,
//   authDomain: config.firebase.auth + ".firebaseapp.com",
//   databaseURL: "https://" + config.firebase.auth + ".firebaseio.com",
//   storageBucket: config.firebase.auth + ".appspot.com",
//   messagingSenderId: "769660466463"
// }
var fbconfig = {
    apiKey: "AIzaSyCPiVPqysEtGpHxjIfk1hfdHwRj0d7QoXU",
    authDomain: "maps-91c48.firebaseapp.com",
    databaseURL: "https://maps-91c48.firebaseio.com",
    storageBucket: "maps-91c48.appspot.com",
    messagingSenderId: "769660466463"
  };
firebase.initializeApp(fbconfig);
var locationsRef = firebase.database().ref('maps/' + mapId);
var locations = {};
var markerSize = [30, 30];

// function getAddress(latlog, callback) {
//   var googleMapsClient = new google.maps.Geocoder();
//   googleMapsClient.geocode({
//     location: latlog
//   }, function(err, response) {
//     if (!err) {
//       callback(response.json.results[0].formatted_address[0]);
//     } else {
//       console.log("something went wrong");
//     }
//   });
// };


document.addEventListener('DOMContentLoaded', function(event) {
  //make map
  mapboxgl.accessToken = config.mapbox.apiKey;
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-121.7617, 38.5382],
    maxZoom: 16,
    zoom: 13.3,
    attributionControl: false,
  });
  var nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');
  map.addControl(new mapboxgl.AttributionControl({
    compact: true
  }));
  var watchPositionId;
  map.on('load', function() {
    function successcoords(position) {
      // console.log(position.coords.latitude);
      if (!position.coords) return
      locationsRef.child(myUuid).set({
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        timestamp: Math.floor(Date.now() / 1000)
      })

      // map.panTo([position.coords.latitude, position.coords.longitude])
    }

    watchPositionId = navigator.geolocation.watchPosition(successcoords);

    locationsRef.on('child_added', function(snapshot) {
      var uuid = snapshot.key
      var position = snapshot.val();
      addPoint(uuid, position)
    })

    locationsRef.on('child_changed', function(snapshot) {
      var uuid = snapshot.key
      var position = snapshot.val();

      putPoint(uuid, position)
    })

    locationsRef.on('child_removed', function(oldChildSnapshot) {
      var uuid = oldChildSnapshot.key;

      removePoint(uuid)
    })
  });

  var bounds = new mapboxgl.LngLatBounds();
  function addPoint(uuid, position) {
    var loc = document.createElement('div');
    loc.className = 'marker';
    if (uuid === myUuid) {
      // loc.style.backgroundImage = 'url(https://placebear.com/' + markerSize[0] + '/' + markerSize[1] + ')';
      loc.style.backgroundImage = 'url(http://fillmurray.com/' + markerSize[0] + '/' + markerSize[1] + ')';
    } else {
      loc.style.backgroundImage = 'url(https://placekitten.com/g/' + markerSize[0] + '/' + markerSize[1] + '/)';
    }
    loc.style.width = markerSize[0]+"px";
    loc.style.height = markerSize[1]+"px";
    // loc.addEventListener("click", function() {
    //   var popUps = document.getElementsByClassName('mapboxgl-popup');
    //     // Check if there is already a popup on the map and if so, remove it
    //     if (popUps[0]) popUps[0].remove();
    //     getAddress(position.coords, function(rsp) {
    //       var popup = new mapboxgl.Popup({ closeOnClick: false })
    //         .setLngLat([position.coords.longitude, position.coords.latitude])
    //         .setHTML('<h3></h3>' +
    //           '<h4>' + rsp + '</h4>')
    //         .addTo(map);
    //     })
    //
    // });
    var marker = new mapboxgl.Marker(loc, { offset: [-15, -15] })
      .setLngLat([position.coords.longitude, position.coords.latitude])
      .addTo(map);
    locations[uuid] = marker;
    bounds.extend([position.coords.longitude, position.coords.latitude]);
    map.fitBounds(
      bounds
    )

  }
  //
  // function removePoint(uuid) {
  //   map.removeLayer(locations[uuid]);
  // }

  function updatePoint(uuid, position) {
    locations[uuid].setLngLat([position.coords.longitude, position.coords.latitude]);
  }

  function putPoint(uuid, position) {
    if (locations[uuid])
      updatePoint(uuid, position);
    else
      addPoint(uuid, position);
  }

});
