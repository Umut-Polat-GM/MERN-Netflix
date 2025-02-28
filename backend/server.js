import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import searchRoutes from "./routes/search.routes.js";

import { connectDB } from "./lib/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser()); // will allow us to parse cookies for req.cookies protected routes

app.use("/api/auth", authRoutes);
app.use("/api/movie", protectRoute, movieRoutes);
app.use("/api/tv", protectRoute, tvRoutes);
app.use("/api/search", protectRoute, searchRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
    connectDB();
});
