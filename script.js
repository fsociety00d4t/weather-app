//hit the API
async function getData(input) {
  let response;

  //prettier-ignore
  try {
    if (input!=undefined) {
       response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4b1ffd40c31a4aa6b18105851232409&q=${input}&days=3`);
    } else {
       response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=4b1ffd40c31a4aa6b18105851232409&q=Berlin&days=3");
    }
    const data = await response.json();

    displayLocation(data);
    displayDetails(data);
    displayForeCast(data);
    changeToF(data);

  } catch (error) {
    displayError();
    console.log(error);
  }
}

function displayLocation(data) {
  const icon = data.current.condition.icon;

  const country = (document.querySelector(".country").textContent =
    data.location.country);
  const city = (document.querySelector(".city").textContent =
    data.location.name);
  const region = (document.querySelector(".region").textContent =
    data.location.region);
  const time = (document.querySelector(".time").textContent =
    data.location.localtime);
  const temp = (document.querySelector(".temp").textContent =
    data.current.temp_c + " °C");
  const img = (document.querySelector(".basic-img").src = "https:" + icon);
}

function displayDetails(data) {
  const feelsLike = (document.querySelector(".feels-like").textContent =
    data.current.feelslike_c + " °C");
  const humidity = (document.querySelector(".humidity").textContent =
    data.current.humidity + " %");
  const windSpeed = (document.querySelector(".wind-speed").textContent =
    data.current.wind_kph + " kph");
}

function displayForeCast(data) {
  const day_0_Icon = data.forecast.forecastday[0].day.condition.icon;
  const day_1_Icon = data.forecast.forecastday[1].day.condition.icon;
  const day_2_Icon = data.forecast.forecastday[2].day.condition.icon;

  const day0 = new Date(data.forecast.forecastday[1].date);
  const weekDay1 = day0.getDay();
  const getDay1 = numberToWeekDay(weekDay1);

  const day1 = new Date(data.forecast.forecastday[2].date);
  const weekDay2 = day1.getDay();
  const getDay2 = numberToWeekDay(weekDay2);
  console.log(weekDay2);

  console.log(data.forecast.forecastday[1].date);

  const day0Day = (document.querySelector(".day0").textContent = getDay1);
  const day0Max = (document.querySelector(".max0").textContent =
    data.forecast.forecastday[1].day.maxtemp_c + " °C");
  const day0Min = (document.querySelector(".min0").textContent =
    data.forecast.forecastday[1].day.mintemp_c + " °C");
  const day0Img = (document.querySelector(".img-0").src =
    "https:" + day_1_Icon);

  const day1Day = (document.querySelector(".day1").textContent = getDay2);
  const day1Max = (document.querySelector(".max1").textContent =
    data.forecast.forecastday[2].day.maxtemp_c + " °C");
  const day1Min = (document.querySelector(".min1").textContent =
    data.forecast.forecastday[2].day.mintemp_c + " °C");
  const day1Img = (document.querySelector(".img-1").src =
    "https:" + day_2_Icon);
}

function numberToWeekDay(day) {
  switch (day) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
  }
}

function changeToF(data) {
  const wind_mph = data.current.wind_mph;
  return wind_mph;
}

const submit = document.querySelector(".submit");
submit.addEventListener("click", function (e) {
  e.preventDefault();
  const searchInput = document.getElementById("search").value;
  getData(searchInput);

  const error = document.querySelector(".error");
  error.style.display = "none";
});

function displayError() {
  const error = document.querySelector(".error");
  error.style.display = "block";
}

getData();
