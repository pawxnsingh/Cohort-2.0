const fs = require("fs");
const filePath =
    "C:/Users/Pawan Singh/Desktop/cohort/Week-2_node_express/Assignment/01-async-js/medium/file.txt";

async function readFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function writetoFile(filePath) {
    let rawData = await readFromFile(filePath);

    let refinedData = rawData.replace(/\s+/g, " ");

    fs.writeFile(filePath, refinedData, "utf8", (err) => {
        if (err) {
            console.error("there is an error in writing file: ", err);
            return;
        }
        console.log("File is Written successfully");
    });
}
writetoFile(filePath);