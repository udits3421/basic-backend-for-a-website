import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connection = async () => {
    try {
        let uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        uri = uri.trim().replace(/;+$/, "");

        const connectionInstance = await mongoose.connect(uri);
        console.log(`\n MongoDB Connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed", error);
        process.exit(1);
    }
};

export default connection;
