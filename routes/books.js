const express=require('express');
const { getAllBooks, getBookbyid, deleteBookbyid, getAllissuedbook, getAllissuedbooks, addNewBook, updateBookById, getSingleBookByName, getBookByName } = require('../controllers/books.cont');
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
router.get('/',getAllBooks)
/* 
Route:/books/:id
Method:GET
Description: Get book by id
Access: public
Parameters:id
 */
router.get('/:id',getBookbyid)
// router.get('/getbook/name/:name',getBookByName)

/* 
Route:/books
Method:POST
Description:Creat new book
Access: public
Parameters: none
 */
router.post('/',addNewBook)

/* 
Route:/books/:id
Method:PUT
Description:Updating Book data
Access: public
Parameters: id
 */
router.put('/:id',updateBookById)
/*
Route:/books/:id
Method:DELETE
Description:Delete a Book by id
Access: public
Parameters: id
 */
router.delete('/:id',deleteBookbyid)

/* 
Route:/books/issued/by-user
Method:GET
Description: Get issued books
Access: public
Parameters:None
 */
router.get('/issued/by-user',getAllissuedbooks);
/* 
Route:/books/issued/withFine
Method:GET
Description: Get issued books with fine
Access: public
Parameters:None
 */

 router.get('/issued/withFine',(req,res)=>{
    const userWithIssuedBooks=users.filter((each)=>{
    if(each.issuedBook) return each;
});
const issuedBooks=[];
userWithIssuedBooks.forEach((each)=>{
    const book =books.find((book)=>book.id===each.issuedBook)
    book.issuedBy=each.name;
    book.issuedDate=each.issuedDate;
    book.returnDate=each.returnDate;
    
    const getDateIndays =(data="")=>{
        
        if(data===""){
            date=new Date();
        }
        else{
            date=new Date(data)
        }
        let days=Math.floor(date/(1000*60*60*24));
        return days;
       };
       let returnDate=getDateIndays(each.returnDate);
       let currentDate=getDateIndays();
       if(returnDate<currentDate){
        issuedBooks.push(book);
       }

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

     })


module.exports=router;