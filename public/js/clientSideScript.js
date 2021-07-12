const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const input = searchInput.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch(`http://localhost:3000/weather?address=${input}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = `${data.name} , ${data.country}`
            messageTwo.textContent = `Temperature is ${data.temperature} degrees out and feels like ${data.feelslike} `
        }
    })
})

})