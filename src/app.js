const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const PublicPath =path.join(__dirname,'../public')
const ViewPath = path.join(__dirname,'../templates/views');
const PartialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views',ViewPath);
app.use(express.static(PublicPath));
hbs.registerPartials(PartialsPath);

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Mahesh Pendyala'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Mahesh Pendyala'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Click here for help",
        name : 'Mahesh Pendyala'
    })
});

app.get('/weather',(req,res)=>{
   
    if(!req.query.address){
        return res.send({
            error: 'Address not found in query string'
        });
    }
    geocode(req.query.address,
        (error,{latitude,longitude,location}={})=>{    
            if(error){
                return res.send({error});
              }        
            forecast(longitude,latitude,(error,forecastWeather)=>{
                if(error){
                    return res.send({error});
                  }    
                  res.send({
                    forecast: forecastWeather, 
                    location:location,       
                    address : req.query.address
                });            
            });
    });
   
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormessage : 'Help Article Not Found',
        title: 'Help',
        name : 'Mahesh Pendyala'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        errormessage : 'Page Not Found',
        title :'unknown',
        name : 'Mahesh Pendyala'
    })
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
});

