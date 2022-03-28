require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const app =express();
const html = require('html');
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://cef:4IawUVA1ssVsgHsZ@cluster0.0a2o9.mongodb.net/NewsletterDB");

const NewsletterSchema = {
    email: String
}

const Newsletter = mongoose.model("newsletter",NewsletterSchema);

app.use(express.static("TheEvent"));
app.use(express.json())
app.set("view engine",'html');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/TheEvent/index_civista.html");
});

app.get("/success",function(req,res){
    res.sendFile(__dirname + '/TheEvent/success_civista.html');
    console.log("Success");
});

app.get("/failure",function(req,res){
    res.sendFile(__dirname + "/TheEvent/failed_civista.html");
    console.log("Failure");
});

app.post("/",function(req,res){

    let mailTransporter = nodemailer.createTransport({

        service: "gmail",
        auth:{
            // Go to this .env File and change that details there from senders email
            user: "ceftestmail@gmail.com",
            pass: "cef@1bbs"
        }
    });

    let details = {
        from: "ceftestmail@gmail.com",
        to: "ceftestmail@gmail.com",
        subject: req.body.subject,
        text: "Name: "+req.body.name +"\n"+" my email is: "+req.body.email + "\n" +"My message is: " + req.body.message
    }

    mailTransporter.sendMail(details,(err)=>{

        if(err){
            console.log("It Has error = " + err);
            res.redirect("/failure");
        }
        else{
            res.redirect("/success");
        }

    });


});

app.post("/newsletter",function(req,res){

    const email = req.body.newsEmail;

    const newsletter = new Newsletter({
        email: email
    });

    newsletter.save();

    res.sendFile(__dirname + "/views/newsletterSuccess.html");

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port,function(req,res){
    console.log("Server has Started Successfully ");
});