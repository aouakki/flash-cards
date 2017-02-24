var connection = require("../config/db")

var card = function() {};

card.prototype.create = function(question, answer, clb) {
    connection.query("INSERT INTO cards SET question = ? , answer = ? ", [question, answer], function(error) {
        if (error) throw error;
        clb();
    });
}



module.exports = new card();
