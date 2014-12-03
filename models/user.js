module.exports = function(client, app) {
    var cassandra = require('cassandra-driver');
    var methods = {};

    methods.add = function(user, cb) {
        var query = "INSERT INTO user (firstname, lastname, email) VALUES (?,?,?)";
        var params = [user.firstname, user.lastname, user.email];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.update = function(user, cb) {
        var query = "UPDATE user SET firstname=?, lastname=? WHERE email=?";
        var params = [user.firstname, user.lastname, user.email];
        client.execute(query, params, {prepare: true}, function(err) {
            cb(err, null);
        });
    };

    methods.remove = function(email, cb) {
        var query = "DELETE FROM user WHERE email=?";
        var params = [email];
        client.execute(query, params, {prepare: true}, function(err) {
            console.log('user removed');
            cb(err, null);
        });
    };

    methods.findAll = function(cb) {
        client.execute("SELECT * FROM user", function (err, result) {
            cb(err, result.rows);
        });
    };

    methods.findByPK = function(email, cb) {
        var query = 'SELECT * FROM user WHERE email=?';
        client.execute(query, [email], {prepare: true}, function(err, result) {
            cb(err, result.rows[0]);
        });
    };


    return methods;
};
