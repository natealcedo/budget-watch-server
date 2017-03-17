import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import routes from "./routes";

const app = express();

if(process.env.NODE_ENV !== "test"){
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use("/api", routes);
app.all("/", (req,res) => {
  res.status(404).json({
    error: "Resource not found"
  });
});

mongoose.connect(process.env.DB, (err)=>{
  if (err){
    throw err;
  } else {
    if(process.env.NODE_ENV === "dev"){
      console.log("Connected to DB");
    }
  }
});

export default app;
