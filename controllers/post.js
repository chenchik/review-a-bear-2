var db = require('../config/db');

exports.list = function(req, res) {
	
	
	
    var collection = db.get().collection('posts');
	
	//collection.find({})
    collection.find({}).toArray(function(err, results) {
        res.render('post/list', {posts: results});
    });
};

exports.listAuthor = function(req, res) {
    var collection = db.get().collection('posts');

    collection.find({"author": req.params.id}).toArray(function(err, results) {
        res.render('post/list', {posts: results});
    });
	/*var collection = db.get().collection('posts');
	console.log("hellllllo");
	console.log(req);
    collection.find({"author": req.params.id}).toArray(function(err, results) {
        res.render('post/list', {posts: results});
    });*/
};

exports.listCategory = function(req, res) {
    var collection = db.get().collection('posts');

    collection.find({"category": req.params.id}).toArray(function(err, results) {
        res.render('post/list', {posts: results});
    });
	/*var collection = db.get().collection('posts');
	console.log("hellllllo");
	console.log(req);
    collection.find({"author": req.params.id}).toArray(function(err, results) {
        res.render('post/list', {posts: results});
    });*/
};


exports.form = function(req, res) {
	
	var collection = db.get().collection('posts');
	
	collection.find({}).toArray(function(err, results) {
        res.render('post/form', {posts: results});
    });
	
	
	
//    res.render('post/form');
}

exports.search = function(req,res){
	var collection = db.get().collection('posts');
	
	
	
    collection.find({
		title: req.body.search
	}).toArray(function(err, results) {
        res.render('post/list', {posts: results});
    });
}

exports.create = function(req,res){
	
	//console.log(db.get().collection('users').find({}));
	
	/*var storage = myCustomStorage({
		destination: function (req, file, cb) {
			cb(null, '../../uploads/' + file.originalname)
		}
	});*/
	
	
	
	var collection = db.get().collection('posts');
	
	

    //note about xss and sanitization
    collection.insert({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
		content: req.body.content,
		thumbnail: req.file.originalname,
		stars: req.body.stars,
		date: req.body.date
    });

    res.redirect('/posts');
}

/*var outerCollection = db.get().collection('posts');
var allPosts = null;
	collection.find({}).toArray(function(err, results) {
        allPosts = results;
    });
*/
exports.show = function(req, res) {
    var collection = db.get().collection('posts');
	
	var allPosts = null;
	collection.find({}).toArray(function(err, results) {
        allPosts = results;
    });
	

    collection.find({"title": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('post/show', {post: results[0], posts: allPosts});
    });
};

exports.home = function(req, res){
	var collection = db.get().collection('posts');
	
	//collection.find({})
    collection.find({}).toArray(function(err, results) {
        res.render('post/list', {posts: results});
    });
}

exports.update = function(req, res) {
    var collection = db.get().collection('posts');

    //note about xss and sanitization
    collection.updateOne(
        {title: req.params.id},
        {
            $set: {
                 title: req.body.title,
				author: req.body.author,
				category: req.body.category,
				content: req.body.content,
				thumbnail: req.file.originalname,
				stars: req.body.stars,
				date: req.body.date
            }
        }
    );
	
	console.log();

    res.redirect('/posts');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('posts');

    //note about xss and sanitization
    collection.removeOne({
        title: req.params.id
    });

    return res.redirect('/posts');
};