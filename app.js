const { ENOTEMPTY } = require("constants");
const { query } = require("express");
const express= require ("express");
const app= express();
const path=require("path");
const fs = require("fs");

const bodyParser = require('body-parser');

const bodyParserMW =bodyParser.urlencoded({ extended: true })  
/*
 :To serve static files such as images, CSS files, and JavaScript files, use the 
    express.static   built-in middleware function in Express.
 : use the following code to serve images, CSS files,  and JavaScript files in a directory named Assets
*/
app.use(express.static('Assets'));  // load the files that are in the Assets directory
app.set('view engine', 'ejs'); // Set EJS as templating engine
/* determine rendering engine be ejs template 
 -- use ejs  for make content web page  dynamic
*/

//create array of obj
books=[
    {
        id:'1',
        name:"Introduction-to-Node-js",
        category:"IT",
       imageURL:"./images/node.jpg",
       description:`open source development platform`,
       price:"30JD"
    },  
    {
        id:'2',
        name:"Introduction to Html3 & css3 ",
        category:"IT",
       imageURL:"./images/css3.jpg",
       price:"30JD"
    },
    {
        id:'3',
        name:"Introduction to Physics ",
        category:"Physics",
        imageURL:"./images/ph.jpg",
        price:"25JD"
    },
    {
        id:'4',
        name:"Introduction to Chemistry ",
        category:"Chemistry",
        imageURL:"./images/chem.jpg",
        price:"20JD"
    },
    {
        id:'5',
        name:"Introduction to History",
        category:"History",
        imageURL:"./images/hist.jpg",
        price:"15JD"
    },
    {
        id:'6',
        name:"Introduction to IT V2",
        category:"IT",
        imageURL:"./images/html.jpg",
        price:"15JD"
    },
 

];
/* GET home page. */
app.get('/',(req,res)=>{
/* The render method takes the name of the HTML
   page to be rendered as input
   This page should be in the views folder
   in the root directory.
   */let temp=[];
if(Object.keys(req.query).length== 0)
{
    res.render('home.ejs',{books:books});// can pass multiple properties and values as an object

}
else{
    for(let i=0;i<Object.keys(books).length; i++)
    {
        if(books[i]['category']==req.query.options)
        {
            temp.push(books[i])
        }
    }
    res.render('home.ejs',{books:temp});
}
});


/* GET Details page. */

  app.get('/details:id',(req, res) => {
  /*  console.log(req.params.id); */
    let arr=[];
for(let i=0;i<Object.keys(books).length; i++)
{   /*
req.params : An object containing parameter values parsed from the URL path
    */
     if(books[i]['id']== req.params.id)
          { arr.push(books[i]) }//end if statement
 } //end for loop 
res.render('details.ejs',{books:arr});});



/* req.query */

app.get('/signUp',(req,res)=>{
    let arr=[];
    if(Object.keys(req.query).length== 0)
{
    res.render('signUp.ejs')

}else
{ arr.push(req.query)
  res.render('regestier.ejs',{arr:arr});
}
});

/* req.body */

app.use('/sign',bodyParserMW,(req,res)=>{
    let arr=[];
    if(Object.keys(req.body).length== 0)
{
    res.render('sign.ejs')

}else
{ arr.push(req.body)
  res.render('regest2.ejs',{arr:arr});
}
});


app.listen(5001,()=>{ // port is 5000
    console.log("server ---  5001")})