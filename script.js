// import API_KEY from "./build.js";

// const apiURL = "https://geo.ipify.org/api/v2/country,city?apiKey=";

// const searchInput = document.getElementById('search-input');
// const submitBtn = document.getElementById('submit-btn');

// const ip = document.getElementById('ip-address');
// const locationInfo = document.getElementById('location');
// const timezone = document.getElementById('timezone');
// const isp = document.getElementById('isp');

// const invalidIP = document.getElementById('invalid-ip');

// const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
// const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

// let map = L.map('map');
// map.zoomControl.setPosition('bottomleft');

// // Creates custom marker
// let locationIcon = L.icon({
//   iconUrl: "./images/icon-location.svg"
// });

// function showMap(latitude, longtitude) {

//   map.setView([latitude, longtitude], 15);

//   L.marker([latitude, longtitude], {icon: locationIcon}).addTo(map);

//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 20,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//   }).addTo(map);

// }

// async function showInfo(url) {

//     const response = await fetch(url);

//     if(response.status == 404) {
//       console.log('404 Error');
//     } else {
      
//       let data = await response.json();

//       ip.innerHTML = data.ip;
//       locationInfo.innerHTML = `${data.location['city']},<br> ${data.location['region']}, ${data.location['country']}`;
//       timezone.innerHTML = `UTC ${data.location['timezone']}`;
//       isp.innerHTML = data.isp;

//       let latitude = data.location['lat'];
//       let longtitude = data.location['lng'];

//       showMap(latitude, longtitude);

//     }

// }

// // Run on page load
// window.addEventListener('load', async () => {
//   let url = `${apiURL}${API_KEY}`;
//   showInfo(url);
// });

// submitBtn.addEventListener("click", ()=> {

//   if (ipv4Regex.test(searchInput.value) || ipv6Regex.test(searchInput.value)) {
//     invalidIP.classList.add('hidden');
//     let url = `${apiURL}${API_KEY}&ipAddress=${searchInput.value}`;
//     showInfo(url);
//   }

//   else {
//     invalidIP.classList.remove('hidden');
//     let url = `${apiURL}${API_KEY}`;
//     showInfo(url);
//   }

// });

import API_KEY from "./build.js";

const apiURL = "https://api.ipgeolocation.io/ipgeo?apiKey=";

const searchInput = document.getElementById('search-input');
const submitBtn = document.getElementById('submit-btn');

const ip = document.getElementById('ip-address');
const locationInfo = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

const invalidIP = document.getElementById('invalid-ip');

const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

let map = L.map('map');
map.zoomControl.setPosition('bottomleft');

// Creates custom marker
let locationIcon = L.icon({
  iconUrl: "./images/icon-location.svg"
});

function showMap(latitude, longtitude) {

  map.setView([latitude, longtitude], 15);

  L.marker([latitude, longtitude], {icon: locationIcon}).addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

}

async function showInfo(url) {

    const response = await fetch(url);

    if(response.status == 404) {
      console.log('404 Error');
    } else {
      
      let data = await response.json();

      ip.innerHTML = data.ip;
      locationInfo.innerHTML = `${data.city},<br> ${data.country_code2}, ${data.zipcode}`;
      timezone.innerHTML = `UTC ${data.time_zone['offset']}:00`;
      isp.innerHTML = data.isp;

      let latitude = data.latitude;
      let longtitude = data.longitude;

      showMap(latitude, longtitude);

    }

}

// Run on page load
window.addEventListener('load', async () => {
  let url = `${apiURL}${API_KEY}`;
  showInfo(url);
});

submitBtn.addEventListener("click", ()=> {

  if (ipv4Regex.test(searchInput.value) || ipv6Regex.test(searchInput.value)) {
    invalidIP.classList.add('hidden');
    let url = `${apiURL}${API_KEY}&ip=${searchInput.value}`;
    showInfo(url);
  }

  else {
    invalidIP.classList.remove('hidden');
    let url = `${apiURL}${API_KEY}`;
    showInfo(url);
  }

});