const express = require("express");

const app = express();

// listen port 3030
app.listen(3030, () => {
  console.log("Server is running on port 3030");
});

app.get("/task", (req, res) => {
  res.send("Hello World");
});

app.post('/task' , (req , res) =>{

})