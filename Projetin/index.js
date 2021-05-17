let http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express(),
    Posts = require('./model/posts');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/Disney', (req, res) =>{
    res.render('Index');
});
app.get('/posts',async(req, res) =>{
    const posts = await Posts.find();
    res.render('posts', {posts: posts});
})
app.listen(3000);