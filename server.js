const express = require("express");
const fs = require("fs");
const app = express();

// Read player data from JSON file
const playerData = JSON.parse(fs.readFileSync("players.json"));

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static("public"));

// Search route
app.get("/search", (req, res) => {
    const playerName = req.query.name.trim().toLowerCase(); // Convert to lowercase and remove whitespaces
    console.log("Received player name:", playerName);

    // Check if player name exists in data
    if (playerName in playerData) {
        console.log("Player found:", playerData[playerName]);
        res.send(playerData[playerName]);
    } else {
        console.log("Player not found");
        res.status(404).send("Player not found");
    }
});



// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
