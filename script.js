// wati for page to laod
$(document).ready(function(){

    var cities = [];

    // submit function
       $("form").submit(function(event){


        event.preventDefault();
       
        var search = $("#searchInput").val();
        
        cities.push(search);
       
        
        cityWeatherSubmit(location)
        renderButtons();
    });

    function renderButtons() {
        $("#showBTN").empty();
          for(i=0; i<cities.length; i++){
            var button = $("<button>")
                button.addClass("cityBTN").text(cities[i]);
              $("#showBTN").append(button);
          }
          
    };

    $(".cityBTN").click(function(){
            var cityBtn = $(this).attr("name")
            console.log(cityBtn)
    cityWeatherSubmit(cityBtn)
    })


    function cityWeatherSubmit(location){

        // get current date and time
        var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " at "  + (currentdate.getHours()-12) + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        
        console.log(new Date().getDay());
    
        
        var search = $("#searchInput").val();
        var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=43364a64003eed2cf004365437577ae5";

      //my ajax query
        $.get(currentWeatherURL).then(function(response){

            var city = $("#city")
            city.text(response.name + " Weather")
            
            var dateTime = $("#dt")
            dateTime.text("as of " + datetime)

            var temp = $("#temp")
            temp.text(Math.floor((response.main.temp - 273.15) *1.8 +32) + " °F");
             var description = $("#desciption")
             description.text(response.weather[0].description)

            var humd = $("#humidity");
            humd.text("Humidity: " + response.main.humidity + "%");

            var wind = $("#wind");
            wind.text("Wind: " + response.wind.speed + " MPH");

            var weatherIcon = $("#weatherIcon");
            var iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon  + "@2x.png"
            weatherIcon.attr("src", iconURL)

            var lon = (response.coord.lon);
            var lat = (response.coord.lat);

            var unIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=43364a64003eed2cf004365437577ae5&lat="+ lat +"&lon=" + lon;

            // gets UV idex from second API
            $.get(unIndexURL).then(function(response){

                var uvIndex = $("#uvIndex");
                if(parseInt(response.value) >= 6){
                    uvIndex.css("color","red").text("UV Index: " + response.value);
                }else if(parseInt(response.value) > 2 && parseInt(response.value) < 6){
                    uvIndex.css("color","yellow").text("UV Index: " + response.value);
                }else if(parseInt(response.value) <= 2){
                    uvIndex.css("color","green").text("UV Index: " + response.value);
                }
            });

        });

        

        
        var fiveDayWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=43364a64003eed2cf004365437577ae5"
        
        $.get(fiveDayWeatherURL).then(function(response){
            console.log(response);

            //array to get the day of the week in the 5day forecast
            var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var getDay = new Date().getDay();
            
            
            // day1 forecast
            var day1 = $("#day1");
            day1.text(daysOfTheWeek[getDay + 1]);
            
            
            var weatherIconDay1 = $("#weatherIconDay1")
            var iconURL = "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon  + "@2x.png";
            weatherIconDay1.attr("src", iconURL);

            var tempDay1 = $("#tempDay1");
            tempDay1.text(Math.floor((response.list[1].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay1 = $("#humidityDay1");
            humidityDay1.text("Humidity: " + response.list[1].main.humidity + "%");
            
            
            
            // day2 forecast
            var day2 = $("#day2");
            day2.text(daysOfTheWeek[getDay + 2]);
            
            var weatherIconDay2 = $("#weatherIconDay2")
            iconURL = "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon  + "@2x.png";
            weatherIconDay2.attr("src", iconURL);

            var tempDay2 = $("#tempDay2");
            tempDay2.text(Math.floor((response.list[2].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay2 = $("#humidityDay2");
            humidityDay2.text("Humidity: " + response.list[2].main.humidity + "%");


            // day3 forecast
            var day3 = $("#day3");
            day3.text(daysOfTheWeek[getDay + 3]);
            
            var weatherIconDay3 = $("#weatherIconDay3")
            iconURL = "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon  + "@2x.png";
            weatherIconDay3.attr("src", iconURL);

            var tempDay3 = $("#tempDay3");
            tempDay3.text(Math.floor((response.list[3].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay3 = $("#humidityDay3");
            humidityDay3.text("Humidity: " + response.list[3].main.humidity + "%");


            //day4 forecast
            var day4 = $("#day4");
            day4.text(daysOfTheWeek[getDay + 4]);
            
            var weatherIconDay4 = $("#weatherIconDay4")
            iconURL = "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon  + "@2x.png";
            weatherIconDay4.attr("src", iconURL);

            var tempDay4 = $("#tempDay4");
            tempDay4.text(Math.floor((response.list[4].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay4 = $("#humidityDay4");
            humidityDay4.text("Humidity: " + response.list[4].main.humidity + "%");


            // day5 forecast
            var day5 = $("#day5");
            day5.text(daysOfTheWeek[getDay + 5]);
            
            var weatherIconDay5 = $("#weatherIconDay5")
            iconURL = "http://openweathermap.org/img/wn/" + response.list[5].weather[0].icon  + "@2x.png";
            weatherIconDay5.attr("src", iconURL);

            var tempDay5 = $("#tempDay5");
            tempDay5.text(Math.floor((response.list[5].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay5 = $("#humidityDay5");
            humidityDay5.text("Humidity: " + response.list[5].main.humidity + "%");

            

        });

    };



});
    
 

    

