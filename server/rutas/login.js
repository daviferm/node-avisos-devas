const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');

const app = express();

const url = 'http://utedevas.es/Mantenimiento/Mantenimiento.php?p=';
// const url = '';


app.get('/:id', async(req, res) => {

    var id = req.params.id;

    const respuesta = await init(id);

    res.status(200).json({
        ok: true,
        alarmas: respuesta
    })


})

async function init(id) {

    const $ = await request({
        uri: `${url}${id}`,
        transform: body => cheerio.load(body)
    });

    var regex = /\[\'([0-9]{8,})([^\]]+)]/g;
    const arrayAlarmas = $.html().match(regex);
    return arrayAlarmas;

    // const script = $('script').each((i, elem) => {
    //     var string = '';
    //     if ($(elem).html().startsWith('count')) {
    //         const alarma = $(elem).html();
    //         const obj = alarma.substr(alarma.indexOf("[") + 10, alarma.length);
    //         string += obj;
    //     }
    //     console.log(string.trim());
    // });

}

module.exports = app;