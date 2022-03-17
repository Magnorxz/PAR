const express = require('express');
const app = express();
const fs = require('fs');
const uuid = require('uuid');
const db = require('./db.json');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

app.get('/tickets', (req, res) => {
    res.send(db.tickets);
});

app.get('/ticket/:id', (req, res) => {
    res.send(db.tickets.find(elemento => elemento.id == req.params.id));
});

app.post('/nueva', (req, res) => {
    const { cliente, solicitud } = req.body;
    const otratarea = {
        id: uuid.v4(), cliente, solicitud, fecha: randomDate(new Date(2012, 0, 1), new Date()), terminada: false,
    };
    db.tickets.push(otratarea);
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2), () => { });
    res.redirect("/");

});

app.get('/actualizaticket/:id/:completada', (req, res) => {
    const terminada = db.tickets.find(elemento => elemento.id == req.params.id);
    terminada.completada = req.params.completada == 'true';
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2), () => { });
    res.end();
});


app.get('/borraticket/:id', (req, res) => {
    db.tickets.splice(db.tickets.findIndex(elemento => elemento.id == req.params.id), 1);
});

app.post('/editar', (req, res) => {
    const { cliente, solicitud, fecha, completada, id } = req.body;
    const edticket = db.tickets.find(elemento => elemento.id == id);
    edticket.cliente = cliente;
    edticket.solicitud = solicitud;
    edticket.fecha = fecha;
    edticket.completada = completada == 'on';
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2), () => { });
    res.redirect("/");
    res.end();
});
app.listen(3000);

