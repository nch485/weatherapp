let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon")
let tempValue = document.getElementById("temp-value");
let tempUnit = document.getElementById("temp-unit");
let climate = document.getElementById("climate");
let iconFile; 

// CURRENT LOCATION PERMISSION
window.addEventListener("load", () => {
  let long;
  let lat;

  // CURRENT LOCATION FUNCTION

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // API & PROXY LINKS
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a4edbfa58c6992f12c314e0e4b1b0fa7`;
      
      // GET API
      fetch(api)
        .then((response) => {
          return response.json();
        })

        //DATA RECIEVED FROM API
        .then((data) => {
          console.log(data);
          const { name } = data;
          const { feels_like, temp, temp_max, temp_min } = data.main;
          const { id, icon, main } = data.weather[0];

        // API TEMP ICON
          document.querySelector("#temp-icon").src= "https://openweathermap.org/img/wn/" + icon +".png"
          
          // EQUATION FROM KELVIN TO FAHRENHEIT
          
          tempValue.textContent = Math.round((feels_like - 273.15)*9/5)+32;
          loc.textContent = name;
          climate.textContent = main;
        });
    });
}
});
