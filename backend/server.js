import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import searchRoutes from "./routes/search.routes.js";

import { connectDB } from "./lib/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser()); // will allow us to parse cookies for req.cookies protected routes

app.use("/api/auth", authRoutes);
app.use("/api/movie", protectRoute, movieRoutes);
app.use("/api/tv", protectRoute, tvRoutes);
app.use("/api/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
    connectDB();
});
