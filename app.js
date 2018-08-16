const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
let methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/resume_portal");

app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

let portalSchema = new mongoose.Schema({
    name:String,
    email:String,
    profile:String,
    qualification:String,
    experience:String,
    image:String,
    skills:String
});

let Portal = mongoose.model("Portal", portalSchema);


app.get("/",(req,res)=>{
   res.render("main"); 
});
// INDEX ROUTE
app.get("/resume",(req,res)=>{
    Portal.find({},(err,portals)=>{
       if(err){
           console.log('Error!!');
       } else{
            res.render("index",{portals,portals}); 
       }
    });
});
// NEW ROUTE
app.get("/resume/new",(req,res)=>{
   res.render("new"); 
});
// CREATE ROUTE
app.post("/resume",(req,res)=>{
    Portal.create(req.body.resume,(err,newresume)=>{
        if(err){
            res.render("new");
        }else{
            res.redirect("/resume");
        }
    })
});

// SHOW ROUTE
app.get("/resume/:id",(req,res)=>{
    Portal.findById(req.params.id,(err,foundresune)=>{
       if(err){
           res.redirect("/resume");
       } else{
           res.render("show",{portal:foundresune})
       }
    });
});
// EDIT ROUTE
app.get("/resume/:id/edit",(req,res)=>{
   Portal.findById(req.params.id,(err,foundresune)=>{
      if(err){
          res.redirect("/resume");
      } else{
          res.render("edit",{portal:foundresune});
      }
   });
});

app.put("/resume/:id",(req,res)=>{
   Portal.findByIdAndUpdate(req.params.id,req.body.resume,(err,updatedresume)=>{
      if(err){
          res.redirect('/resume');
      } else{
          res.redirect("/resume/"+req.params.id);
      }
   });
});

app.delete("/resume/:id",(req,res)=>{
   Portal.findByIdAndRemove(req.params.id,(err)=>{
       if(err){
           res.redirect("/resume");
       }else{
           res.redirect("/resume");
       }
   })
});

app.get("/csit",(req,res)=>{
   res.render("csit"); 
});

app.get("/me",(req,res)=>{
   res.render("me"); 
});
app.get("/civil",(req,res)=>{
   res.render("civil"); 
});
app.get("/ee",(req,res)=>{
   res.render("ee"); 
});
app.get("/ce",(req,res)=>{
   res.render("ce"); 
});
app.get("/links",(req,res)=>{
   res.render("links"); 
});
app.get("/java",(req,res)=>{
   res.render("java"); 
});
app.get("/c",(req,res)=>{
   res.render("c"); 
});

app.listen(process.env.PORT,process.env.IP,()=>{
   console.log("server is running"); 
});