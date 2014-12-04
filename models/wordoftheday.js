module.exports = function(client, app) {
    var cassandra = require('cassandra-driver');
    var methods = {};

    methods.add = function(word, cb) {
        var query = "INSERT INTO WordOfTheDay (id, word, dateStarted) VALUES (?,?,?)";
        var params = [word.id, word.word, getDate()];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.update = function(word, cb) {
        var query = "UPDATE WordOfTheDay SET word=?, dateStarted=? WHERE id=?";
        var params = [word.word, getDate(), word.wordOfTheDayId];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.remove = function(id, cb) {
        var query = "DELETE FROM WordOfTheDay WHERE id=?";
        var params = [id];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.findAll = function(cb) {
        client.execute("SELECT * FROM WordOfTheDay", function (err, result) {
            cb(err, result.rows);
        });
    };

    methods.findByPK = function(id, cb) {
        var query = 'SELECT * FROM WordOfTheDay WHERE id=?';
        var params = [id];
        client.execute(query, params, {prepare: true}, function(err, result) {
            cb(err, result.rows[0]);
        });
    };

    getDate = function(){
        if (!Date.now) {
            Date.now = function() { return new Date().getTime(); };
        }

        return Date.now;
    };

    return methods;
};
