const{BookModel,UserModel}=require('../models')
const IssuedBook = require("../dtos/book-dto");
const { db } = require('../models/user-model');


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

    { const { id } = req.params;
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
exports.getAllissuedbooks=async(req,res)=>{
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

exports.addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data provided",
    });
  }

  await BookModel.create(data);

  const allNewBook = await BookModel.find();

  return res.status(201).json({
    success: true,
    data: allNewBook,
  });
};
exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    data: updatedBook,
  });
};

exports.deleteBookbyid = async (req, res) => {
  const { id } = req.params;

   const book =await BookModel.findById(id);
   
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book Not Found",
        })
    }

   await BookModel.deleteOne({_id:id})

   return res.status(200).json({
    success: true,
  }); }


