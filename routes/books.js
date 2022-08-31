const express=require('express');
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router =express.Router();
/* 
Route:/books
Method:GET
Description: Get all books
Access: public
Parameters:None
 */
router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:books,
    })
})
/* 
Route:/books/:id
Method:GET
Description: Get book by id
Access: public
Parameters:id
 */
router.get('/:id',(req,res)=>{
    const {id}=req.params
    const book=books.find((each)=>each.id===id);
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

})


/* 
Route:/books
Method:POST
Description:Creat new book
Access: public
Parameters: none
 */
router.post('/',(req,res)=>{
   const{id,name,author,genre,price,publisher}=req.body;
   const book=books.find((each)=>each.id===id);
   if(book){
        return res.status(404).json({
            success:false,
            message:"Book exists with this id",
        });
    }
    books.push({
        id,name,author,genre,price,publisher,
    });
    return res.status(201).json({
        success:true,
        data:books,
    });

})


/* 
Route:/books/:id
Method:PUT
Description:Updating Book data
Access: public
Parameters: id
 */
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const{data}=req.body;
    const book=books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
         success:false,
         message:"Book not found"
        })
    }
    const updatedBook=books.map((each)=>{
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
        message:updatedBook,

    })
})
/*
Route:/books/:id
Method:DELETE
Description:Delete a Book by id
Access: public
Parameters: id
 */
router.delete('/:id',(req,res)=>{
    const{id}=req.params;
    const book=books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found",
        })
    }
    const index=books.indexOf(book);
    books.splice(index,1);
    return res.status(200).json({
        success:true,
        data:books,
    })
})

/* 
Route:/books/issued/by-user
Method:GET
Description: Get issued books
Access: public
Parameters:None
 */
router.get('/issued/by-user',(req,res)=>{
const userWithIssuedBooks=users.filter((each)=>{
    if(each.issuedBook) return each;
});
const issuedBooks=[];
userWithIssuedBooks.forEach((each)=>{
    const book =books.find((book)=>book.id===each.issuedBook)
    book.issuedBy=each.name;
    book.issuedDate=each.issuedDate;
    book.returnDate=each.returnDate;
    issuedBooks.push(book);

});
if(issuedBooks.length===0)
    return res.status(404).json({
        success:false,
        message:"No Books issued Yet"
    });
    return res.status(200).json({
        success:true,
        message:issuedBooks,
    });

});


module.exports=router;