exports.attachRoutes = function attachRoutes (router, client) {
    var Word = require('../models/wordoftheday')(client);

    // on routes Submission
    router.route('/word')
        .post(function(req, res) {
            var Word = {};

            Word.id = req.body.id;
            Word.word = req.body.word;

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
            Word.findByPK(req.params.id, function(err, word) {

                if (err)
                    res.send(err);

                word.word = req.body.word || word.word;  // update the words info

                // save the word
                Word.update(word, function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Word updated!' });
                });

            });

        })

        .get(function(req, res){
            Word.findByPK(req.params.id, function(err, word) {
                if (err)
                    res.send(err);

                res.json(users);
            });

        })

        .delete(function(req, res) {
            Word.remove(req.params.id, function(err, user) {
                if (err)
                    res.send(err);

                res.json({message:'Word successfully delete'});
            });
        });

}
