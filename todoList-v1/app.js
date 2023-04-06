const express = require('express');
const app = express();

const dateModule = require(__dirname+"/dateModule")

app.set('view engine', 'ejs');// set the view engine to ejs

app.use(express.json()); //Parse JSon bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.static('public'));

let itemsArrayinJS = ["Buy Food","Cook Food","Eat Food"];
let workItemsArrayinJS = ["Do Homework"];

let newIteminJS = "";
var listCategoryinJS = "";

let todayString = dateModule.getDate();

// KitchenList Directory
app.get('/', function(req, res){
    listCategoryinJS = "Kitchen List";

    res.render('list', {listCategoryinEJS: listCategoryinJS , todayinEJS: todayString , itemsArrayinEJS: itemsArrayinJS});
    console.log(itemsArrayinJS);
});

// WorkList Directory
app.get('/work', function(req, res){
    listCategoryinJS = "Work List";
    res.render('list', {listCategoryinEJS: listCategoryinJS , todayinEJS: todayString , itemsArrayinEJS: workItemsArrayinJS});
    console.log(itemsArrayinJS);
});

app.get('/about', function(req, res){
    res.render('about')
});


// Common app.post
app.post('/', function(req, res){
    newIteminJS = req.body.newItem;

    if(req.body.addButton === "Kitchen List"){
        itemsArrayinJS.push(newIteminJS);
        res.redirect('/');
    } else if(req.body.addButton === "Work List"){
        workItemsArrayinJS.push(newIteminJS);
        res.redirect('/work');
    }

});

app.listen(3000, function(req, res){
    console.log('listening on Server 3000');
});

