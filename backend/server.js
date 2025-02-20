import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // will allow us to parse req.body

app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/tv", tvRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
    connectDB();
});
