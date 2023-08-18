const express = require('express');
const {methods: joyasControllers} = require('./joyas.controllers');
const app = express();

app.get("/joyas", async (req, res) => {
    try {
        const results = await joyasControllers.obtenerJoyas(req.query)
        res.status(200).json(results)
    } catch(err) {
        res.status(500).json({message: err})
    }
})

app.get("/joyas/filtros", async(req, res) => {
    try {
        const results = await joyasControllers.obtenerJoyasPorFiltro(req.query);
        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({message: err})
    }
})

app.listen(3000, ()=> {
    console.log("Servidor corriendo en el puerto 3000")
});
