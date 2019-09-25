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
        return await this.client.search({
            index: config.elastic.index,
            type: config.elastic.type,
            body: body
        });
    }

    test(){
        let multi_match = queryElastic.query('buscando',true,false,false,false,false,false,false,true,true,true,false);
        let query = {
            bool:{
                must:{
                    multi_match
                }
            }
        }
        return query;
    }
}