import express from "express";
import morgan from "morgan";

// // import itemRoutes
// import itemRoutes from "./api/v1/routes/itemRoutes";

// import setupSwagger endpoint
import setupSwagger from "../config/swagger"; 
import { timeStamp } from "console";

const app = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());

// setup swagger for api documentation
setupSwagger(app);

app.get("/health", (req, res) => {
	res.send("Server is healthy");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});


// // register itemRoutes
// app.use("/api/v1/items", itemRoutes)

export default app;