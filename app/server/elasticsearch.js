'use strict';

const elastic = require('elasticsearch');
const queryElastic = require('../utils/queryElasticsearch');
const config = require('../../config');

module.exports = class Elasticsearch {

    constructor() {
        this.client = elastic.Client({
            host: config.elastic.host,
            log: ''
        });
    }

    async ejecutar(body) {
        console.log(body);
        let multi_match = queryElastic.query(
            body.texto,
            body.campo.textoBusqueda === 'true',
            body.campo.marca === 'true',
            body.campo.categoria === 'true',
            body.campo.linea === 'true',
            body.campo.grupoArticulo === 'true',
            body.campo.seccion === 'true',
            false,
            body.analizador.sinonimo === 'true',
            body.analizador.ngram === 'true',
            body.analizador.phonetic === 'true',
            body.operador.and === 'true'
        );

        let query = {
            bool: {
                must: [
                    {
                        multi_match
                    },
                    {
                        terms: {
                            "codigoConsultora": [
                                "9906161462",
                                "YYYYYYYYY",
                                "000000000"
                            ]
                        }
                    }
                ]
            }
        }

        let bodyPost = {
            query,
            size: 40
        }

        console.log(JSON.stringify(bodyPost));

        return await this.client.search({
            index: config.elastic.index,
            type: config.elastic.type,
            body: bodyPost
        });
    }

    test() {
        let multi_match = queryElastic.query('buscando', true, false, false, false, false, false, false, true, true, true, false);
        let query = {
            bool: {
                must: {
                    multi_match
                }
            }
        }
        return {
            query,
            size: 40
        };
    }
}