/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Forms = {
    _info: {},
    load: function () {
        uget({
            type: 'GET',
            url: LinkServer.Url('prenda', 'get', [])
        }).done(function (data) {
            //Lista en tab de slides
            var list = $(".idform"),
                table = $("#table-forms tbody")
            ;

            list.html("");
            table.empty();
            
            for (var i=0; i<data._response.length; i++) {
                (function (ob) {
                    list.append("<option value='" + ob.idprenda + "'>" 
                            + ob.nombre + "</option>");

                    var tr = $("<tr/>", {
                        id: ob.idprenda,
                        class: 'gradeA'
                    });

                    $("<td/>", {
                        class: 'i_name'
                    }).html(
                        $("<img/>", {
                            src: ob.miniatura,
                            width: 50
                        })
                    ).appendTo(tr);

                    $("<td/>", {
                        class: 'i_type'
                    }).html(
                        $("<a/>", {
                            html: ob.nombre,
                            href: '#'
                        }).click(function (e) {
                            e.preventDefault();
                            $(".prenda-select").html(ob.nombre + " " + ob.tipo)
                            Perspectiva.load(ob.idprenda);
                        })
                    ).appendTo(tr);

                    $("<td/>", {
                        class: 'i_arch',
                        html: ob.tipo
                    }).appendTo(tr);
                    
                    $("<td/>", {
                        class: 'i_arch',
                        html: ob.descripcion
                    }).appendTo(tr);
                    
                    $("<td/>", {
                        class: 'i_arch',
                        html: ob.creation
                    }).appendTo(tr);

                    $("<td/>", {
                        class: 'i_status'
                    }).css({
                        'text-align': 'center'
                    }).html(
                        $("<span/>", {
                            class: 'st-16 icon-edit'
                        }).click(function () {
                            Forms.get(ob.idprenda);
                        })
                    ).appendTo(tr);

                    $("<td/>", {
                        class: 'i_launch'
                    }).css({
                        'text-align': 'center'
                    }).html(
                        $("<span/>", {
                            class: 'st-48 icon-remove'
                        }).click(function () {
                            Forms.delete(ob.idprenda);
                        })
                    ).appendTo(tr);

                    tr.appendTo(table);
                })(data._response[i]);
            }
            
            $("#table-forms").tablesorter();
        });
    }, delete: function (id) {
        var del = confirm("Desea eliminar la prenda?");

        if(del) {
            uget({
                type: 'DELETE',
                url: LinkServer.Url('prenda', 'delete', []),
                data: {
                    idprenda: id
                }
            }).done(function (data) {
                if(data._code === 200) {
                    Forms.load();
                } else {
                    alert("Hubo un error al eliminar. " + data._message);
                }
            });
        }
    }, get: function (id) {
        $('.section').css({
            display: 'none'
        });

        $('#edit-form').css({
            display: 'block'
        });
        
        var form = $("#edit-form");
        
        form.find('input').val("");
        form.find('textarea').val("");
        
        if(id) {
            uget({
                type: 'GET',
                url: LinkServer.Url('prenda', 'get', {
                    idprenda: id
                })
            }).done(function (data) {
                if(data._code === 200) {
                    $("#form-title").html(data._response[0].tipo);
                    
                    for(var i in data._response[0]) {
                        form.find("[name=" + i + "]").val(data._response[0][i]);
                    }
                    $("#miniatura-prenda").attr('src', data._response[0].miniatura);
                } else {
                    alert("Hubo un error al cargar la prenda: " + data._message);
                }
            });
        }
    }, save: function () {
        var params = parametrizer($("#edit-form"));
        
        uget({
            type: (params.idprenda)? 'PUT' : 'POST',
            url: LinkServer.Url('prenda', ((params.idprenda)? 'update' : 'add'), []),
            data: params
        }).done(function (data) {
            if(data._code === 200) {
                Forms.load();
                alert("Cambios realizados con éxito.");
            } else {
                alert("Hubo un error al guardar la prenda: " + data._message);
            }
        });
    }
};

