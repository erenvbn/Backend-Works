//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require('lodash');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

//EJS renderer initialization
app.set('view engine', 'ejs');

app.use(express.json()); //Parse JSon bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.static("public"));


let articlesArray = [];

app.get('/', function (req, res) {
  res.render('home', {
    homeParagraph: homeStartingContent,
    articlesArrayinEJS : articlesArray,
  });
});

app.post('/', function (req, res) {
  document.getElementById("about").addEventListener("click", function(){
    res.redirect("about");
  });
});
 

app.get('/contact', function (req, res) {
  res.render('contact', {
    contactParagraph: contactContent
  });
});


app.get('/about', function (req, res) {
  res.render('about', {
    aboutParagraph: aboutContent
  });
});


app.get('/compose', function (req, res){
  res.render('compose');
});

app.post('/compose', function (req, res) {
  //javascript object for posted articles
  const article={
    articleTitle : req.body.inputArticleTitle,
    articleBody : req.body.inputArticleBody
  };

  articlesArray.push(article);

  res.redirect('/');
});


//Automated route generator in express.js
app.get("/posts/:postName", function(req, res){
  //if requestedTitle is in articleTitle array
  const requestedTitle = _.lowerCase(req.params.postName);

  articlesArray.forEach(function(article){
    const storedTitle = _.lowerCase(article.articleTitle);
    
    if (storedTitle === requestedTitle){
      res.render("post",{
        title : article.articleTitle,
        content : article.articleBody
      });
    }

  });

});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
