const express = require('express');
//const cors = require("cors")
const app = express();

app.use(express.json());
//app.use(cors());
app.listen( process.env.PORT ||  3000);


app.get('/', function(req, res){
    console.log("Acessando /");
    res.send('Hello world')});

/*
  Servidor propriamente dito
*/

const notes = [
    {id: 0, name: "Luis", gender : "Homem", adult : "true"},
    {id: 1, name: "Luiz", gender : "Mulher", adult : true}
]

const endpoint = "/notes";

app.get(endpoint, function(req, res){
    res.send(notes.filter(Boolean));
});

app.get(`${endpoint}/:id`, function(req, res){
    const id = req.params.id;
    const note = notes[id];

    if (!note){
        res.send("{}");
    } else {
        res.send(note);
    }   
});

app.post(endpoint, (req, res) => {
    const note = {
        id : notes.length,
        name : req.body["name"],
        gender : req.body["gender"],
        adult : req.body["adult"]
    };
    notes.push(note);
    res.send("1");

});

app.put(`${endpoint}/:id`, (req, res) =>{
    const id = parseInt(req.params.id);
    const note = {
        id : id,
        name : req.body["name"],
        gender : req.body["gender"],
        adult : req.body["adult"]
    };

    notes[id] = note;
    res.send("1");

});

app.delete(`${endpoint}/:id`, (req, res) => {
    const id = req.params.id;
    delete notes[id];
    res.send("1");

});
