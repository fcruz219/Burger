var connection = require("../config/connection.js");

// Helper function for generating MySQL syntax
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
            arr.push(key + "=" + ob[key]);
        }
    

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {

    selectAll: function (table, cb) {

        var queryString = "SELECT * FROM " + table + ";";

        connection.query(queryString, function (err, results) {
            if (err) throw err
            cb(results)
        })
    },
    insertOne: function (table, col, val, cb) {

        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += col.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(val.length);
        queryString += ") ";

        console.log(queryString)

        connection.query(queryString, val, function (err, result) {
            if (err) throw err

            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
		// Construct the query string that updates a single entry in the target table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// console.log(queryString);

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	}
};
module.exports = orm;
