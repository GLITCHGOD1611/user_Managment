const express = require ('express');
const path = require('path')
const userModel = require('./models/user')
const app = express();
const PORT = process.env.PORT || 3000;


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.render("index");
})
app.get('/read',async (req,res)=>{
   let allusers = await userModel.find()
    res.render("read",{users :allusers});
})

app.post('/create',async (req,res)=>{
   let {name,email,image} = req.body;

   let createduser = await userModel.create({
    name,
    email,
    image
   })

   res.redirect('/read')
})

app.get('/delete/:id',async (req,res)=>{
    let deletedUser = await userModel.findOneAndDelete({_id : req.params.id});
    res.redirect('/read');
})

app.get('/update/:id',async (req,res)=>{
    let user = await userModel.findOne({_id:req.params.id});
    res.render('edit',{user})
})

app.post('/edit/:id',async (req,res)=>{
    // image = req.params.image;
    // name = req.params.name;
    // email = req.params.email;

    let {image , name , email } = req.body;   // sortcut  

    let user = await userModel.findOneAndUpdate({_id:req.params.id},{image , name , email}, {new : true});
    res.redirect('/read')
})
app.listen(port,()=>{

    console.log(`server is running on port : ${port}`)
})
