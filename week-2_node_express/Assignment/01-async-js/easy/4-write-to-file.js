const fs = require("fs");

const filePath =
    "C:/Users/Pawan Singh/Desktop/cohort/Week-2_node_express/Assignment/01-async-js/easy/demo.txt";

// write to a file asynchronouly
const content = "This side Pawan Singh Dogra";

fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
        console.error("There is Some Error: ", err);
        return;
    }

    console.log("File is written successfully.");
});

fs.appendFile(filePath, content, "utf8", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File is Appended Successfully.");
});
