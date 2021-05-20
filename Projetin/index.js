let http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express(),
    Posts = require('./model/posts'),
    Cadastro = require('./model/posts');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/Disney', (req, res) =>{
    res.render('Index');
});
app.get('/posts',async(req, res) =>{
    const   busca = req.query.busca,
            senha = req.query.senha,
            posts = await Posts.find(busca, senha);
    res.render('posts', {posts: posts});
});
app.post('/cadastro',async(req, res) =>{
    const adicionar = req.body.adicionar;
    const password = req.body.password;
    Cadastro.insert(adicionar,password);
});
app.listen(3000);