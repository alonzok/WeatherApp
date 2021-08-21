let weatherInfo = {
  apiKey: "1b08555925c4b3f206e5d97823c01850",
  GetInfo: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.weatherData(data));
  },
  weatherData: function (data) {
    for (i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1) + "Min").innerHTML =
        "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
    }

    for (i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1) + "Max").innerHTML =
        "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
    }

    for (i = 0; i < 5; i++) {
      document.getElementById("img" + (i + 1)).src =
        "http://openweathermap.org/img/wn/" +
        data.list[i].weather[0].icon +
        ".png";
    }
  },
  search: function () {
    this.GetInfo(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weatherInfo.search();
}),
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (enter) {
      if (enter.key == "Enter") {
        weatherInfo.search();
      }
    });

weatherInfo.GetInfo();

var dy = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function CheckDay(day) {
  if (day + dy.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
