var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        //console.log(hbsObject);
        res.render('index', hbsObject)
    })

});

router.post("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name",], [req.body.burger_name,], function (data) {
            res.redirect('/');
        })
})

router.put('/api/burgers/:id', function (req, res) {
    var condition = 'id = ' + req.params.id;
    console.log(req.body)
    // console.log("condition", condition);
    burger.updateOne({
        devoured: true
    }, condition, function (results) {
        if (results.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } 
        else {
            res.status(200).end();
          }
    });
});


module.exports = router;