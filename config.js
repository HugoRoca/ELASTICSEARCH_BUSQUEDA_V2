'use strict';

const config = {
    app: {
        port: 2705
    },
    elastic: {
        host: 'https://vpc-es-sbsearch2-prd-zy7ytdwgfleiwpive3meis5lzy.us-east-1.es.amazonaws.com',
        index: 'producto_v2_co_201914',
        type: '_doc'
    }
}

module.exports = config;