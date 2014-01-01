$(document).ready(function () {
    // socket
    var serverBaseUrl = document.domain;
    var socket = io.connect(serverBaseUrl + '/here');

    // generate unique user id
    var userId = Math.random().toString(16).substring(2,15);
    var connects = {};
    var markers = {};

    // geolocation api
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
      console.log(position)
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      makeMap(lat,lng)                         //invoke these two functions w/ lat + lng
      updateSocket(lat,lng)
    }

    function makeMap(lat,lng) {
        $("#loading").hide()
        map = L.map('map').setView([lat, lng], 1); //global

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var userMarker = L.marker([lat, lng]).addTo(map);

        userMarker.bindPopup("<b>Hello world!</b>").openPopup();
    }

    function updateSocket(lat,lng) {
      $(document).on("mousemove", function (){
          active = true;
          sentData = {
              id: userId,
              // active: active,
              coords: [{
                  lat: lat,
                  lng: lng
              }]
          }

          socket.emit("send:coords", sentData)
      })
    }

    socket.on("load:coords", function (data) {
      if (!(data.id in connects)) {
          setMarker(data);
          console.log(data)
          // console.log(data)
      }
      connects[data.id] = data;
      connects[data.id].updated = $.now();
     
    })

    function setMarker(data) {
      var rand = Math.round(Math.random() * 10) * .001

      for (var i = 0; i < data.coords.length; i++) {
          var marker = L.marker([(data.coords[i].lat + rand), (data.coords[i].lng + rand)]).addTo(map);
          marker.bindPopup("<p>Hi there!  I'm another user!  </p>").openPopup();
          markers[data.id] = marker;
      }
    }

    setInterval(function() {
      for (users in connects){
          if ($.now() - connects[users].updated > 3000) {
              delete connects[users];
              map.removeLayer(markers[users]);
          }
      }
    }, 3000);

})
