const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const currentTemp = document.querySelector('#current-temp')
const weatherDescription = document.querySelector('#weather-description')
const wind = document.querySelector('#wind')


weatherForm.addEventListener('submit', (e) => {
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

