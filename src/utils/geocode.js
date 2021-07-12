const request = require('postman-request')



const geocode = (address , callback) => { 
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieWFzc2Vyb3NtIiwiYSI6ImNrcW5xZjdvNDA2b2cyenFoZGR6bnJlZnQifQ.DQckWRegbcb1SnE-1M1Nuw&limit=1`
    request ({url:mapBoxUrl , json : true} , (error , response, body)=>{
        if(error){
            callback('couldnt connect to mapBox servers !',undefined)
        }else if(body.features.length === 0){
            callback('Address not found , please try again ' , undefined)
        }
        else{
            callback(undefined,{
                longtitude : body.features[0].center[1],
                latitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
             
        }
        
    })
}

module.exports = geocode