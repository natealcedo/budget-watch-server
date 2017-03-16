import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import routes from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", routes);

mongoose.connect(process.env.DB, (err)=>{
  if (err){
    console.error(err);
    throw err;
  } else {
    if(process.env.NODE_ENV === "dev"){
      console.log("Connected to DB");
    }
  }
});

export default app;
