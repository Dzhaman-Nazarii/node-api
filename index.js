import express from "express";
import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();

app.use((req, res, next) => {
	console.log("Time", Date.now());
	next();
});

app.get("/hello", (req, res) => {
	res.end();
});

app.use("/user", userRouter);

app.use((error, req, res, next) => {
	console.log(error.message);
	res.status(500).send(error.message);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
