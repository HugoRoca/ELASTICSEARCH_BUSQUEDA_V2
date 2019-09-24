'use strict';

exports.obtener = ((req, res, next)=>{
    console.log('listo!');
    res.json({"listo":"listo"});
});