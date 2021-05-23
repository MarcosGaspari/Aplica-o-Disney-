let http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express(),
    Posts = require('./model/posts');


 

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(session({
  secret: 'session_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));
app.use(cookieParser('session_secret'));



app.get('/Disney', (req, res) =>{
    res.render('Index');
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
  res.redirect('/login');
});

app.get('/login',async(req, res) =>{
  res.render('login');
});

app.post('/login',async(req, res) =>{
  const usuario = req.body.login;
  const password = req.body.password;
  if(await Posts.logar(usuario,password) == true){
    req.session.login = usuario;
    res.redirect('/index');
  }
  else{
    res.send('dados de login nao encontrados');
    res.end();
  }

  
});



app.listen(3000);
