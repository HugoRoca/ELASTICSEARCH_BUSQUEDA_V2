'use strict';

const elastic = require('elasticsearch');
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
}