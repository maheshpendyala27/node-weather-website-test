const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFoZXNocGVuZHlhbGEiLCJhIjoiY2t3cGVzcnQ3MGMxeTJ5bThua2FhNjg2cyJ9.aZsKNl9ueNiJDVDGrlLgYw&limit=1';
    
    request({url, json: true},(error,{body}={})=>{
       
        if(error){
            callback('unable to connect mapbox services', undefined );
        }
        else if(body.features.length == 0){
            callback('unable to get data from mapbox services',undefined);
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            });
        }
    });
    
    }

    module.exports=geocode;