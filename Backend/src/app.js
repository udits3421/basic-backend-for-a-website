import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

// Simple CORS middleware so web frontends can call this API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Intro to Backend API is running successfully!"
    });
});

// API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;
