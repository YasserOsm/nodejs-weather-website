const request = require('postman-request')

const forecast = (longtitude , latitude , callback)=>{
    const weatherStackUrl =`http://api.weatherstack.com/forecast?access_key=77695a31bfc7b5a6c3e9293fd86065d9&query=${longtitude},${latitude}&hourly=1`
    request({url : weatherStackUrl , json : true} , (error , response , body)=>{
        if(error){
            callback('coudlnt connect to weather stack servers !')
        }else if(body.error){
            callback(body.error)
        }else{
            callback(error , {
                name : body.location.name ,
                country : body.location.country ,
                weather_description : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                humidity : body.current.humidity,
                feelslike : body.current.feelslike

            })
        }

    })
}

module.exports = forecast