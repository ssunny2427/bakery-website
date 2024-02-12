import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
var name1 = "";
var name2 = "";
var name3 = "";
var name4 = "";
var name5 = "";
var name6 = "";
var name7 = "";
var name8 = "";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Cluster99", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose connection instance
const db = mongoose.connection;

// Event handlers for successful and error connections
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

function checkName(req, res, next) {
  name1 = req.body["item1"];
  name2 = req.body["item2"];
  name3 = req.body["item3"];
  name4 = req.body["item4"];
  name5 = req.body["item5"];
  name6 = req.body["item6"];
  name7 = req.body["item7"];
  name8 = req.body["item8"];

  next();
}
app.use(checkName);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});
app.get("/index",(req,res)=>{
  res.sendFile(__dirname + "/index.html");
});
app.get("/about", (req, res) => {
  res.sendFile( __dirname + "/about.html");
});
app.get("/contact", (req, res) =>{
  res.sendFile(__dirname +"/contact.html");
});
app.get("/menu",(req,res)=>{
  res.sendFile( __dirname+"/menu.html");
});
app.get("/catering",(req,res)=>{
  res.sendFile( __dirname+"/catering.html");
});



app.post("/submit", async (req, res) => {
  res.send(`<style>
  body{
      background-image: linear-gradient(to bottom,black,#343434,#28282B);
      color:#fff;
  }
</style>
<h1>Your Order Has Been Submitted!</h1><br/>
<h1> Your Name is ${name1}</h1> <br>  <h2>Your Mail is ${name2}</h2> <br> <h2>Your number is ${name3} </h2><br><h2> You want ${name4} Pizzas </h2><br> <h2>You want ${name5} Burgers</h2> <br> <h2>Your pastries is ${name6} </h2><br><h2> Your Address is ${name8}<h2> <br> Other ${name7} <h1>Thank you for ur support😁😁 😁`  );

  // Example: Save the data to a MongoDB collection using Mongoose
  const Order = mongoose.model("Order", {
    name1: String,
    name2: String,
    name3: String,
    name4: String,
    name5: String,
    name6: String,
    name7: String,
    name8: String,
  });

  const order = new Order({
    name1,
    name2,
    name3,
    name4,
    name5,
    name6,
    name7,
    name8,
  });

  try {
    await order.save();
    console.log("Order saved successfully");
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
