// import config from './config.js';

// const apiKey = config.apiKey;
const apiKey = process.env.API_KEY;
const apiURL = "https://geo.ipify.org/api/v2/country?apiKey=";

const searchInput = document.getElementById('search-input');
const submitBtn = document.getElementById('submit-btn');

const ip = document.getElementById('ip-address');
const locationInfo = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

async function showInfo(url) {

    const response = await fetch(url);

    if(response.status == 404) {
      console.log('404 Error');
    } else {
      
      let data = await response.json();

      ip.innerHTML = data.ip;
      locationInfo.innerHTML = `${data.location['region']}, ${data.location['country']}`;
      timezone.innerHTML = `UTC ${data.location['timezone']}`;
      isp.innerHTML = data.isp;

    }

}

submitBtn.addEventListener("click", ()=> {
  let url = `${apiURL}${process.env.API_KEY}&ipAddress=${searchInput.value}`;
  showInfo(url);
});

// Run on page load
window.addEventListener('load', async () => {
  let url = `${apiURL}${process.env.API_KEY}`;
  showInfo(url);
});