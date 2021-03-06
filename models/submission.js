module.exports = function(client, app) {
    var cassandra = require('cassandra-driver');
    var methods = {};

    methods.add = function(sub, cb) {
        var query = "INSERT INTO submission (id, wordofthedayid, useremail, linktoimage, timestamp, votesFor) VALUES (?,?,?,?,?,?)";
        var date  = getDate();
        var params = [sub.id, sub.wordOfTheDayId, sub.userEmail, sub.linkToImage, parseInt(date), 0];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.update = function(sub, cb) {
        var query = "UPDATE submission SET wordofthedayid=?, useremail=?, linktoimage=?, timestamp=? WHERE id=?";
        var date  = getDate();
        var params = [sub.wordOfTheDayId, sub.userEmail, sub.linkToImage, parseInt(date), sub.id];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.voteUp = function(sub, cb) {
        var votesfor = ++sub.votesfor;
        var query = "UPDATE submission SET votesfor=? WHERE id=?";
        var params = [votesfor, sub.id];
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
        var query = 'SELECT * FROM Submission WHERE id=?';
        client.execute(query, [id], {prepare: true}, function(err, result) {
            cb(err, result.rows[0]);
        });
    };

    methods.findByWordofTheDay = function(id, cb) {
        var query = 'SELECT * FROM Submission WHERE wordOfTheDayId=?';
        client.execute(query, [id], {prepare: true}, function(err, result) {
            cb(err, result.rows);
        });
    };

    methods.findByUser = function(email, cb) {
        var query = 'SELECT * FROM Submission WHERE userEmail=?';
        client.execute(query, [email], {prepare: true}, function(err, result) {
            cb(err, result.rows);
        });
    };

    getDate = function(){
        if (!Date.now) {
            Date.now = function() { return new Date().getTime(); };
        }

        return Date.now();
    };

    return methods;
};
