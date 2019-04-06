var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject)
    })

});

router.post("/burgers", function(req, res){
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(data){
        res.redirect('/');
    })
})

module.exports = router;