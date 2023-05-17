const mongoose=require('mongoose')

const db=mongoose.connect('mongodb+srv://Nikhil:sharma123@cluster0.zimnkin.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('Connected to DB');
}).catch(err=>{
    console.log(err)
})

module.exports=db;

