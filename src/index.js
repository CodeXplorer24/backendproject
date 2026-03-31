// require('dotenv').config({path: './env'})
import 'dotenv/config';
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants"
// import express from "express";
import connectDB from "./db/db.js";


connectDB();

/*
function connectDB(){}
connectDB()
*/

//another way by iffy or IIFE

/*
( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Eroor : ", error);
            throw error;
        })

        app.listen(process.env.PORT, () =>{
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
    }
    catch (err){
        console.log("Error : ", err);
        throw err;  
    }
})();

*/

