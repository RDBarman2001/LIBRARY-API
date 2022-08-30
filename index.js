const express=require("express");
const app =express();
const PORT=8081;

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is running",
    });
});

 app.get('*',(req,res)=>{
    res.status(404).json({
        message:"Rout Not Found",
    });
 });

app.listen(PORT,()=>{
    console.log(`Server is running a port${PORT}`);
});
