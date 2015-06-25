$(document).ready(function () {
    // socket
    var serverBaseUrl = document.domain;
    var socket = io.connect(serverBaseUrl + '/here');

    // generate unique user id
    var userId = Math.random().toString(16).substring(2,15);

    // connected users + their associated markers
    var connects = {};
    var markers = {};

    // geolocation api, on success, call positionSucces
    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
    } else {
        $(".map").text("Your browser isn't supported, sorry :(")
    }

    //callback of geolocate for error
    function positionError ( ){
      console.log("sorry, it doesnt work")
    }

    //callback of geolocate for success
    function positionSuccess(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      makeMap(lat,lng)                         //invoke these two functions w/ lat + lng as args
      updateSocket(lat,lng)
    }

    // make leaflet map, create user's marker on map
    function makeMap(lat,lng) {
        $("#loading").hide()
        map = L.map('map').setView([lat, lng], 1); //global

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);


        var redMarker = L.AwesomeMarkers.icon({
          icon: 'home',
          markerColor: 'red'
        })

        // var userMarker = L.marker([lat, lng]).addTo(map);

        var userMarker = L.marker([lat, lng], {icon: redMarker}).addTo(map);

        userMarker.bindPopup("<b>You are here!</b>").openPopup();
    }

    // update socket.  on mousemove, emit id + coords
    function updateSocket(lat,lng) {
      $(document).on("mousemove", function (){
          sentData = {
              id: userId,
              coords: [{
                  lat: lat,
                  lng: lng
              }]
          }
          socket.emit("send:coords", sentData)
      })
    }

    // on load:coords, take payload data.  
    socket.on("load:coords", function (data) {
      if (!(data.id in connects)) { //check if that data.id is in connects, an object to hold connected users
          setMarker(data);          // if it's not, then invoke setMarker on it
      }
      connects[data.id] = data;     // connects' prop data.id for that specific one in the object, is assigned to data
      connects[data.id].updated = $.now();  // set the last update to the time right now, via jquery date function
     
    })

    function setMarker(data) {
      var rand = Math.round(Math.random() * 10) * .001;

      var greenMarker = L.AwesomeMarkers.icon({
        icon: 'home',
        markerColor: 'green'
      })

      for (var i = 0; i < data.coords.length; i++) { // make a marker for other users' locations
          var marker = L.marker([(data.coords[i].lat + rand), (data.coords[i].lng + rand)], {icon: greenMarker}).addTo(map);
          marker.bindPopup("<p>Hi there!  I'm another user!  </p>").openPopup();
          markers[data.id] = marker; // in the markers object, the prop "data.id" is set to var marker
      }
    }

    setInterval(function() {
      for (users in connects){ 
          if ($.now() - connects[users].updated > 5000) { // for all properties in connects, if they don't have a .updated of less than 5 seconds ago, delete them out of the object & remove from map 
              delete connects[users];
              map.removeLayer(markers[users]);
          }
      }
    }, 5000);

})
