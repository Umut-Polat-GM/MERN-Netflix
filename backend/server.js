import express from "express";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
