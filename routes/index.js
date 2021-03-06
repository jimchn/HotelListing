var express =  require("express");
var router  =  express.Router();
var passport =  require("passport");
var User = require("../models/user");


//render

router.get("/", function(req, res){
    res.render("landing");
});


//AUTHENTICATION ROUTE

router.get("/register", function(req, res){
    res.render("register");
});

//sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Hotel BnB" + " " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login

router.get("/login", function(req, res){
    res.render("login");
});

//login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"}),
    function(req, res){
});

//logout route

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;