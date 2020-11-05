//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hello there,Myself Ishu joshi,studying B.Tech in CSE at PES University.This is my first attempt to build a blog website,which has many features";
const aboutContent = "These are the Blogs written By you,You are great and continue Writing the Blogs!have a great Day";
const contactContent = "Name:Ishwar Joshi .Email-id :ishwarj515@gmail.com .9481833556";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts =[];

app.get("/",(req,res)=>{

  res.render("home",{homeContent:homeStartingContent,post:posts});
});

app.get("/about",(req,res)=>{
  res.render("about",{about:aboutContent});
});


app.get("/contact",(req,res)=>{
  res.render("contact",{contact:contactContent});
});


app.get('/compose',(req,res)=>{
  res.render("compose");
});

/* app.get("/post",(req,res)=>{
  res.render("post",{post:posts});
}); */

app.get("/post/:tit",(req,res)=>{
  //console.log(req.params.tit);
const requestedTitle = _.lowerCase(req.params.tit);
let atitle ="";
for(let j=0;j<posts.length;j++){
  atitle = _.lowerCase(posts[j].title);
 // console.log( atitle);
  //console.log( requestedTitle);
  if(requestedTitle==atitle){
    res.render("post",{contentTitle:atitle,bodyContent:posts[j].body});
  }
}

});


app.post("/compose",(req,res)=>{
let con = {
  title:req.body.title,
  body:req.body.content
}
posts.push(con);
res.redirect('/');

});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
