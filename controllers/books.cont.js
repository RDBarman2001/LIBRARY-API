const{BookModel,UserModel}=require('../models')
const IssuedBook = require("../dtos/book-dto");


exports.getAllBooks= async(req,res)=>{
    const books=await BookModel.find();
    if(books.length===0){
        return res.status(404).json({
            success:false,
            message:"NO book found",
        });

    }
      res.status(200).json({
            success:true,
            data:books,
        });
};
exports.getBookbyid=async(req,res)=>
    {
    const book =await BookModel.findById(id);
   
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book Not Found",
        })
    }
    return res.status(200).json({
        success:true,
        data:book,
    })

}
exports.getAllissuedbook=async(req,res)=>{
    const user=await UserModel.find({
        issuedBook:{$exists:true}
    }).populate('issuedBook');
    const issuedBooks=user.map((each)=> new IssuedBook(each))

if(issuedBooks.length===0)
    return res.status(404).json({
        success:false,
        message:"No Books issued Yet"
    });
    return res.status(200).json({
        success:true,
        message:issuedBooks,
    });

}


