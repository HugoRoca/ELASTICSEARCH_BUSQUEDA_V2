'use strict';

const elasticClass = require('../server/elasticsearch');

exports.obtener = ((req, res, next)=>{
    let elastic = new elasticClass();
        let query = elastic.test();
    res.json(query);
});