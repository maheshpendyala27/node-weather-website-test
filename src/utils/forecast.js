const request = require('request');


const forecast = (longitude,latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=c07f6f8b75af603d580e754edee91cd5&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f';
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect", undefined);
                   
               }
                else if(body.error){
                    callback("unable to find location", undefined);
                    
                }
                else{
                    callback( undefined, body.current.weather_descriptions+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out and the humidity is"+body.current.humidity);
                
                }

    })
};

module.exports = forecast;