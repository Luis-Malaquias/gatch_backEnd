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

const profiles = [
    {id: 0, name: "Luis", gender : "Homem", adult : "true"},
    {id: 1, name: "Luiz", gender : "Mulher", adult : true}
]

const endpoint = "/profiles";

app.get(endpoint, function(req, res){
    res.send(profiles.filter(Boolean));
});

app.get(`${endpoint}/:id`, function(req, res){
    const id = req.params.id;
    const profile = profiles[id];

    if (!profile){
        res.send("{}");
    } else {
        res.send(profile);
    }   
});

app.post(endpoint, (req, res) => {
    const profile = {
        id : profiles.length,
        name : req.body["name"],
        gender : req.body["gender"],
        adult : req.body["adult"]
    };
    profiles.push(profile);
    res.send("1");

});

app.put(`${endpoint}/:id`, (req, res) =>{
    const id = parseInt(req.params.id);
    const profile = {
        id : id,
        name : req.body["name"],
        gender : req.body["gender"],
        adult : req.body["adult"]
    };

    profiles[id] = profile;
    res.send("1");

});

app.delete(`${endpoint}/:id`, (req, res) => {
    const id = req.params.id;
    delete profiles[id];
    res.send("1");

});
