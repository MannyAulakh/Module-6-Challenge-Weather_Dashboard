//---------------KEY--------------------
url = "https://api.openweathermap.org/data/2.5/forecast?q="
city = ""
api = "&units=metric&appid=90c7892b985f2416c7bfa8f7089dad23"

//---------------DOM elements--------------------
//Input & Search
cityInput = $("input")
searchButton = $("button")
//Current Forcast
currentDisplay = $("#today-weather")
NameDateDisplay = $("#city-name-date")
iconDisplay = $("#current-icon")
tempDisplay = $("#temperature")
humDisplay = $("#humidity")
windDisplay = $("#wind")
//Future Forcast
fiveDaytitle = $("#fiveday-title")
fiveDaySection = $("#fiveDay-forecast")
//History
historySection = $("#history")

//TODAY
today = dayjs()
//Set Days into Future
fDays = 5

//---------------Initial Functions--------------------
function init() {
    fiveday()
}

//---------------Search Button--------------------
searchButton.on("click", function() {
    city = cityInput.val()
    //Build API URL
    request = url + city + api
    SearchCity()
})

//---------------Search City--------------------
function SearchCity() { fetch(request)
.then(function (response) {
    //Check to see if fetch was successful
    if (response.status !== 200) {
        //Alert user city was not found
        throw alert("Cannot Find City")
    } else {
        //If successful, add city to history and retrieve data
        history(city)
        return response.json(); 
    }
})
.then(function (data) {
    //Display elmenents
    currentDisplay.removeClass("d-none")
    fiveDaytitle.removeClass("d-none")
    fiveDaySection.removeClass("d-none")

    //Update on page elements on page to show current weather data
    NameDateDisplay.text(data.city.name + " - " + today.format('MMM D, YYYY'))
    iconDisplay.attr("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png")
    tempDisplay.text("Temp: " + data.list[0].main.temp)
    humDisplay.text("Humidity: " + data.list[0].main.humidity)
    windDisplay.text("Wind: " + data.list[0].wind.speed)

    //Update on page elements on page to show weather data for next X number of fDays
  for (i = 1; i < fDays + 1; i++) {
    fiveDaySection.children().eq(i-1).children().eq(0).text(today.add(i,'day').format("MMM D, YYYY"))
    fiveDaySection.children().eq(i-1).children().eq(1).attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png")
    fiveDaySection.children().eq(i-1).children().eq(2).text("Temp: " + data.list[i].main.temp) 
    fiveDaySection.children().eq(i-1).children().eq(3).text("Humidity: " + data.list[i].main.humidity)
    fiveDaySection.children().eq(i-1).children().eq(4).text("Wind: " + data.list[i].wind.speed)
  }
  }
);
}

//---------------Create elements to display future weather data--------------------
function fiveday() {
    for (i = 1 ; i < fDays + 1; i++) {
        // Create Elements
        futureWeatherDisplay = $("<div>")
        fiveDateDisplay = $("<p>")
        fiveIconDisplay = $("<img>")
        fiveTempDisplay = $("<p>")
        fiveHumDisplay = $("<p>")
        fiveWindDisplay = $("<p>")
        //Append Elements
        futureWeatherDisplay.append(fiveDateDisplay)
        futureWeatherDisplay.append(fiveIconDisplay)
        futureWeatherDisplay.append(fiveTempDisplay)
        futureWeatherDisplay.append(fiveHumDisplay)
        futureWeatherDisplay.append(fiveWindDisplay)
        futureWeatherDisplay.addClass("col-md-2 forecast bg-primary text-white m-2")
        fiveDaySection.append(futureWeatherDisplay)
    }
}

//---------------Add valid search result to history--------------------
function history() {
    historyCity = $("<button>")
    historyCity.text(city)
    historyCity.addClass("d-block btn btn-outline-primary btn-lg")
    historySection.append(historyCity)
}

//---------------Display weather data for clicked history element--------------------
historySection.on("click", function(event){
    element = $(event.target)
    if (element.is("button")) {
        city = element.text()
        request = url + city + api
        SearchCity()
    }
})

init()



