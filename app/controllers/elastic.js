'use strict';

const elasticClass = require('../server/elasticsearch');

exports.obtener = async function (req, res, next) {

    let elastic = new elasticClass();
    let query = await elastic.ejecutar(req.body);

    res.json(query);
};