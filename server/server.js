const express = require('express');
const path = require('path');
const app = express();

// const port = process.env.PORT || 3050;
const port = 3049;


// CORS PARA CONTROLAR LAS PETICIONES QUE RECIBE NUESTRO BACKEND
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    next();
});


// Ruta de la carpeta pública
const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

const loginRoutes = require('./rutas/login');

app.use('/api', loginRoutes);

app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});