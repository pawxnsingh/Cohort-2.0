const jwt = require("jsonwebtoken");
const z = require("zod");

const jwtPassword = "ItisaSecret";

const signJWttoken = jwt.sign({ username: "Pawan singh" }, jwtPassword);

console.log(signJWttoken);

const decodeToken = jwt.decode(signJWttoken);

console.log(decodeToken);

const verifed = jwt.verify(signJWttoken, "jwtPassword");

console.log(verifed);
