import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://www.dnd5eapi.co/api/races/";
 
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
  