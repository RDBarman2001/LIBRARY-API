const express=require("express");
const {users}=require('./data/users.json');
const{books}=require('./data/books.json');
const { json } = require("express");
const app =express();
const PORT=8081;

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is running",
    });
});
/* 
Route:/users
Method:GET
Description: Get all users
Access: public
Parameters:None
 */
app.get('/users',(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    })
})
/* 
Route:/users/:id
Method:GET
Description: Get single user by id
Access: public
Parameters: id
 */
app.get('/users/:id',(req,res)=>{
    const {id}=req.params
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User Not Found",
        })
    }
    return res.status(200).json({
        success:true,
        data:user,
    })

})
/* 
Route:/users
Method:POST
Description:Creat new user
Access: public
Parameters: none
 */
app.post('/users',(req,res)=>{
   const{id,name,surname,email,subscriptionType,subscriptionDate}=req.body;
   const user=users.find((each)=>each.id===id);
   if(user){
        return res.status(404).json({
            success:false,
            message:"User exists with this id",
        });
    }
    users.push({
        id,name,surname,email,subscriptionType,subscriptionDate,
    });
    return res.status(201).json({
        success:true,
        data:users,
    });

})
/* 
Route:/users/:id
Method:PUT
Description:Updating user data
Access: public
Parameters: id
 */
app.put('/users/:id',(req,res)=>{
    const {id}=req.params;
    const{data}=req.body;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
         success:false,
         message:"User not found"
        })
    }
    const updatedUser=users.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data


            }
        }
        return each;
    })
    return res.status(200).json({
        success:true,
        message:updatedUser,

    })
})

 app.get('*',(req,res)=>{
    res.status(404).json({
        message:"Route Not Found",
    });
 });

app.listen(PORT,()=>{
    console.log(`Server is running a port${PORT}`);
});
