import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(path.join(__dirname,'../frontend/build')));

app.use("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/build/index.html"));
})

app.post("/getData/:pageNo",async(req,res,next)=>{
    const {arr} = req.body;
    const {pageNo} = req.params;

    const pageSize = Math.ceil(arr.length / 3); 
  const startIndex = (pageNo - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, arr.length);

    let res_arr = arr.slice(startIndex,endIndex);

     res.status(201).json({
        success: true,
        res_arr:res_arr
     })
})

export default app;