exports.attachRoutes = function attachRoutes (router) {
    // var User = require('../models/user');
    var User;

    // on routes Users
    router.route('/user')
        .post(function(req, res) {
            var user = {};

            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.email = req.body.email;

            User.add(function(err, user) {
                if (err)
                    res.send(err);

                res.json({message: 'User Created!'});
            });


        })

        .get(function(req, res) {
            User.findAll(function(err, users){
                if (err)
                    res.send(err);

                res.json(user);
            });
        });

    router.route('/user/:email')
        .put(function(req, res) {

            // use our user model to find the user we want
            User.findById(req.params.email, function(err, user) {

                if (err)
                    res.send(err);

                user.name = req.body.name;  // update the bears info

                // save the bear
                user.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'User updated!' });
                });

            });

        })

        .get(function(req, res){
            User.findByEmail(function(err, user) {

            });

        })

        .delete(function(req, res) {
            User.remove({
                _email: req.params.email
            }, function(err, user) {
                if (err)
                    res.send(err);

                res.json({message:'User successfully delete'});
            });
        });

}
