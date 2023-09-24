const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require("./databse/database");
const Pergunta = require("./databse/Pergunta");
const Resposta = require("./databse/Respota");

//Database

connection
.authenticate()
.then(() =>{
    console.log("Conexão feita com o banco de dados")
})
.catch((msgErro) =>{
    console.log(msgErro)
})

//estou dizendo para o express usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get('/',(req, res) =>{
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC'] // ASC - para deixar Crescente || DESC - Decrescente
    ]}).then(perguntas =>{
        res.render('index',{
            perguntas: perguntas
        });
    });
     
});

app.get("/perguntar", (req, res)=>{
    res.render('perguntar')
})

//Rota que salva as pergunas feitas 
app.post("/salvarpergunta", (req, res) =>{

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    
    Pergunta.create({
       titulo: titulo,
       descricao: descricao, 
    }).then(() =>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){ //pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });                
            });
           
        }else{// não encontrada
            res.redirect("/")
        }
    });
});

app.post("/responder", (req, res)=>{
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+perguntaId)
    })
})

app.listen(8080, ()=>{console.log('app rodando na porta 8080')});