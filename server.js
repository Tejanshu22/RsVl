const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = process.env.MONGO_URL || 
  "mongodb://admin:qwerty@localhost:27017/val-db?authSource=admin";

const client = new MongoClient(MONGO_URL);

// Save Name
app.post("/saveName", async (req, res) => {
  try {
    const name = req.body.name;

    await client.connect();

    const db = client.db("val-db");

    await db.collection("roseday").insertOne({
      name: name,
      date: new Date()
    });

    await client.close();

    // Redirect to rose page
    res.redirect(`/rose.html?name=${name}`);

  } catch (err) {
    console.error(err);
    res.send("Error saving name");
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
