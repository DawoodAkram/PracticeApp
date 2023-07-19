require('dotenv').config();
const express=require("express");
const https=require("https");
const BodyParse=require("body-parser")
console.log(process.env.PORT_KEY);

const app=express();
app.use(BodyParse.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/index.html")
})

app.post('/',(req,res)=>{
    const CN=req.body.CityName;
    const URL="https://api.openweathermap.org/data/2.5/weather?q="+CN+"&appid=e158d096edf4d8ccf9a93617aff81fd2&units=metric";
    https.get(URL,function(response){
        response.on("data",function(data){
            console.log(data);
            const WeatherData = (JSON.parse(data));
            const temp = WeatherData.main.temp;
            const icon=WeatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The Current temperature in "+ CN +" is " + temp + " Degree Celsius </h1>");
            res.write("<img src="+ imageURL +">");
            res.send();
        })      
    })
})

app.listen(process.env.PORT_KEY,()=>{
    console.log("Server Running on port 3003")
})
    
