const express=require('express')
const app=express()
const data =require('./views/data')
const session =require('express-session')
const cookie=require('cookie-parser')
const dataM=require('./model/model');
app.set('view engine','ejs');
require('./db/ind');

app.use(express.urlencoded({extended:true}))
app.use(cookie());

app.use(session({
    secret:'87845423njwfbwbfwifjfwfweewfeFEQRQ',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24
    }
}))

app.get('/',(req,res)=>{
   res.render('ind',{data:data});
})

app.get('/login',(req,res)=>{
    res.render('login')
})


app.post('/login',async(req,res)=>{
    //console.log(req.body);
    try{
    if(req.body.cardno=='0000'||req.body.cardno=='1234'){
        req.session.cardno=req.body.cardno;
        res.redirect('/');
    }
    else{
        res.send('Not found')
    }
}catch(err){
    console.log(err);
}

})

app.get('/profile',async(req,res)=>{
   try{
     if(req.session.cardno!=null){
        const data=await dataM.find({user:req.session.cardno});
        //console.log(data); 
        res.render('profile',{data:data});
    }
   
    else{
        res.redirect('/login');
    }}catch(err){
        console.log(err);
    }
    
})


app.post('/id',async(req,res)=>{
    try{

    if(req.session.cardno==null){
        res.redirect('/login');

    }
    else{
        
     const A=data.filter(p=>{
        if(p.id==req.body.name){
            p.status=false;
        }
        return p.id==req.body.name;
    })

    console.log(A[0]);
    const d=new dataM({
        url:A[0].url,
        name: A[0].name,
        desc: A[0].desc,
        status: A[0].status,
        //  author:A[0].author,
        id:A[0].id,
        user:req.session.cardno,

    })
    const res1=await dataM.insertMany([d]);
     //console.log(res1);
    res.redirect('/');
    }}catch(err){
        console.log(err);
    }
})


app.post('/del',async(req,res)=>{
 try{
    data.filter(p=>{
        if(p.id==req.body.name){
            p.status=true;
        }
    })
  const res1= await dataM.deleteOne({id:req.body.name});
  //console.log(res);
   res.redirect('/profile');
 }
 catch(err)
 {
    console.log(err);
 }
})

app.get('/logout',(req,res)=>{
    console.log(req.session.cardno);
    req.session.destroy();
    res.redirect('/');

})




app.listen(8000,()=>{
    console.log('Listing to port 8000')
})