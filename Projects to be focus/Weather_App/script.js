const apiKey="9368b11fe465a1f31fd5287c18f22417";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


let search=document.querySelector(".search button");
let temp=document.querySelector(".temp");
let foundCity=document.querySelector(".city");
let humidity=document.querySelector(".col p");
let wind=document.querySelectorAll(".col p");
let weatherIcon=document.querySelector(".weather img");


async function getWeather(city){
    try{
        let response=await fetch(apiUrl+city+`&appid=${apiKey}`);


    let data=await response.json();

    temp.innerHTML=Math.round(data.main.temp)+"°C";
    foundCity.innerHTML=city;
    humidity.innerHTML=data.main.humidity+"%";
    wind[1].innerHTML=data.wind.speed+" Km/hr";

    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png"
    }
    else if(data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear.png"
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="images/rain.png"
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="images/drizzle.png"
    }
    else if(data.weather[0].main=="Mist"){
        weatherIcon.src="images/mist.png"
    }
    else if(data.weather[0].main=="Snow"){
        weatherIcon.src="images/snow.png"
    }
    else if(data.weather[0].main=="Smoke"){
        weatherIcon.src='images/clouds.png';
        console.log(data.weather[0].main);
    }

    document.querySelector(".info").style.display="block";


    
    }
    catch(err){
        console.log(err);
        document.querySelector(".empty").innerText="Enter City name again";
    }


}

function resetUI() {
    temp.innerHTML = "";
    foundCity.innerHTML = "";
    humidity.innerHTML = "";
    wind[1].innerHTML = "";

    weatherIcon.src = "";

    document.querySelector(".info").style.display = "none";
    document.querySelector(".empty").innerText = "";
}

search.addEventListener('click',()=>{
    resetUI();  
    let city=document.getElementById("cityName").value.trim();
    if(!city){
        console.log("Enter City Name");
        return;
    }
    
    getWeather(city);
})



