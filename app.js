const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js
app.use(express.static("css"));

const request = require('request');

//routes
app.get("/", async function(req, res){
    
    let arr = ["cars", "flowers", "cats", "parrots"]; //predefined array with elements
    
    let orient = ["horizontal", "vertical"]; //array orientation
    
    let random_image = arr[Math.floor(Math.random()*arr.length)]; //random elements
    
    let random_orientation = orient[Math.floor(Math.random()*orient.length)]; //random orientation
    
    let parsedData = await getImages(random_image, random_orientation);
    
    // console.dir("parsedData: " + parsedData); //displays content of the object
    
    res.render("index", {"images":parsedData}); //.hits[0].largeImageURL});
    
    res.render("index", {"likes":parsedData});
    
}); //root route



app.get("/results", async function(req, res){
    
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    
    let orientation = req.query.orientation; //gets the orientation horizontal or vertical
    
    let parsedData = await getImages(keyword, orientation);
    
    res.render("results", {"images":parsedData});
    res.render("results", {"likes":parsedData});
    
}) //results route


//Returns all data from the Pixabay API as JSON format
function getImages(keyword, orientation){
    
    
    return new Promise(function(resolve, reject){
        request('https://pixabay.com/api/?key=15439039-4cb42c8da9980d33aaad93427&q='+keyword+'&orientation='+orientation,
            function(error, response, body){
                
                if(!error && response.statusCode == 200){ //no issues in the request
                
                let parsedData = JSON.parse(body); //converts string to JSON
                
                resolve(parsedData);
                
                //let randomIndex = Math.floor(Mah.random() * parsedData.hits.lenght);
                //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                //res.render("index",{"image":parsedData.hits[randomIndex].largeImageURL});
                
                }else{
                    reject(error);
                    console.log(response.statusCode);
                    console.log(error);
                }
                
            }); //request
            
    });
    
}


//server listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express Server is Running...");
});