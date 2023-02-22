var express=require("express")
var path=require("path")
var app=express()
var hbs=require("hbs")
var bodyparser=require("body-parser")
var nodemailer=require("nodemailer")
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS:false,
    auth: {
      user: "naazkhatoon492@gmail.com", 
      pass:"sexfknxhqkplelcr", 
    },
  });

var encoder=bodyparser.urlencoded()
app.set("view engine","hbs")
var partialpath=path.join(__dirname,"./views/partials")
var publicpath = path.join(__dirname,"./views/public")

hbs.registerPartials(partialpath)
app.use(express.static(publicpath))

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/services",(req,res)=>{
    res.render("services")
})
app.get("/gallery",(req,res)=>{
    res.render("gallery")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})
app.post("/contact",encoder,(req,res)=>{
var text=`Name:${req.body.name}\nPhone:${req.body.number}\nEmail:${req.body.email} 
 \nMessage:${req.body.message}`
   var mailOptions={
    from:"naazkhatoon492@gmail.com",
    to:"naazkhatoon492@gmail.com",
    subject:req.body.subject,
    text:text
   }
   transporter.sendMail(mailOptions,(error,data)=>{})
    var mailOptions= {
        from:"naazkhatoon492@gmail.com",
        to:req.body.email,
        subject:"Query Has been Submitted",
        text:"Thank to share your contact Details\nTeam : m ysite.com"
    }
    transporter.sendMail(mailOptions,(error,data)=>{
        res.render("contact",{"message":true})
    })
})

app.listen(8000,()=>{
    console.log("server is running");
})