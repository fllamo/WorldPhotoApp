module.exports = function(client, app) {
    var cassandra = require('cassandra-driver');
    var methods = {};

    methods.add = function(sub, cb) {
        var query = "INSERT INTO submission (id, wordOfTheDayId, userEmail, linkToImage, timestamp) VALUES (?,?,?,?)";
        var params = [sub.id, sub.wordOfTheDayId, sub.userEmail, sub.linkToImage, getDate()];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.update = function(sub, cb) {
        var query = "UPDATE submission SET wordOfTheDayId=?, userEmail=?, linkToImage=?, timestamp=? WHERE id=?";
        var params = [sub.wordOfTheDayId, sub.userEmail, sub.linkToImage, getDate(), sub.id];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.voteUp = function(id, cb) {
        var query = "UPDATE submission SET votesFor = votesFor + 1 WHERE id=?";
        var params = [id];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.remove = function(id, cb) {
        var query = "DELETE FROM submission WHERE id=?";
        var params = [id];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.findAll = function(cb) {
        client.execute("SELECT * FROM submission", function (err, result) {
            cb(err, result.rows);
        });
    };

    methods.findByPK = function(id, cb) {
        var query = 'SELECT * FROM submission WHERE id=?';
        client.execute(query, [id], {prepare: true}, function(err, result) {
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
