'use strict';

const elastic = (() => {
    const _element = {
        txtTextoBusqueda: $('#txtTextoBusqueda'),
        chkTextoBusqueda: $('#chkTextoBusqueda'),
        chkMarcas: $('#chkMarcas'),
        chkCategorias: $('#chkCategorias'),
        chkLineas: $('#chkLineas'),
        chkGrupoArticulo: $('#chkGrupoArticulo'),
        chkSeccion: $('#chkSeccion'),
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
            let tabla = '';

            for (let i = 0; i < data.length; i++) {
                const score = data[i]._score;
                const element = data[i]._source;
                tabla += '<tr>';
                tabla += `<th scope="row">${i + 1}</th>`;
                tabla += `<td>${score}</td>`;
                tabla += `<td>${element.textoBusqueda}</td>`;
                tabla += `<td>${JSON.stringify(element.marcas)}</td>`;
                tabla += `<td>${JSON.stringify(element.categorias)}</td>`;
                tabla += `<td>${JSON.stringify(element.lineas)}</td>`;
                tabla += `<td>${JSON.stringify(element.grupoArticulos)}</td>`;
                tabla += `<td>${element.seccion1}</td>`;
                tabla += '</tr>';
            }

            _element.tblLista.html(tabla);
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
                    grupoArticulo: _element.chkGrupoArticulo.is(':checked'),
                    seccion: _element.chkSeccion.is(':checked')
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
                cargando(true);
                let success = (r) => {
                    _util.pintar(r.hits.hits);
                    cargando(false);
                }

                let data = _model.elastic();

                _service.elastic(data).then(success, (e) => {
                    cargando(false);
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