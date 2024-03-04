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

//Links the public folder for a place for static files as well as CSS.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",  (req, res) => {
    res.render("index.ejs");
  });

app.post("/submit", async (req, res) => {
    
   console.log();
    
    try {
      
    const raceInfo = await axios.get(API_URL + req.body.type);
    const raceResult = raceInfo.data;

      res.render("index.ejs", {
        races: raceResult,
      });

    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  
