var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db = require('./config/db');
var user = require('./controllers/user');
var post = require('./controllers/post');
//var multer = require('multer');
var multer = require('multer');

var path = require('path');

    var options = multer.diskStorage({ destination : './uploads/' ,
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    });

    var upload= multer({ storage: options });

    

//var upload = multer({dest: 'uploads/'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
//app.use(multer({dest:'./uploads/'}));

app.set('view engine', 'ejs');

app.get('/', post.home); //homepage

app.get('/users', user.list); //list page
app.get('/posts', post.list); //list page

app.get('/user/new', user.form); //new action
app.get('/post/new', post.form); //new action

//app.get('/user/:username', users.update);
app.post('/users', user.create); //new action
app.post('/posts', upload.single('thumbnail'), post.create); //new action

app.post('/users/:id', user.update); //edit action
app.post('/posts/:id', upload.single('thumbnail'), post.update); //edit action


app.get('/users/:id', user.show); //edit form
app.get('/posts/:id', post.show); //edit form


app.get('/users/delete/:id', user.remove); //delete action
app.get('/posts/delete/:id', post.remove); //delete action

app.get('/author/:id', post.listAuthor); //list author action
app.get('/category/:id', post.listCategory); //list author action

app.post('/search', post.search); //list author action



db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(8080, function() {
        console.log("Express started...");
    });
});
