const express = require('express');
const app = express();
const https = require('https');

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(express.static("public"));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/" , function(req,res){
    const firstName = req.body.firstName;
    const surname = req.body.surname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : surname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = 'https://us21.api.mailchimp.com/3.0/lists/e9f3b20cef';
    const options = {
        method: "POST",
        auth : "erenguney:12312312311af4f722770a6dea7cfb10-us21"
    }

    const request = https.request(url, options, function(responseFromMailchimp){
        if (responseFromMailchimp.statusCode === 200){
            res.sendFile(__dirname + "/success.html");

        }

        else{
            res.sendFile(__dirname + "/failure.html");
        }

        responseFromMailchimp.on("data", function(data){
            console.log(JSON.parse(data));
            console.log(responseFromMailchimp.statusCode);
        });
    });

    request.write(jsonData);

    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(3000, function(){
    console.log("Server is running");
})




