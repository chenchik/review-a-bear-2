var db = require('../config/db');

exports.list = function(req, res) {
    var collection = db.get().collection('users');

    collection.find({}).toArray(function(err, results) {
        res.render('user/list', {users: results});
    });
};

exports.home = function(req, res) {
    var collection = db.get().collection('users');

    collection.find({}).toArray(function(err, results) {
        res.render('user/home');
    });
};

exports.show = function(req, res) {
    var collection = db.get().collection('users');

    collection.find({"username": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('user/show', {user: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.updateOne(
        {username: req.params.id},
        {
            $set: {
                username: req.body.username,
                name: req.body.name,
                link: req.body.link
            }
        }
    );

    res.redirect('/users');
};

exports.form = function(req, res) {
    res.render('user/form');
}

/*exports.save = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.({
        username: req.body.username,
        name: req.body.name,
        link: req.body.link
    });

    res.redirect('/users');
};*/

exports.create = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.insert({
        username: req.body.username,
        name: req.body.name,
        link: req.body.link
    });

    res.redirect('/users');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.removeOne({
        username: req.params.id
    });

    return res.redirect('/users');
};
