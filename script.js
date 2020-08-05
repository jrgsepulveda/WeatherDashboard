// wati for page to laod
$(document).ready(function(){

    var cities = [];
    intiBTN();

    // submit function
       $("form").submit(function(event){
        event.preventDefault();
        if($("#searchInput").val()=== ""){
            alert("Please input a city")
        }
        else{
            cityWeatherSubmit(location)
            $(".initForm").hide();
            $(".mainContainer").css("display", "block");
        }

        $("form")[0].reset();
    });
    // render button on the top of the list
    function renderButtons() {
        $("#showBTN").empty();
          for(i=0; i<cities.length; i++){
            var button = $("<button>")
                button.addClass("cityBTN")
                button.attr("data-name", cities[i])
                button.text(cities[i])
              $("#showBTN").append(button);
              console.log(button.attr("data-name", cities[i]))
          }
          
    };
    // api query
    function cityWeatherSubmit(location){

        // get current date and time
        var currentdate = new Date(); 
            var datetime = (currentdate.getMonth()+1) + "/" +  currentdate.getDate() + "/" + currentdate.getFullYear() + " at "  + (currentdate.getHours()-12) + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    
        var search = $("#searchInput").val();
        var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=43364a64003eed2cf004365437577ae5";

      //my ajax query
        $.get(currentWeatherURL).then(function(response){
                
               
            var cityNameBtn = response.name;
        
            cities.push(cityNameBtn);
            cityNameBtn = "";
            storeCities();
            renderButtons();

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
            var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon  + "@2x.png"
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

        

        
        var fiveDayWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=43364a64003eed2cf004365437577ae5"
        
        $.get(fiveDayWeatherURL).then(function(response){
            

            
            var datetime1 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+1)  + "/" + currentdate.getFullYear()

            var datetime2 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+2)  + "/" + currentdate.getFullYear()

            var datetime3 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+3)  + "/" + currentdate.getFullYear()

            var datetime4 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+4)  + "/" + currentdate.getFullYear()

            var datetime5 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+5)  + "/" + currentdate.getFullYear()
            
            // day1 forecast
            var day1 = $("#day1");
            day1.text(datetime1);
            
            
            var weatherIconDay1 = $("#weatherIconDay1")
            var iconURL = "https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon  + "@2x.png";
            weatherIconDay1.attr("src", iconURL);

            var tempDay1 = $("#tempDay1");
            tempDay1.text(Math.floor((response.list[1].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay1 = $("#humidityDay1");
            humidityDay1.text("Humidity: " + response.list[1].main.humidity + "%");
            
            
            
            // day2 forecast
            var day2 = $("#day2");
            day2.text(datetime2);
            
            var weatherIconDay2 = $("#weatherIconDay2")
            iconURL = "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon  + "@2x.png";
            weatherIconDay2.attr("src", iconURL);

            var tempDay2 = $("#tempDay2");
            tempDay2.text(Math.floor((response.list[2].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay2 = $("#humidityDay2");
            humidityDay2.text("Humidity: " + response.list[2].main.humidity + "%");


            // day3 forecast
            var day3 = $("#day3");
            day3.text(datetime3);
            
            var weatherIconDay3 = $("#weatherIconDay3")
            iconURL = "https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon  + "@2x.png";
            weatherIconDay3.attr("src", iconURL);

            var tempDay3 = $("#tempDay3");
            tempDay3.text(Math.floor((response.list[3].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay3 = $("#humidityDay3");
            humidityDay3.text("Humidity: " + response.list[3].main.humidity + "%");


            //day4 forecast
            var day4 = $("#day4");
            day4.text(datetime4);
            
            var weatherIconDay4 = $("#weatherIconDay4")
            iconURL = "https://openweathermap.org/img/wn/" + response.list[4].weather[0].icon  + "@2x.png";
            weatherIconDay4.attr("src", iconURL);

            var tempDay4 = $("#tempDay4");
            tempDay4.text(Math.floor((response.list[4].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay4 = $("#humidityDay4");
            humidityDay4.text("Humidity: " + response.list[4].main.humidity + "%");


            // day5 forecast
            var day5 = $("#day5");
            day5.text(datetime5);
            
            var weatherIconDay5 = $("#weatherIconDay5")
            iconURL = "https://openweathermap.org/img/wn/" + response.list[5].weather[0].icon  + "@2x.png";
            weatherIconDay5.attr("src", iconURL);

            var tempDay5 = $("#tempDay5");
            tempDay5.text(Math.floor((response.list[5].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay5 = $("#humidityDay5");
            humidityDay5.text("Humidity: " + response.list[5].main.humidity + "%");

        });

    };
   
    // button clik to return previous results
    $(document).on("click",".cityBTN", function(){
        
        var cityBtn = $(this).attr("data-name");
        console.log(cityBtn)
        // get current date and time
        var currentdate = new Date(); 
            var datetime = (currentdate.getMonth()+1) + "/" +  currentdate.getDate() + "/" + currentdate.getFullYear() + " at "  + (currentdate.getHours()-12) + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    
        var search  = cityBtn;
        var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=43364a64003eed2cf004365437577ae5";

      //my ajax query
        $.get(currentWeatherURL).then(function(response){

            var cityNameBtn = response.name;
        
            var city = $("#city");
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
            var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon  + "@2x.png"
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

        

        
        var fiveDayWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=43364a64003eed2cf004365437577ae5"
        
        $.get(fiveDayWeatherURL).then(function(response){
            

            
            var datetime1 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+1)  + "/" + currentdate.getFullYear()

            var datetime2 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+2)  + "/" + currentdate.getFullYear()

            var datetime3 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+3)  + "/" + currentdate.getFullYear()

            var datetime4 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+4)  + "/" + currentdate.getFullYear()

            var datetime5 = (currentdate.getMonth()+1) + "/" + (currentdate.getDate()+5)  + "/" + currentdate.getFullYear()
            
            // day1 forecast
            var day1 = $("#day1");
            day1.text(datetime1);
            
            
            var weatherIconDay1 = $("#weatherIconDay1")
            var iconURL = "https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon  + "@2x.png";
            weatherIconDay1.attr("src", iconURL);

            var tempDay1 = $("#tempDay1");
            tempDay1.text(Math.floor((response.list[1].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay1 = $("#humidityDay1");
            humidityDay1.text("Humidity: " + response.list[1].main.humidity + "%");
            
            
            
            // day2 forecast
            var day2 = $("#day2");
            day2.text(datetime2);
            
            var weatherIconDay2 = $("#weatherIconDay2")
            iconURL = "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon  + "@2x.png";
            weatherIconDay2.attr("src", iconURL);

            var tempDay2 = $("#tempDay2");
            tempDay2.text(Math.floor((response.list[2].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay2 = $("#humidityDay2");
            humidityDay2.text("Humidity: " + response.list[2].main.humidity + "%");


            // day3 forecast
            var day3 = $("#day3");
            day3.text(datetime3);
            
            var weatherIconDay3 = $("#weatherIconDay3")
            iconURL = "https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon  + "@2x.png";
            weatherIconDay3.attr("src", iconURL);

            var tempDay3 = $("#tempDay3");
            tempDay3.text(Math.floor((response.list[3].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay3 = $("#humidityDay3");
            humidityDay3.text("Humidity: " + response.list[3].main.humidity + "%");


            //day4 forecast
            var day4 = $("#day4");
            day4.text(datetime4);
            
            var weatherIconDay4 = $("#weatherIconDay4")
            iconURL = "https://openweathermap.org/img/wn/" + response.list[4].weather[0].icon  + "@2x.png";
            weatherIconDay4.attr("src", iconURL);

            var tempDay4 = $("#tempDay4");
            tempDay4.text(Math.floor((response.list[4].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay4 = $("#humidityDay4");
            humidityDay4.text("Humidity: " + response.list[4].main.humidity + "%");


            // day5 forecast
            var day5 = $("#day5");
            day5.text(datetime5);
            
            var weatherIconDay5 = $("#weatherIconDay5")
            iconURL = "https://openweathermap.org/img/wn/" + response.list[5].weather[0].icon  + "@2x.png";
            weatherIconDay5.attr("src", iconURL);

            var tempDay5 = $("#tempDay5");
            tempDay5.text(Math.floor((response.list[5].main.temp  - 273.15) *1.8 +32) + " °F");

            var humidityDay5 = $("#humidityDay5");
            humidityDay5.text("Humidity: " + response.list[5].main.humidity + "%");

        });
    });  

        function intiBTN(){
            var storeCities = JSON.parse(localStorage.getItem("cities"));

            if(storeCities !== null){
                cities = storeCities;
            }
            renderButtons()
        }

        function storeCities(){
            localStorage.setItem("cities", JSON.stringify
            (cities));
        }


        // function getLocation(){
        //     if (navigator.geolocation){
        //         navigator.geolocation.getCurrentPosition();
        //         var latitude = position.coords.latitude;
        //         var longitude = position.coords.longitude;
        //     }
        //     var latitude = position.coords.latitude;
        //     var longitude = position.coords.longitude;
        //     console.log(latitude)
        //     console.log(longitude)
        // }
        // getLocation();
});

 

    

