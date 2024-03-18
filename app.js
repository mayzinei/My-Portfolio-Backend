const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const parser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const PORT = process.env.PORT || 4001;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
// app.get("/", (req, res) => {
// 	return res.json("Hello World");
// });

app.get("/", async (req, res) => {
	const data = await prisma.user_contact.findMany();
	return res.json(data);
});

app.post("/contact", async (req, res) => {
	const { name, phone, email, subject, message } = req.body;

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		// subject : subject,
		text: `Dear ${name}.
			I received well your email : ${subject}. I will contact you soon.
			Thank you & best regards.`,
	};

	transporter.sendMail(mailOptions, async (error, info) => {
		if (error) {
			console.error("Error sending email:", error);
			return res.json({ message: error });
		} else {
			const data = await prisma.user_contact.create({ data: req.body });

			// return res.json(data);

			return res.json({ data: data, message: "Email Sent" });
		}
	});
});
app.listen(PORT, () => {
	console.log(`Server is running at port : ${PORT}`);
});
