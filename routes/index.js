var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* CONSULTA */
router.get('/lista', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('lista', { title: 'Lista de Clientes', docs: docs });
  })
})

/* CADASTRO GET */
router.get('/novo', function(req, res, next) {
  res.render('novo', { title: 'Novo Cadastro', doc: {"nome":"","idade":""}, action: '/novo', erro: {} });
});

/* CADASTRO POST 
//, erro: {"nome":"","idade":""}
router.post('/novo', function(req, res) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.insert({nome, idade}, (err, result) => {
      if(err) { return console.log(err); }
      res.redirect('/lista');
  })
})*/

/* CADASTRO POST COM DUPLICIDADE */
router.post('/novo', function(req, res) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  var retorno;

  global.db.findOneByNome(nome, (e, docs) => {
    if(e) { return console.log(e); }
    if(docs.length > 0) {
      res.render('novo', { title: 'Novo Cadastro', doc: {"nome":"","idade":""}, action: '/novo', erro: {"duplicidade":"Erro de duplicidade. Tente outro nome!"} });
    } else {
      global.db.insert({nome, idade}, (err, result) => {
        if(err) { return console.log(err); }
        res.redirect('/lista');
      })
    }
  });
})

/* EDITAR GET */
router.get('/editar/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('novo', { title: 'Edição de Cliente', doc: docs[0], action: '/editar/' + docs[0]._id, erro: {} });
  });
})

/* EDITAR POST */
router.post('/editar/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.update(id, {nome, idade}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/lista');
    });
});

/* DELETE */
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/lista');
      });
});

module.exports = router;