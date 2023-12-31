// let fs = require("fs");

// fs.readFile("demo.txt", "utf-8", (err, data) => {
//     if(err){
//         console.error("This is the error: ",err);
//         return;
//     }
//     console.log(data);

// });

const fs = require("fs");

// Specify the path to the file you want to read
const filePath =
    "C:/Users/Pawan Singh/Desktop/cohort/Week-2_node_express/Assignment/01-async-js/easy/demo.txt";

// Read the file asynchronously
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Display the content of the file
    console.log("File content:", data);
});

// Note: 'utf8' is the encoding, specifying it will return a string. Omitting it will return a Buffer.
