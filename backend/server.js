import express from 'express';
import app from "./app.js"

const port = 4500;

app.listen(port,()=>{
    console.log(`Server is running on port number :- ${port}`);
})