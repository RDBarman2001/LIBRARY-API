const mongoose=require('mongoose');
function Db(){
    const DB_URL=process.env.MONGO_URI;
    mongoose.connect(DB_URL, {
        useNewUrlparser:true,
        useUnifiedTopology:true,
    })
    const db=mongoose.connection;
    db.on('error',console.error.bind(console,"Connection error:"))
    db.once("open",function(){
        console.log('Database connected...')
    })

}

module.exports=Db;