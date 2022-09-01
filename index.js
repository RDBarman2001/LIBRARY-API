const express=require("express");
const dotenv=require("dotenv");
const Db=require('./databaseConnection')
const usersRouter=require('./routes/users')
const booksRouter=require('./routes/books')
dotenv.config();
const app =express();
Db();
const PORT=8081;

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is running",
    });
});

app.use('/users',usersRouter);
app.use('/books',booksRouter);

 app.get('*',(req,res)=>{
    res.status(404).json({
        message:"Route Not Found",
    });
 });

app.listen(PORT,()=>{
    console.log(`Server is running a port${PORT}`);
});
