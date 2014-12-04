module.exports = function(client, app) {
    var cassandra = require('cassandra-driver');
    var methods = {};


    methods.add = function(word, cb) {
        var query = "INSERT INTO wordoftheday (id, word, datestarted) VALUES (?,?,?)";
        var params = [word.id, word.word, parseInt(word.datestarted)];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.update = function(word, cb) {
        var query = "UPDATE wordoftheday SET word=? WHERE id=?";
        var params = [word.word, word.id];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.remove = function(id, cb) {
        var query = "DELETE FROM wordoftheday WHERE id=?";
        var params = [id];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.findAll = function(cb) {
        client.execute("SELECT * FROM wordoftheday", function (err, result) {
            cb(err, result.rows);
        });
    };

    methods.findByPK = function(id, cb) {
        var query = 'SELECT * FROM wordoftheday WHERE id=?';
        var params = [id];
        client.execute(query, params, {prepare: true}, function(err, result) {
            cb(err, result.rows[0]);
        });
    };

    return methods;
};
