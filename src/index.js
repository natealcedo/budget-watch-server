import app from "./app";

app.listen(process.env.port, () => {
  if(process.env.NODE_ENV === "dev"){
    console.log("Server started on port", process.env.PORT);
  }
});
