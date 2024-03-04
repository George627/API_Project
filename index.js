//Importing resources from Express, Axios, and Body-Parser.
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//Creating the app using from a express method.
const app = express();

//App will be ran on port 3000.
const port = 3000;

//The URL and location the API will be getting information.
const API_URL = "https://www.dnd5eapi.co/api/races/";

//Links the public folder for a place for static files as well as CSS to the App.
app.use(express.static("public"));

//Makes it to where the App is able to use Body-Parser.
app.use(bodyParser.urlencoded({ extended: true }));

//A get method for the homepage.
app.get("/",  (req, res) => {

    //Renders the index.ejs file.
    res.render("index.ejs");
});

//A post method that has a async function. 
//The function grabs information from the URL and returns the data that the user request.
app.post("/submit", async (req, res) => {

    //Try & Catch statment that tries to get data from the URL and will catch any errors along the way. 
    try {  

        /*The raceInfo constant is used to store the data at the URL 
          along with the type that the user specified.*/
        const raceInfo = await axios.get(API_URL + req.body.type);

        //The raceResult constant stores the raceInfo.data that has been formatted to JSON with ".data".
        const raceResult = raceInfo.data;

        //Renders the index.ejs file along with the raceResult. 
        res.render("index.ejs", {
          races: raceResult,
        });

    } catch (error) {

        //An error message that will be triggered if the catch expression is called.
        console.error("Failed to make request:", error.message);

        //Renders an error message.
        res.render("index.ejs", {
          error: error.message,
        });
    }
  });

//Listening on Port 3000.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  
