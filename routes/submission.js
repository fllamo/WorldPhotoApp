exports.attachRoutes = function attachRoutes (router) {
    // var Submission = require('../models/submission');
    var Submission;

    // on routes Submission
    router.route('/submission')
        .post(function(req, res) {
            var submission = {};

            submission.id = req.body.firstname;
            submission.wordOfTheDayId = req.body.lastname;
            submission.userEmail = req.body.userEmail;
            submission.timestamp = req.body.timestamp;
            submission.votesFor = req.body.votesFor;
            submission.linkToImage = req.body.linkToImage;

            Submission.add(function(err, user) {
                if (err)
                    res.send(err);

                res.json({message: 'Submission Created!'});
            });


        })

        .get(function(req, res) {
            Submission.findAll(function(err, users){
                if (err)
                    res.send(err);

                res.json(user);
            });
        });

    router.route('/submission/:id')
        .put(function(req, res) {

            // use our user model to find the user we want
            Submission.findById(req.params.email, function(err, user) {

                if (err)
                    res.send(err);

                user.name = req.body.name;  // update the bears info

                // save the bear
                user.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Submission updated!' });
                });

            });

        })

        .get(function(req, res){
            Submission.findById(function(err, user) {

            });

        })

        .delete(function(req, res) {
            Submission.remove({
                _id: req.params.id
            }, function(err, user) {
                if (err)
                    res.send(err);

                res.json({message:'Submission successfully delete'});
            });
        });

}
