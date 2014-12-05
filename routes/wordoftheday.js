exports.attachRoutes = function attachRoutes (router, client) {
    var Word = require('../models/wordoftheday')(client);

    // on routes word of the day
    router.route('/word')
        .post(function(req, res) {
            var word = {};

            word.id = req.body.id;
            word.word = req.body.word;
            word.datestarted = req.body.dateStarted;

            Word.add(word, function(err, word) {
                if (err) {
                    res.send(err);
                    // throw err;
                }


                res.json({message: 'Word Created!'});
            });


        })

        .get(function(req, res) {
            Word.findAll(function(err, word){
                if (err)
                    res.send(err);

                res.json(word);
            });
        });

    router.route('/word/:id')
        .put(function(req, res) {

            // use our submission model to find the submission we want
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

                res.json(word);
            });

        })

        .delete(function(req, res) {
            Word.remove(req.params.id, function(err, word) {
                if (err)
                    res.send(err);

                res.json({message:'Word successfully delete'});
            });
        });

}
