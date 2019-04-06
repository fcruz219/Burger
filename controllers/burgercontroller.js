var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data){
        var object = {
            burgers: data
        };
        console.log(object);
        res.render("index", object)
    })

})

module.export = router;