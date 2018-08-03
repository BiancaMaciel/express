/* Parte 1 */
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');


var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

/* Parte 2 */
var users = [
    {
        id: 1, 
        name: 'maria',
        password: 'maria123'
    },
    {
        id: 2, 
        name: 'joao',
        password: 'joao123'
    }
]

/* Parte 3 */
var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'minhaChaveSecreta'
}

/* Parte 4 */

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
    var user = users.find(user => user.id === jwt_payload.id);
    if(user){
        next(null, user);
    }else{
        next(null, false);
    }
});

passport.use(strategy);//resgistra nossa estrategia


/* Parte 5 */
var app = express();
app.use(passport.initialize());
app.use(bodyParser.json());

/* Parte 6 */
app.post('/', function(req, res){
    var name = req.body.name,
        password = req.body.password,
        user = users.find(user => user.name === name);
    
    if(user && (user.password === password)){
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: 'ok', token});
    }else{
        res.status(401).json({message: 'erro de autenticacao'});
    }
})

/* Parte 7 */
app.get('/', passport.authenticate('jwt', {session: false}), function(req, res){
    res.json({message:'Sucesso! Voce acessou uma rota privada!'});
})


/* Parte 8 */
app.listen(3005, function(){
    console.log('express rodando');
});




























