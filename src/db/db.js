import mongoose from "mongoose";
import 'dotenv/config';
import { DB_NAME } from "../constants.js";

import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected!!  DB Host : ${connectionInstance.connection.host}`);
        
    }
    catch (err) {
        console.log("MongoDB connection error ", err);
        process.exit(1);
    }
}

export default connectDB;