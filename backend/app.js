import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.post("/getData/:pageNo",async(req,res,next)=>{
    const {arr} = req.body;
    const {pageNo} = req.params;

    let startIndex = (pageNo-1)*3;
    let endIndex = startIndex+2;

    let res_arr = arr.slice(startIndex,endIndex+1);

     res.status(201).json({
        success: true,
        res_arr:res_arr
     })
})

export default app;