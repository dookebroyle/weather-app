const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const currentTemp = document.querySelector('#current-temp')
const weatherDescription = document.querySelector('#weather-description')
const wind = document.querySelector('#wind')
const userLocation = document.querySelector('#your-location-button');



userLocation.addEventListener('click', (e)=> {

    e.preventDefault();
    function success(pos) {
        const crd = pos.coords;
        //console.log(pos.coords)
        const location = `${crd.latitude},${crd.longitude}`
        
        messageOne.textContent = 'Loading...'
        currentTemp.textContent = ''
        weatherDescription.textContent = ''
        wind.textContent = ''
    
        
        fetch(`/weather?location=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error){
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    currentTemp.textContent = `${data.currentTemp} \u00B0`
                    weatherDescription.textContent =  `${data.weatherDescription}`
                    wind.textContent = `Wind: ${data.windSpeed} mph ${data.windDir}`
                }
            })
        })
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error)

    

})

weatherForm.addEventListener('submit', (e) => {
    //
    e.preventDefault();
    const location = search.value
    messageOne.textContent = 'Loading...'
    currentTemp.textContent = ''
    weatherDescription.textContent = ''
    wind.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                currentTemp.textContent = `${data.currentTemp} \u00B0`
                weatherDescription.textContent =  `${data.weatherDescription}`
                wind.textContent = `Wind: ${data.windSpeed} mph ${data.windDir}`
            }
            
        })
    })
})

