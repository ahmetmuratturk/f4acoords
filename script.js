let playerData; // Declare a variable to hold player data

function fetchData() {
    fetch('players.json') // Fetch data from players.json
        .then(response => response.json())
        .then(data => {
            playerData = data; // Store data in playerData variable
            filterData(); // Call filterData after data is fetched
        })
        .catch(error => console.error('Error fetching data:', error));
}

function filterData() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const dataList = document.getElementById("data-list");
    dataList.innerHTML = ""; // Clear existing data

    if (playerData) { // Check if data is fetched before processing
        for (const player in playerData) {
            if (searchTerm === "" || player.toLowerCase().includes(searchTerm) || playerData[player].toLowerCase().includes(searchTerm)) {
                const dataItem = document.createElement("div");
                dataItem.className = "data-item";

                const nameSpan = document.createElement("span");
                nameSpan.textContent = player;

                const coordSpan = document.createElement("span");
                coordSpan.textContent = playerData[player];
                coordSpan.className = "coordinates"; // Add a class to identify coordinate spans

                const copyButton = document.createElement("button");
                copyButton.textContent = "Copy";
                copyButton.addEventListener("click", function() {
                    const coords = coordSpan.textContent; // Get the coordinates from the corresponding span
                    console.log("Button clicked!"); // Test: Log a message to confirm button click
                    navigator.clipboard.writeText(coords)
                        .then(() => {
                            console.log("Coordinates copied to clipboard!");
                        })
                        .catch((err) => {
                            console.error("Failed to copy coordinates:", err);
                        });
                });

                dataItem.appendChild(nameSpan);
                dataItem.appendChild(coordSpan);
                dataItem.appendChild(copyButton);
                dataList.appendChild(dataItem);
            }
        }
    } else {
        console.warn('Player data not fetched yet!');
    }
}

// Fetch data on page load
window.onload = fetchData;
