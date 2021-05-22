let http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express(),
    Posts = require('./model/posts'),
    jwt = require('jsonwebtoken'),
    jwt_middleware = require('express-jwt');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/Disney', (req, res) =>{
    res.render('Index');
});
app.get('/posts',async(req, res) =>{
    const   busca = req.query.busca,
            senha = req.query.senha,
            posts = await Posts.find(busca, senha);
    res.render('posts', {posts: posts});
    console.log(posts);
    if (posts.length != 0) {
        const token = jwt.sign({
          login: busca,
          senha: senha
        }, 'chave');
        //res.json({ token: token });
        res.redirect('index')
      }
      else {
        alert('Usuário não Encontrado');
        res.redirect('posts');
      }
});
app.get('/index', async(req, res)=>{
  res.render('principal');
});
app.get('/cadastro',async(req, res) =>{
  res.render('cadastro');
});
app.post('/cadastro',async(req, res) =>{
  const usuario = req.body.adicionar;
  const password = req.body.password;
  Posts.gravar(usuario,password);
  res.redirect('/posts');
});
app.listen(3000);
