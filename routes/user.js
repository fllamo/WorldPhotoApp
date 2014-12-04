exports.attachRoutes = function attachRoutes (router, client) {
    var User = require('../models/user')(client);

    // on routes Users
    router.route('/user')
        .post(function(req, res) {
            var user = {};

            user.firstname = req.body.firstName;
            user.lastname = req.body.lastName;
            user.email = req.body.email;

            User.add(user, function(err, user) {
                if (err)
                    res.send(err);

                res.json({message: 'User Created!'});
            });


        })

        .get(function(req, res) {
            User.findAll(function(err, users){
                if (err)
                    res.send(err);

                res.json(users);
            });
        });

    router.route('/user/:email')
        .put(function(req, res) {

            // use our user model to find the user we want
            User.findByPK(req.params.email, function(err, user) {

                if (err)
                    res.send(err);

                user.firstname = req.body.firstName || user.firstname;
                user.lastname = req.body.lastName || user.lastname;

                // update the user
                User.update(user, function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'User updated!' });
                });

            });

        })

        .get(function(req, res){
            User.findByPK(req.params.email, function(err, user) {
                if (err)
                    res.send(err);

                res.json(users);
            });

        })

        .delete(function(req, res) {
            User.remove(req.params.email, function(err, user) {
                if (err)
                    res.send(err);

                res.json({message:'User successfully delete'});
            });
        });

}
