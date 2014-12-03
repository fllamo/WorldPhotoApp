exports.attachRoutes = function attachRoutes (router, client) {
    // var Word = require('../models/wordoftheday');
    var Word;

    // on routes Submission
    router.route('/word')
        .post(function(req, res) {
            var Word = {};

            Word.id = req.body.id;
            Word.dateStarted = req.body.dateStarted;
            Word.word = req.body.word;
            Word.submissions = req.body.submissions;

            Word.add(function(err, user) {
                if (err)
                    res.send(err);

                res.json({message: 'Word Created!'});
            });


        })

        .get(function(req, res) {
            Submission.findAll(function(err, users){
                if (err)
                    res.send(err);

                res.json(user);
            });
        });

    router.route('/word/:id')
        .put(function(req, res) {

            // use our user model to find the user we want
            Word.findById(req.params.email, function(err, user) {

                if (err)
                    res.send(err);

                Word.name = req.body.name;  // update the bears info

                // save the bear
                Word.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Word updated!' });
                });

            });

        })

        .get(function(req, res){
            Word.findById(function(err, user) {

            });

        })

        .delete(function(req, res) {
            Word.remove({
                _id: req.params.id
            }, function(err, user) {
                if (err)
                    res.send(err);

                res.json({message:'Word successfully delete'});
            });
        });

}
