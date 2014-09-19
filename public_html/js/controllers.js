var pilotosControllers = angular.module('pilotosControllers', []);

pilotosControllers.controller('DashboardCtrl', ['$scope', '$http',
    function ($scope) {
        console.log("Hello everybody :D");
    }]
);

pilotosControllers.controller('AgencyCtrl', ['$scope', '$http', '$modal',
    function($scope, $http, $modal) {
        $scope.load = function () {
            $http.get(
                LinkServer.Url('agencia', 'get')
            ).success(function (data) {
                if(data._code === 200) {
                    $scope.agencies = data._response;
                }
            });
        };
        
        /*
         * INICIO
         * Formulario de creacion/edicion
         */
        function formEdit ($scope, $modalInstance, agency) {
            $scope.agency = agency;

            $scope.ok = function () {
                $modalInstance.close($scope.agency);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
        
        var _agency = {}
            , info = {
                templateUrl: 'formEdit.html',
                controller: formEdit,
                resolve: {
                    agency: function () {
                        return _agency;
                    }
                }
            }, modalInstance = null;

        function recall () {
            modalInstance = $modal.open(info);

            modalInstance.result.then(
                function (agency) {
                    _agency = agency;
                      
                    if(agency.nombre && agency.correo && agency.telefono) {
                        if(agency.idagencia) {
                            $http.put(
                                LinkServer.Url('agencia', 'edit'),
                                agency
                            ).success(function (data) {
                                if(data._code !== 200) {
                                    alert("Hubo un error al editar la agencia " + agency.nombre);
                                    $scope.load();
                                }
                            });
                        } else {
                            $http.post(
                                LinkServer.Url('agencia', 'add'),
                                agency
                            ).success(function (data) {
                                if(data._code === 200) {
                                    $scope.agencies.push(data._response);
                                } else {
                                    alert("Hubo un error al guardar la nueva agencia");
                                    recall();
                                }
                            });
                        }
                    } else {
                        alert("Verifique los valores enviados");
                        recall();
                    }
                }, function () {}
            );
        }
        /*
         * FIN
         * Formulario de creacion/edicion
         */
        
        $scope.edit = function (agency) {
            _agency = agency;
            recall();
        };
        
        $scope.remove = function (agency) {
            var rmv = confirm("Desea eliminar la agencia '" + agency.nombre + "'?");
            
            if(rmv) {
                $http.delete(LinkServer.Url('agencia', 'delete', {
                    idagencia: agency.idagencia
                })).success(function (data) {
                    if(data._code === 200) {
                        for(var i=0; i<$scope.agencies.length; i++) {
                            if($scope.agencies[i].idagencia === agency.idagencia) {
                                $scope.agencies.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        alert(data._message);
                    }
                });
            }
        };
        
        $scope._new = function () {
            _agency = {};
            recall();
        };
        
        /*
         * Cargar la informacion
         */
        $scope.load();
    }]
);

pilotosControllers.controller('TugCtrl', ['$scope', '$http', '$modal',
    function($scope, $http, $modal) {
        $scope.load = function () {
            $http.get(
                LinkServer.Url('remolque', 'get')
            ).success(function (data) {
                if(data._code === 200) {
                    $scope.tugs = data._response;
                }
            });
        };
        
        /*
         * INICIO
         * Formulario de creacion/edicion
         */
        function formEdit ($scope, $modalInstance, tug) {
            $scope.tug = tug;

            $scope.ok = function () {
                $modalInstance.close($scope.tug);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
        
        var _tug = {}
            , info = {
                templateUrl: 'formEdit.html',
                controller: formEdit,
                resolve: {
                    tug: function () {
                        return _tug;
                    }
                }
            }, modalInstance = null;

        function recall () {
            modalInstance = $modal.open(info);

            modalInstance.result.then(
                function (tug) {
                    _tug = tug;
                      
                    if(tug.nombre) {
                        if(tug.idremolque) {
                            $http.put(
                                LinkServer.Url('remolque', 'edit'),
                                tug
                            ).success(function (data) {
                                if(data._code !== 200) {
                                    alert("Hubo un error al editar el remolcador " + tug.nombre);
                                    $scope.load();
                                }
                            });
                        } else {
                            $http.post(
                                LinkServer.Url('remolque', 'add'),
                                tug
                            ).success(function (data) {
                                if(data._code === 200) {
                                    $scope.tugs.push(data._response);
                                } else {
                                    alert("Hubo un error al guardar el nuevo remolcador");
                                    recall();
                                }
                            });
                        }
                    } else {
                        alert("Verifique los valores enviados");
                        recall();
                    }
                }, function () {}
            );
        }
        /*
         * FIN
         * Formulario de creacion/edicion
         */
        
        $scope.edit = function (tug) {
            _tug = tug;
            recall();
        };
        
        $scope.remove = function (tug) {
            var rmv = confirm("Desea eliminar el remolcador '" + tug.nombre + "'?");
            
            if(rmv) {
                $http.delete(LinkServer.Url('remolque', 'delete', {
                    idremolque: tug.idremolque
                })).success(function (data) {
                    if(data._code === 200) {
                        for(var i=0; i<$scope.tugs.length; i++) {
                            if($scope.tugs[i].idremolque === tug.idremolque) {
                                $scope.tugs.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        alert(data._message);
                    }
                });
            }
        };
        
        $scope._new = function () {
            _tug = {};
            recall();
        };
        
        /*
         * Cargar la informacion
         */
        $scope.load();
    }]
);

pilotosControllers.controller('PilotCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.load = function () {
            $http.get(
                LinkServer.Url('piloto', 'get')
            ).success(function (data) {
                if(data._code === 200) {
                    $scope.pilots = data._response;
                }
            });
        };
        
        $scope.edit = function (pilot) {
            $scope.dialog_edit.dialog('open');
            $scope.pilot = pilot;
        };
        
        $scope.remove = function (pilot) {
            var rmv = confirm("Desea eliminar el piloto '" + pilot.nombre + "'?");
            
            if(rmv) {
                $http.delete(LinkServer.Url('piloto', 'delete', {
                    idpiloto: pilot.idpiloto
                })).success(function (data) {
                    if(data._code === 200) {
                        for(var i=0; i<$scope.pilots.length; i++) {
                            if($scope.pilots[i].idpiloto === pilot.idpiloto) {
                                $scope.pilots.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        alert(data._message);
                    }
                });
            }
        };
        
        $scope._new = function () {
            $scope.dialog_edit.dialog('open');
            
            $scope.pilot = {};
        };
        
        $scope.save = function () {
            var pilot = $scope.pilot;
            
            if(pilot.nombre && pilot.correo && pilot.tipo) {
                if(pilot.idpiloto) {
                    $http.put(
                        LinkServer.Url('piloto', 'edit'),
                        pilot
                    ).success(function (data) {
                        if(data._code !== 200) {
                            alert("Hubo un error al editar el piloto " + pilot.nombre);
                            $scope.load();
                        }
                    });
                } else {
                    $http.post(
                        LinkServer.Url('piloto', 'add'),
                        pilot
                    ).success(function (data) {
                        if(data._code === 200) {
                            $scope.pilots.push(data._response);
                        } else {
                            alert("Hubo un error al guardar el nuevo piloto");
                        }
                    });
                }
            } else {
                $scope.dialog_edit.dialog('close');
                alert("Verifique los valores enviados");
                $scope.load();
            }
        };
        
        /*
         * Cargar la informacion
         */
        $scope.load();
        
        if(!$scope.dialog_edit) {
            $scope.dialog_edit = $("#dialog-pilot").dialog({
                autoOpen: false,
                modal: true,
                buttons: {
                    guardar: function () {
                        $(this).dialog('close');
                        $scope.save();
                    }
                }
            });
        }
    }]
);

pilotosControllers.controller('MotorshipCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.load = function () {
            $http.get(
                LinkServer.Url('motonave', 'get')
            ).success(function (data) {
                if(data._code === 200) {
                    $scope.motorships = data._response;
                }
            });
        };
        
        $scope.edit = function (motorship) {
            $scope.dialog_edit.dialog('open');
            $scope.motorship = motorship;
        };
        
        $scope.remove = function (motorship) {
            var rmv = confirm("Desea eliminar La motonave '" + motorship.nombre + "'?");
            
            if(rmv) {
                $http.delete(LinkServer.Url('motonave', 'delete', {
                    idmotonave: motorship.idmotonave
                })).success(function (data) {
                    if(data._code === 200) {
                        for(var i=0; i<$scope.motorships.length; i++) {
                            if($scope.motorships[i].idmotonave === motorship.idmotonave) {
                                $scope.motorships.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        alert(data._message);
                    }
                });
            }
        };
        
        $scope._new = function () {
            $scope.dialog_edit.dialog('open');
            
            $scope.motorship = {};
        };
        
        $scope.save = function () {
            var motorship = $scope.motorship;
            
            if(
                motorship.nombre && motorship.imo && motorship.manga &&
                motorship.eslora && motorship.trb && motorship.bandera
            ) {
                if(motorship.idmotonave) {
                    $http.put(
                        LinkServer.Url('motonave', 'edit'),
                        motorship
                    ).success(function (data) {
                        if(data._code !== 200) {
                            alert("Hubo un error al editar la motonave " + motorship.nombre);
                            $scope.load();
                        }
                    });
                } else {
                    $http.post(
                        LinkServer.Url('motonave', 'add'),
                        motorship
                    ).success(function (data) {
                        if(data._code === 200) {
                            $scope.motorships.push(data._response);
                        } else {
                            alert("Hubo un error al guardar la nueva motonave");
                        }
                    });
                }
            } else {
                $scope.dialog_edit.dialog('close');
                alert("Verifique los valores enviados");
                $scope.load();
            }
        };
        
        /*
         * Cargar la informacion
         */
        $scope.load();
        
        if(!$scope.dialog_edit) {
            $scope.dialog_edit = $("#dialog-motorship").dialog({
                autoOpen: false,
                modal: true,
                buttons: {
                    guardar: function () {
                        $(this).dialog('close');
                        $scope.save();
                    }
                }
            });
        }
    }]
);

pilotosControllers.controller('TerminalCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.load = function () {
            $http.get(
                LinkServer.Url('terminal', 'get')
            ).success(function (data) {
                if(data._code === 200) {
                    $scope.terminals = data._response;
                }
            });
        };
        
        $scope.edit = function (terminal) {
            $scope.dialog_edit.dialog('open');
            $scope.terminal = terminal;
        };
        
        $scope.remove = function (terminal) {
            var rmv = confirm("Desea eliminar La terminal marítima '" + terminal.nombre + "'?");
            
            if(rmv) {
                $http.delete(LinkServer.Url('terminal', 'delete', {
                    idterminal: terminal.idterminal
                })).success(function (data) {
                    if(data._code === 200) {
                        for(var i=0; i<$scope.terminals.length; i++) {
                            if($scope.terminals[i].idterminal === terminal.idterminal) {
                                $scope.terminals.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        alert(data._message);
                    }
                });
            }
        };
        
        $scope._new = function () {
            $scope.dialog_edit.dialog('open');
            
            $scope.terminal = {};
        };
        
        $scope.save = function () {
            var terminal = $scope.terminal;
            
            if(terminal.nombre && terminal.muelles) {
                if(terminal.idterminal) {
                    $http.put(
                        LinkServer.Url('terminal', 'edit'),
                        terminal
                    ).success(function (data) {
                        if(data._code !== 200) {
                            alert("Hubo un error al editar la terminal marítima " + terminal.nombre);
                            $scope.load();
                        }
                    });
                } else {
                    $http.post(
                        LinkServer.Url('terminal', 'add'),
                        terminal
                    ).success(function (data) {
                        if(data._code === 200) {
                            $scope.terminals.push(data._response);
                        } else {
                            alert("Hubo un error al guardar la nueva terminal marítima");
                        }
                    });
                }
            } else {
                $scope.dialog_edit.dialog('close');
                alert("Verifique los valores enviados");
                $scope.load();
            }
        };
        
        /*
         * Cargar la informacion
         */
        $scope.load();
        
        if(!$scope.dialog_edit) {
            $scope.dialog_edit = $("#dialog-terminal").dialog({
                autoOpen: false,
                modal: true,
                buttons: {
                    guardar: function () {
                        $(this).dialog('close');
                        $scope.save();
                    }
                }
            });
        }
    }]
);

pilotosControllers.controller('ProcessCtrl', ['$scope', '$http', '$modal',
    function($scope, $http, $modal) {
        $scope.load = function () {
            $http.get(
                LinkServer.Url('proceso', 'get')
            ).success(function (data) {
                if(data._code === 200) {
                    $scope.processes = data._response;
                    
                    $http.get(
                        LinkServer.Url('proceso', 'listas')
                    ).success(function (data) {
                        if(data._code === 200) {
                            $scope.listas = data._response;
                        }
                    });
                }
            });
        };
        
        $scope.remove = function (process) {
            var rmv = confirm("Desea finalizar el proceso '" + process.nombre + "'?");
            
            if(rmv) {
                $http.delete(LinkServer.Url('proceso', 'finalize', {
                    idproceso: process.idproceso
                })).success(function (data) {
                    if(data._code === 200) {
                        $scope.load();
                    } else {
                        alert(data._response);
                    }
                });
            }
        };
        
        $scope._new = function () {
            function newProcess ($scope, $modalInstance, listas, process) {
                $scope.listas = listas;
                $scope.process = process || {};
                $scope.process.inicio = moment().format("YY-MM-DD HH:mm");
                
                $scope.ok = function () {
                    $modalInstance.close($scope.process);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
            
            var _process = {}
              , info = {
                templateUrl: 'newProcess.html',
                controller: newProcess,
                resolve: {
                    listas: function () {
                        return $scope.listas;
                    },
                    process: function () {
                        return _process;
                    }
                }
            }, modalInstance = null;
            
            function recall () {
                modalInstance = $modal.open(info);

                modalInstance.result.then(
                    function (process) {
                        _process = process;
                        
                        if(process.nombre && process.idagencia && process.idmotonave && process.inicio) {
                            $http.post(
                                LinkServer.Url('proceso', 'add'),
                                process
                            ).success(function (data) {
                                if(data._code === 200) {
                                    $scope.load();
                                } else {
                                    alert("Hubo un error al guardar el nuevo proceso");
                                    recall();
                                }
                            });
                        } else {
                            alert("Verifique los valores enviados");
                            recall();
                        }
                    }, function () {}
                );
            }
            
            recall();
        };
        
        $scope.observation = function (_process) {
            function obs ($scope, $modalInstance, process) {
                $scope.process = process;
                
                $scope.ok = function () {
                    $modalInstance.close($scope.process);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
            
            var info = {
                templateUrl: 'editObservation.html',
                controller: obs,
                resolve: {
                    process: function () {
                        return _process;
                    }
                }
            }, modalInstance = $modal.open(info);
            
            modalInstance.result.then(function (process) {
                    $http.post(
                        LinkServer.Url('proceso', 'observacion'),
                        process
                    ).success(function (data) {
                        if(data._code === 200) {
                            $scope.load();
                        } else {
                            alert("Hubo un error al guardar la observacion");
                            _process = process;
                            modalInstance = $modal.open(info);
                        }
                    });
                }, function () {}
            );
        };
        
        /*
         * Cargar la informacion
         */
        $scope.load();
        
        if(!$scope.dialog_edit) {
            $scope.dialog_edit = $("#dialog-process").dialog({
                autoOpen: false,
                modal: true,
                buttons: {
                    guardar: function () {
                        $(this).dialog('close');
                        $scope.save();
                    }
                }
            });
        }
    }]
);

pilotosControllers.controller('MoveCtrl', ['$scope', '$http', '$routeParams', '$modal',
    function($scope, $http, $routeParams, $modal) {
        $scope.load = function () {
            $http.get(
                LinkServer.Url('proceso', 'get')
            ).success(function (data) {
                if(data._code === 200) {
                    $scope.processes = data._response;
                    
                    for(var i in $scope.processes) {
                        if($scope.processes[i].idproceso == $routeParams.idproceso) {
                            $scope.process = $scope.processes[i];
                        }
                    }
                    
                    $http.get(
                        LinkServer.Url('evento', 'get', {
                            idproceso: $routeParams.idproceso
                        })
                    ).success(function (data) {
                        if(data._code === 200) {
                            $scope.events = data._response;
                            $scope.idproceso = $routeParams.idproceso;
                            
                            $scope.process.create = true;
                            for(var i=0; i<data._response.length; i++) {
                                $scope.process.create = (!$scope.process.create)? false : (data._response[i].id_estado!=1);
                            }
                            
                            $http.get(
                                LinkServer.Url('evento', 'listas')
                            ).success(function (data) {
                                if(data._code === 200) {
                                    $scope.listas = data._response;
                                }
                            });
                        }
                    });
                }
            });
        };
        
        $scope.changeMove = function (idproceso) {
            location.href = './index.html#/maniobras/' + idproceso;
        };
        
        $scope.finalize = function (event) {
            var rmv = confirm("Desea cerrar el movimiento '" + event.idevento + "'?");
            if(rmv) {
                $http.get(LinkServer.Url('evento', 'finalize', {
                    idevento: event.idevento
                })).success(function (data) {
                    if(data._code === 200) {
                        $scope.load();
                    } else {
                        alert(data._response);
                    }
                });
            }
        };
        
        $scope.remove = function (time) {
            $http.get(LinkServer.Url('evento', 'remove', {
                idmovimiento: time.idmovimiento
            })).success(function (data) {
                if(data._code === 200) {
                    $scope.load();
                } else {
                    alert(data._message);
                }
            });
        };
        
        $scope.edit = function (event) {
            $scope.event = event;
            $scope.save();
        };
        
        $scope._new = function () {
            function newMove ($scope, $modalInstance, listas, event) {
                $scope.listas = listas;
                $scope.event = event;
                $scope.event._fecha = $scope.event._fecha || new Date();
                $scope.event._hora = $scope.event._hora || new Date();
                
                $scope.ok = function () {
                    $modalInstance.close($scope.event);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
            
            var _event = {}
              , info = {
                templateUrl: 'newMove.html',
                controller: newMove,
                resolve: {
                    listas: function () {
                        return $scope.listas;
                    },
                    event: function () {
                        return _event;
                    }
                }
            }, modalInstance = null;
            
            function recall () {
                modalInstance = $modal.open(info);
                
                modalInstance.result.then(
                    function (event) {
                        _event = event;
                        if(event.idpiloto && event.idestado_ && event._fecha && event._hora) {
                            event.idproceso = $routeParams.idproceso;
                            event.fecha = moment(event._fecha).format("YY-MM-DD");
                            event.hora = moment(event._hora).format("HH:mm");

                            $http.post(
                                LinkServer.Url('evento', 'add'),
                                event
                            ).success(function (data) {
                                if(data._code === 200) {
                                    $scope.load();
                                } else {
                                    alert(data._response);
                                    recall();
                                }
                            });
                        } else {
                            alert("Verifique los valores enviados");
                            recall();
                        }
                    }, function () {}
                );
            }
            
            recall();
        };
        
        $scope.save = function () {
            var event = $scope.event;
            
            if(event.idevento) {
                event.time.idevento = event.idevento;
                
                $http.post(
                    LinkServer.Url('evento', 'add_move'),
                    event.time
                ).success(function (data) {
                    if(data._code !== 200) {
                        alert(data._response);
                    } else {
                        var str = "";
                        
                        for(var i in $scope.listas.tiempo) {
                            if($scope.listas.tiempo[i].idtiempo == event.time.idtiempo) {
                                str = $scope.listas.tiempo[i].tiempo;
                            }
                        }
                        event.tiempos.push($.extend({
                            tiempo: str
                        }, event.time));
                        event.time = {};
                    }
                });
            } else {
                alert("Verifique los valores enviados");
            }
        };
        
        /*
         * Cargar la informacion
         */
        $scope.load();
        
        /*if(!$scope.dialog_edit) {
            $scope.dialog_edit = $("#dialog-event").dialog({
                autoOpen: false,
                modal: true,
                width: 540,
                buttons: {
                    guardar: function () {
                        $(this).dialog('close');
                        $scope.save();
                    }
                }
            });
        }*/
    }]
);