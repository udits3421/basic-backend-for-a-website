import dotenv from "dotenv";
dotenv.config();

import connection from "./config/database.js";
import app from "./app.js";

const startServer = async () => {
    try {
        await connection();
        app.on("error", (error) => {
            console.log("ERROR!", error);
            throw error;
        });

        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.log("MongoDB connection failed!", error);
    }
};

startServer();
