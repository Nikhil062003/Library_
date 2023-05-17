const mongoose=require('mongoose')

const schema=mongoose.Schema({
//     "url":"https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
//    "name":"Atomic Habits",
//    "author":"James Clear",
//    "desc":"XYZ",
//    "status":true
     url:String,
     name:String,
     auhtor:String,
     desc:String,
     status:Boolean,
     id:Number,
     user:Number,


})

const dataM=mongoose.model('dataM',schema);
module.exports=dataM;
