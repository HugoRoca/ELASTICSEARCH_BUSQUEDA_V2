'use strict';

const queryElasticsearch = {
    query: (texto, cTextoBusqueda, cMarcas, cCategorias, cLineas, cGrupoArticulo, cSeccion, cCuv, synonym, ngram, phonetic, operatorAnd) => {

        let campoTextoBusqueda = {
            default: 'textoBusqueda^20',
            synonym: 'textoBusqueda.synonym^15',
            ngram: 'textoBusqueda.ngram^12',
            phonetic: 'textoBusqueda.phonetic^10'
        };

        let campoMarcas = {
            default: 'marcas^8',
            synonym: 'marcas.synonym^6',
            ngram: 'marcas.ngram',
            phonetic: 'marcas.phonetic^4'
        };

        let campoCategorias = {
            default: 'categorias^8',
            synonym: 'categorias.synonym^6',
            ngram: 'categorias.ngram',
            phonetic: 'categorias.phonetic^4'
        };

        let campoLineas = {
            default: 'lineas^8',
            synonym: 'lineas.synonym^6',
            ngram: 'lineas.ngram',
            phonetic: 'lineas.phonetic^2'
        };

        let campoGrupoArticulos = {
            default: 'grupoArticulos^8',
            synonym: 'grupoArticulos.synonym^8',
            ngram: 'grupoArticulos.ngram',
            phonetic: 'grupoArticulos.phonetic^6'
        };

        let campoSeccion = {
            default: 'seccion1^8',
            synonym: 'seccion1.synonym^6',
            ngram: 'seccion1.ngram',
            phonetic: 'seccion1.phonetic^4'
        };

        let campoCuv = {
            default: 'default'
        };

        let fields = [];

        if (cTextoBusqueda) {
            fields.push(campoTextoBusqueda.default);
            if (synonym) fields.push(campoTextoBusqueda.synonym);
            if (phonetic) fields.push(campoTextoBusqueda.phonetic);
            if (ngram) fields.push(campoTextoBusqueda.ngram);
        }

        if (cMarcas) {
            fields.push(campoMarcas.default);
            if (synonym) fields.push(campoMarcas.synonym);
            if (phonetic) fields.push(campoMarcas.phonetic);
            if (ngram) fields.push(campoMarcas.ngram);
        }

        if (cCategorias) {
            fields.push(campoCategorias.default);
            if (synonym) fields.push(campoCategorias.synonym);
            if (phonetic) fields.push(campoCategorias.phonetic);
            if (ngram) fields.push(campoCategorias.ngram);
        }

        if (cLineas) {
            fields.push(campoLineas.default);
            if (synonym) fields.push(campoLineas.synonym);
            if (phonetic) fields.push(campoLineas.phonetic);
            if (ngram) fields.push(campoLineas.ngram);
        }

        if (cGrupoArticulo) {
            fields.push(campoGrupoArticulos.default);
            if (synonym) fields.push(campoGrupoArticulos.synonym);
            if (phonetic) fields.push(campoGrupoArticulos.phonetic);
            if (ngram) fields.push(campoGrupoArticulos.ngram);
        }

        if (cSeccion) {
            fields.push(campoSeccion.default);
            if (synonym) fields.push(campoSeccion.synonym);
            if (phonetic) fields.push(campoSeccion.phonetic);
            if (ngram) fields.push(campoSeccion.ngram);
        }

        if (cCuv) {
            fields.push(campoCuv.default);
        }

        let multi_match = {
            query: texto,
            type: "best_fields",
            fields
        }

        if (operatorAnd) multi_match['operator'] = 'and';

        return multi_match;
    }
};

module.exports = queryElasticsearch;