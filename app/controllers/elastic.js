'use strict';

const elasticClass = require('../server/elasticsearch');

exports.obtener = async function (req, res, next) {
    console.log(req.body);
    let elastic = new elasticClass();
    let query = elastic.test();
    res.json(query);
};