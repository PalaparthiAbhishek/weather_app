//let url=http://api.weatherapi.com/v1/current.json?key=e57d24691b6249fd87c195731250406&q=London&aqi=no

const temp=document.querySelector(".temperature");
const locationEle=document.querySelector(".location");
const timeEle=document.querySelector(".time");
const humidityEle=document.querySelector(".humidity");
const pressureEle=document.querySelector(".pressure");
const conditionEle=document.querySelector(".condition");
const iconEle=document.querySelector(".icon");
const searchField=document.querySelector(".searchBar");
const buttonField=document.querySelector(".button");
const form=document.querySelector(".form");



form.addEventListener('submit',searchLocation);

function searchLocation(event){
    event.preventDefault();
    target=searchField.value;
    fetching(target);
}

function updateDetails(data){
    iconEle.style.display='block';
    iconEle.src=data.current.condition.icon;
    iconEle.alt=data.current.condition.text;

    temp.innerHTML=`${data.current.temp_c}°C / ${data.current.temp_f}°F`;
    conditionEle.innerHTML=data.current.condition.text;
    locationEle.innerHTML=`${data.location.name}, ${data.location.country}`;
    timeEle.innerHTML=`Local Time: ${data.location.localtime.split(' ')[1]} (${data.location.localtime.split(' ')[0]})`;
    humidityEle.innerHTML=`Humidity: ${data.current.humidity}%`;
    pressureEle.innerHTML=`Pressure: ${data.current.pressure_mb}mb`;

}
 
function fetching(target){

    temp.innerHTML="Loading Data";
    conditionEle.innerHTML='Connecting to Weather Station';
    humidityEle.innerHTML='';
    pressureEle.innerHTML='';
    timeEle.innerHTML='';
    iconEle.style.display='none';
    locationEle.innerHTML='';
    
    let targetLocation=target || "london";// for default location without intial search
    
    fetch(`http://api.weatherapi.com/v1/current.json?key=e57d24691b6249fd87c195731250406&q=${targetLocation}&aqi=no`)
    .then(response => {
        if(!response.ok){
            throw new Error(`Error found: ${response.status} - ${response.statusText || 'undefined Error' }.  Could not find data for "${targetLocation}".`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        updateDetails(data);
    })
    .catch(error=>{
        console.error(`Error for fetching data:`,error);
        temp.innerHTML="Error!";
        conditionEle.innerHTML=` <span class="error-message">${error.message || "Failed to Fetch Data."}</span>`;
        humidityEle.innerHTML='';
        pressureEle.innerHTML='';
        timeEle.innerHTML='';
        iconEle.style.display='none';
        locationEle.innerHTML='';
    })
    
}
fetching(searchField.value);
