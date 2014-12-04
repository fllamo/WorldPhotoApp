exports.attachRoutes = function attachRoutes (router, client) {
    var Submission = require('../models/submission')(client);

    // on routes Submission
    router.route('/submission')
        .post(function(req, res) {
            var submission = {};

            submission.id = req.body.id;
            submission.wordOfTheDayId = req.body.wordOfTheDayId;
            submission.userEmail = req.body.userEmail;
            submission.timestamp = req.body.timestamp || 0;
            submission.votesFor = req.body.votesFor || 0;
            submission.linkToImage = req.body.linkToImage;

            Submission.add(submission, function(err, submission) {
                if (err) {
                    res.send(err);
                    // throw err;
                }


                res.json({message: 'Submission Created!'});
            });

        })

        .get(function(req, res) {
            Submission.findAll(function(err, submission){
                if (err)
                    res.send(err);

                res.json(submission);
            });
        });

    router.route('/submission/:id')
        .put(function(req, res) {

            // use our submission model to find the submission we want
            Submission.findByPK(req.params.id, function(err, submission) {

                if (err)
                    res.send(err);

                submission.wordOfTheDayId = req.body.wordOfTheDayId || submission.wordOfTheDayId;
                submission.userEmail = req.body.userEmail || submission.userEmail;
                submission.linkToImage = req.body.linkToImage || submission.linkToImage;

                // save the submission
                Submission.update(submission, function(err) {
                    if (err) {
                        res.send(err);
                        throw err;
                    }

                    res.json({ message: 'Submission updated!' });
                });

            });

        })

        .get(function(req, res){
            Submission.findByPK(req.params.id, function(err, submission) {
                if (err)
                    res.send(err);

                res.json(submission);
            });

        })

        .delete(function(req, res) {
            Submission.remove(req.params.id, function(err, submission) {
                if (err)
                    res.send(err);

                res.json({message:'Submission successfully delete'});
            });
        });

    router.route('/submission/vote/:id')
        .put(function(req, res) {

            // use our submission model to find the submission we want
            Submission.findByPK(req.params.id, function(err, submission) {

                if (err)
                    res.send(err);

                // save the submission
                Submission.voteUp(req.params.id, function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Submission vote counted!' });
                });

            });

        });

}
