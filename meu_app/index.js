var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const PORT = 3500;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');


function myMiddleware(req, res, next){
   req.body.message = "Intercepted by middleware";
   next();
}
app.use(myMiddleware);


app.get('/', function(req, res){
   res.send('Hello World');
})

app.post('/teste', function(req, res){
   var myJson = req.body;
   res.format({
      text: function(){
         res.send('Just Text');
      },
      json: function(){
         myJson.reqType = 'JSON';
         res.json(myJson);
      }
   })
})

app.get('/alunos', function(req, res){
   var alunos = [
      {nome: 'Maria'},
      {nome: 'João'},
      {nome: 'Bárbara'}
   ]
   res.render('alunos', {titulo: 'TreinaWeb', alunos})
})


app.listen(PORT);
console.log(`Server on port ${PORT}`);

