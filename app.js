const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const parser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const PORT = process.env.PORT || 4001;

const transporter = nodemailer.createTransport({
	service: "Gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

app.use(parser.json());
app.use(cors());
app.get("/", (req, res) => {
	return res.json("Hello World");
});

app.post("/contact", (req, res) => {
	const { name, phone, email } = req.body;
	const data = {
		name,
		phone,
		email,
	};
	return res.json(data);
});

app.listen(PORT, () => {
	console.log(`Server is running at port : ${PORT}`);
});
