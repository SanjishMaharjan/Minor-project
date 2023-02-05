const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors);

app.get('/test',(req,res)=>{
    res.json([{message:'test ok'},{message:'test not ok'}]);
    // res.send("k xaa hajur");
});

app.listen(4000);