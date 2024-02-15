const express = require("express");
const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
	return res.json("Hello World");
});

app.listen(PORT, (req, res) => {
	console.log(`Server is running at port : ${PORT}`);
});