var Perspectiva = {
    idprenda: 0,
    load: function (id) {
        $('.section').css({
            display: 'none'
        });

        $('#perspectiva').css({
            display: 'block'
        });
        
        uget({
            type: 'GET',
            url: LinkServer.Url('perspectiva', 'get', {
                idprenda: id
            })
        }).done(function (data) {
            var table = $("#table-perspectivas").find("tbody");
            Perspectiva.idprenda = id;
            
            table.empty();
            
            if(data._code === 200) {
                for(var i in data._response) {
                    (function (ob) {
                        $('<tr/>', {
                            id: 'pers-' + ob.idperspectiva
                        }).append(
                            $('<td/>').html(
                                $('<img/>', {
                                    src: ob.miniatura
                                })
                            )
                        ).append(
                            $('<td/>', {
                                html: ob.nombre
                            })
                        ).append(
                            $('<td/>', {
                                style: 'text-align: center;'
                            }).html(
                                $('<span/>', {
                                    class: 'st-32 icon-eye-open'
                                }).click(function (e) {
                                    e.preventDefault();
                                    alert(ob.idperspectiva);
                                })
                            )
                        ).append(
                            $('<td/>', {
                                style: 'text-align: center;'
                            }).html(
                                $('<span/>', {
                                    class: 'st-16 icon-edit'
                                }).click(function (e) {
                                    e.preventDefault();
                                    Perspectiva.get(ob.idperspectiva);
                                })
                            )
                        ).append(
                            $('<td/>', {
                                style: 'text-align: center;'
                            }).html(
                                $('<span/>', {
                                    class: 'st-48 icon-remove'
                                }).click(function (e) {
                                    e.preventDefault();
                                    Perspectiva.delete(ob.idperspectiva);
                                })
                            )
                        ).appendTo(table);
                    })(data._response[i]);
                }
            }
        });
    }, get: function (id) {
        $('.section').css({
            display: 'none'
        });

        $('#edit-perspectiva').css({
            display: 'block'
        });
        
        var form = $("#edit-perspectiva");
        
        form.find('input').val("");
        form.find('textarea').val("");
        
        form.find('[name=idprenda]').val(Perspectiva.idprenda);
        
        if(id) {
            uget({
                type: 'GET',
                url: LinkServer.Url('perspectiva', 'get', {
                    idperspectiva: id
                })
            }).done(function (data) {
                if(data._code === 200) {
                    $("#perspectiva-title").html(data._response[0].nombre);
                    
                    for(var i in data._response[0]) {
                        form.find("[name=" + i + "]").val(data._response[0][i]);
                    }
                    $("#miniatura-perspectiva").attr('src', data._response[0].miniatura);
                    $("#plantilla-perspectiva").attr('src', data._response[0].plantilla);
                } else {
                    alert("Hubo un error al cargar la perspectiva: " + data._message);
                }
            });
        }
    }, save: function () {
        var params = parametrizer($("#edit-perspectiva"));
        
        uget({
            type: (params.idperspectiva)? 'PUT' : 'POST',
            url: LinkServer.Url('perspectiva', ((params.idperspectiva)? 'update' : 'add'), []),
            data: params
        }).done(function (data) {
            if(data._code === 200) {
                Perspectiva.load(Perspectiva.idprenda);
                alert("Cambios realizados con éxito.");
            } else {
                alert("Hubo un error al guardar la perspectiva: " + data._message);
            }
        });
    }, delete: function (id) {
        var del = confirm("Desea eliminar la perspectiva?");

        if(del) {
            uget({
                type: 'DELETE',
                url: LinkServer.Url('perspectiva', 'delete', []),
                data: {
                    idperspectiva: id
                }
            }).done(function (data) {
                if(data._code === 200) {
                    Perspectiva.load(Perspectiva.idprenda);
                } else {
                    alert("Hubo un error al eliminar. " + data._message);
                }
            });
        }
    }
};