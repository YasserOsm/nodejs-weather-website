const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const Location = searchInput.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch(`/weather?address=${Location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = `${data.name} , ${data.country}`
            messageTwo.textContent = `${data.weather_description} , 
            Humidity ${data.humidity} , Temperature is ${data.temperature} degrees out and it feels like ${data.feelslike} `
            
        }
    })
})

})