'use strict';

const queryElasticsearch = {
    query: (texto, cTextoBusqueda, cMarcas, cCategorias, cLineas, cGrupoArticulo, cSeccion, cCuv, synonym, ngram, phonetic) => {

        let campoTextoBusqueda = {
            default: "textoBusqueda^20",
            synonym: "textoBusqueda.synonym^15",
            ngram: "textoBusqueda.ngram^12",
            phonetic: "textoBusqueda.phonetic^10"
        };

        let campoMarcas = {
            default: "marcas^8",
            synonym: "marcas.synonym^6",
            ngram: "marcas.ngram",
            phonetic: "marcas.phonetic^4"
        };

        let campoCategorias = {
            default: "categorias^8",
            synonym: "categorias.synonym^6",
            ngram: "categorias.ngram",
            phonetic: "categorias.phonetic^4"
        };

        let campoLineas = {
            default: "lineas^8",
            synonym: "lineas.synonym^6",
            ngram: "lineas.ngram",
            phonetic: "lineas.phonetic^2"
        };

        let campoGrupoArticulos = {
            default: "grupoArticulos^8",
            synonym: "grupoArticulos.synonym^8",
            ngram: "grupoArticulos.ngram",
            phonetic: "grupoArticulos.phonetic^6"
        };

        let campoSeccion = {
            default: "seccion1^8",
            synonym: "seccion1.synonym^6",
            ngram: "seccion1.ngram",
            phonetic: "seccion1.phonetic^4"
        };

        let campoCuv = ["cuv"];

        let fields = [];

        if (cTextoBusqueda) {
            fields.push(campoCategorias.default);
            if (synonym) fields.push(campoCategorias.synonym);
            if (phonetic) fields.push(campoCategorias.phonetic);
            if (ngram) fields.push(campoCategorias.ngram);
        }

        return {
            multi_match: {
                query: texto,
                type: "best_fields",
                fields
            }
        }
    }
};

module.exports = queryElasticsearch;