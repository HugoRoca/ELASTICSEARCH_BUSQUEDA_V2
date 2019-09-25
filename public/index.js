'use strict';

const elastic = (() => {
    const _element = {
        txtTextoBusqueda: $('#txtTextoBusqueda'),
        chkTextoBusqueda: $('#chkTextoBusqueda'),
        chkMarcas: $('#chkMarcas'),
        chkCategorias: $('#chkCategorias'),
        chkLineas: $('#chkLineas'),
        chkGrupoArticulo: $('#chkGrupoArticulo'),
        chkNgram: $('#chkNgram'),
        chkPhonetic: $('#chkPhonetic'),
        chkSinonimos: $('#chkSinonimos'),
        chkAnd: $('#chkAnd'),
        btnBuscar: $('#btnBuscar'),
        btnLimpiar: $('#btnLimpiar'),
        tblLista: $('#tblLista')
    }

    const _util = {
        pintar: (data) => {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];

            }
        }
    }

    const _model = {
        elastic: () => {
            return {
                texto: _element.txtTextoBusqueda.val(),
                campo: {
                    textoBusqueda: _element.chkTextoBusqueda.is(':checked'),
                    marca: _element.chkMarcas.is(':checked'),
                    categoria: _element.chkCategorias.is(':checked'),
                    linea: _element.chkLineas.is(':checked'),
                    grupoArticulo: _element.chkGrupoArticulo.is(':checked')
                },
                analizador: {
                    ngram: _element.chkNgram.is(':checked'),
                    phonetic: _element.chkPhonetic.is(':checked'),
                    sinonimo: _element.chkSinonimos.is(':checked')
                },
                operador: {
                    and: _element.chkAnd.is(':checked')
                }
            }
        }
    }

    const _service = {
        elastic: (data) => {
            return $.ajax({
                url: '/elastic',
                type: 'POST',
                data: data
            });
        }
    }

    const _evento = {
        buscar: () => {
            _element.btnBuscar.click(() => {
                let success = (r) => {
                    console.log('dataaaaa', r);
                }

                let data = _model.elastic();

                _service.elastic(data).then(success, (e) => {
                    console.log('error', e);
                })
            });
        }
    }

    const init = (() => {
        console.log('funcionando');
        _evento.buscar();
    });

    return {
        init: init
    }

})();

(() => {
    elastic.init();
})();