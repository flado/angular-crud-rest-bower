/*! crud-grid - v0.0.11 - 2014-09-24
* Copyright (c) Florin.Adochiei@gmail.com 2014; Licensed  */
angular.module('angular.crud.grid', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("crud-grid.tpl.html",
    "<!-- Search filter -->\n" +
    "<div accordion ng-if=\"searchRequired\">\n" +
    "    <div accordion-group is-open=\"isopen\">\n" +
    "        <div accordion-heading>\n" +
    "            Search Filter:\n" +
    "                <span ng-repeat=\"col in gridOptions.columnDefs\">\n" +
    "                    <span class=\"filterText\" ng-if=\"col.searchable\" ng-show=\"searchFilter[col.field]\">{{col.displayName}} = {{searchFilter[col.field]}}</span>\n" +
    "                </span>\n" +
    "             <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': isopen, 'glyphicon-chevron-right': !isopen}\"></i>\n" +
    "        </div>\n" +
    "        <table class=\"table table-condensed \">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th class=\"col-md-1\">\n" +
    "                        &nbsp;\n" +
    "                    </th>\n" +
    "                    <th class=\"{{col.width}}\" ng-repeat=\"col in gridOptions.columnDefs\">\n" +
    "                        <div ng-show=\"col.searchable\">{{col.displayName}}</div>\n" +
    "                        <div ng-show=\"!col.searchable\">&nbsp;</div>\n" +
    "                    </th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        <button class=\"btn btn-primary\" ng-click=\"search()\">Search</button>\n" +
    "                    </td>\n" +
    "                    <td ng-repeat=\"col in gridOptions.columnDefs\">\n" +
    "                        <span ng-if=\"!col.searchable\">&nbsp;</span>\n" +
    "                        <span ng-if=\"col.searchable\">\n" +
    "                            <input type=\"text\" class=\"form-control\" placeholder=\"{{col.displayName}}\" ng-model=\"searchFilter[col.field]\" />\n" +
    "                        </span>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- page with data -->\n" +
    "<table class=\"crud-grid table table-hover table-bordered table-condensed \">\n" +
    "    <thead>\n" +
    "        <tr class=\"navigation\">\n" +
    "            <th colspan=\"3\" ng-show=\"loading\">\n" +
    "                <i class=\"glyphicon glyphicon-refresh spin\"></i> Please wait while loading data...\n" +
    "            </th>\n" +
    "            <th colspan=\"{{gridOptions.columnDefs.length + 1}}\">\n" +
    "                <pagination total-items=\"pagination.totalItems\"\n" +
    "                    page=\"pagination.currentPage\" items-per-page=\"pagination.itemsPerPage\"\n" +
    "                    max-size=\"pagination.maxSize\" class=\"pull-right\" rotate=\"true\" num-pages=\"pagination.numPages\"></pagination>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "        <tr class=\"header\">\n" +
    "            <th class=\"col-md-1\" ng-if=\"!readOnly\">\n" +
    "                <div class=\"btn btn-default btn-xs\" ng-click=\"toggleAddMode()\">\n" +
    "                    <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "                </div>\n" +
    "            </th>\n" +
    "            <th class=\"{{col.width}}\" ng-repeat=\"col in gridOptions.columnDefs\" >\n" +
    "                <!-- sortable header -->\n" +
    "                <div ng-if=\"col.sortable\" ng-click=\"setViewOrderBy(col)\">\n" +
    "                    {{col.displayName}}\n" +
    "                    <i class=\"glyphicon\" ng-class=\"{'glyphicon-sort-by-alphabet': viewOrderBy.sort == 'asc', 'glyphicon-sort-by-alphabet-alt': viewOrderBy.sort == 'desc'}\" ng-show=\"viewOrderBy.field == col.field\"></i>\n" +
    "                </div>\n" +
    "                <!-- not sortable header -->\n" +
    "                <div  ng-if=\"!col.sortable\">{{col.displayName}}</div>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "\n" +
    "    <tbody>\n" +
    "\n" +
    "    <tr ng-if=\"addMode && !readOnly\" ng-form=\"addForm\">\n" +
    "        <td>\n" +
    "            <div class=\"btn-group\">\n" +
    "                <div class=\"btn btn-default btn-xs\" ng-click=\"addObject()\">\n" +
    "                    <span class=\"glyphicon glyphicon-save\" ></span>\n" +
    "                </div>\n" +
    "                <div class=\"btn btn-default btn-xs\" ng-click=\"toggleAddMode()\">\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </td>\n" +
    "        <!-- Object details in ADD mode : ['{{col.field}}'] -->\n" +
    "        <td ng-repeat=\"col in gridOptions.columnDefs\" >\n" +
    "            <span ng-if=\"col.readOnly\"></span>\n" +
    "            <span ng-if=\"!col.readOnly\">\n" +
    "                <input type=\"text\" dynamic-name=\"col.field\" class=\"form-control\" placeholder=\"{{col.displayName}}\" ng-class=\"{'has-error': hasError(addForm[col.field]) }\" ng-model=\"object[col.field]\" ng-required=\"{{col.required}}\" ng-pattern=\"{{col.validPattern}}\" />\n" +
    "            </span>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr ng-repeat=\"object in objects\">\n" +
    "        <!-- Edit Actions -->\n" +
    "        <td ng-if=\"!readOnly\">\n" +
    "            <div class=\"btn-toolbar\" ng-show=\"object.$edit == null\">\n" +
    "                <div class=\"btn-group\">\n" +
    "                    <div class=\"btn btn-default btn-xs\" ng-click=\"toggleEditMode(object)\">\n" +
    "                        <span class=\"glyphicon glyphicon-edit\"></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"btn btn-default btn-xs\"  ng-click=\"deleteObject(object)\">\n" +
    "                        <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"btn-toolbar\" ng-show=\"object.$edit\">\n" +
    "                <div class=\"btn-group\">\n" +
    "                    <div class=\"btn btn-default btn-xs\" ng-click=\"updateObject(object)\">\n" +
    "                        <span class=\"glyphicon glyphicon-save\"></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"btn btn-default btn-xs\" ng-click=\"toggleEditMode(object)\">\n" +
    "                        <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </td>\n" +
    "        <!-- Object details -->\n" +
    "\n" +
    "        <td ng-repeat=\"col in gridOptions.columnDefs\">\n" +
    "            <span ng-if=\"col.readOnly\" >{{object[col.field]}}</span>\n" +
    "            <span ng-if=\"!col.readOnly\" ng-show=\"object.$edit == null\" ng-class=\"object.$animated\">{{object[col.field]}}</span>\n" +
    "            <ng-form name=\"editForm\" ng-if=\"editMode\">\n" +
    "                <input class=\"form-control\" ng-if=\"isInputForm(object, col)\" ng-model=\"object.$edit[col.field]\" ng-required=\"{{col.required}}\" ng-pattern=\"{{col.validPattern}}\" model-change-blur />\n" +
    "            </ng-form>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr class=\"navigation\">\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"refresh()\">\n" +
    "                <i class=\"glyphicon glyphicon-refresh\" ng-show=\"!loading\"></i>\n" +
    "                <i class=\"glyphicon glyphicon-refresh spin\" ng-show=\"loading\"></i> Refresh\n" +
    "            </button>\n" +
    "        </td>\n" +
    "        <td colspan=\"{{gridOptions.columnDefs.length+1}}\">\n" +
    "                <pagination total-items=\"pagination.totalItems\"\n" +
    "                    page=\"pagination.currentPage\" items-per-page=\"pagination.itemsPerPage\"\n" +
    "                    max-size=\"pagination.maxSize\" class=\"pull-right\" rotate=\"true\" num-pages=\"pagination.numPages\"></pagination>\n" +
    "\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>");
  $templateCache.put("delete-confirm.tpl.html",
    "<div class=\"modal-header\">	\n" +
    "	<h4>Please Confirm</h4>	\n" +
    "</div> <!-- .modal-header -->\n" +
    "\n" +
    " <div class=\"modal-body\"> 	\n" +
    " 	Are you sure you want to delete this record?\n" +
    "</div> <!-- .modal-body   -->\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "	<button class=\"btn btn-primary\" ng-click=\"delete()\">Yes</button>\n" +
    "	<button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module('angular.crud.grid')

.directive('crudGrid', function ($log, $http, $injector, $timeout) {
    return {
        restrict: 'A',
        replace: false,
        scope: {
            readOnly: '=',
            notificationService: '=',
            baseUrl: '='
        },


        require: '^form',

        link: function(scope, elem, attrs, formCtrl) {
            $log.debug('>>>>> link <<<<<<<<<<', formCtrl);



            if (toastr) {
                toastr.options.closeButton = true;
            } else {
                $log.warn('toastr library is missing');
            }

            scope.objects = [];
            scope.addMode = false;
            scope.editMode = false;
            scope.previous = "<< Previous";
            scope.next = "Next >>";
            scope.searchFilter = {};

            scope.gridOptions = scope.$eval(attrs.gridOptions);
            for(var i=0; i < scope.gridOptions.columnDefs.length; i++) {
                var col = scope.gridOptions.columnDefs[i];
                if (col.sortable === undefined) {
                    col.sortable = true; //by default every column is sortable
                } else {
                    $log.debug('# field: ', col.field, ' -> NOT SORTABLE');
                }
            }

            if (!scope.gridOptions.baseUrl) {
                scope.gridOptions.baseUrl = 'api';
            }

            scope.orderBy =  scope.gridOptions.orderBy ? scope.gridOptions.orderBy : [];
            scope.viewOrderBy =  [];
            scope.searchFilter = scope.gridOptions.searchFilter;
            scope.searchFilterUrl = scope.gridOptions.searchFilterUrl;

            //pagination.maxSize = 10; //number of visible page buttons
            scope.pagination = {itemsPerPage : scope.gridOptions.itemsPerPage};

            var getSortParams = function() {
                var result = [];
                for(var i=0; i < scope.orderBy.length; i++) {
                    result.push(scope.orderBy[i].field  + ',' + scope.orderBy[i].sort);
                }
                $log.debug('## getSortParams: ', result);
                return result;
            };

            scope.searchRequired = function() {
                $log.debug('searchRequired: ', scope.gridOptions.columnDefs);
                for(var i=0; i < scope.gridOptions.columnDefs.length; i++) {
                    col = scope.gridOptions.columnDefs[i];
                    //$log.debug('searchRequired col= ', col);
                    if (col.searchable) {
                        return true;
                    }
                }
                return false;
            }();

            scope.$watch('pagination.currentPage', function(oldValue, newValue){
                $log.debug(">> pagination.currentPage: ", oldValue, ' -> ', newValue); //trigger to get new data here
                //if (oldValue !== newValue) {
                    scope.getData(function () {
                        scope.loading = false;
                    });
                //}
            });
            //set start page index
            scope.pagination.currentPage = 1;

            scope.search = function() {  //apply search filter to referesh data
                $log.debug('>> search() <<');
                if (scope.pagination.currentPage > 1) {
                    scope.pagination.currentPage = 1; //this will trigger a getData() call
                } else {
                    scope.getData(function () {
                        scope.loading = false;
                    });
                }
            };

            scope.getData = function (cb) {
                $log.debug('>> getData <<');
                scope.loading = true;
                var useSearch = false;
                var queryParams = {page: scope.pagination.currentPage-1, size: scope.pagination.itemsPerPage}; //Spring Data pagination starts at 0 index
                for (var col in scope.searchFilter) {
                    if (scope.searchFilter.hasOwnProperty(col)) {
                        if (scope.searchFilter[col].trim().length > 0) {
                            queryParams[col] = scope.searchFilter[col].trim();
                            useSearch = true;
                        }
                    }
                }
                var searchPostfix = '';
                if (useSearch) {
                    if (!scope.searchFilterUrl) {
                        throw new Error("searchFilterUrl config not found");
                    } else {
                        searchPostfix = '/search' + scope.searchFilterUrl; //if search URL provided in config
                    }
                }

                //set sort order using config
                var sort = getSortParams();
                if (sort.length > 0) {
                    queryParams.sort = sort;
                }

                $http({ method: 'GET', url: scope.gridOptions.baseUrl + '/' + scope.gridOptions.resourceName + searchPostfix, params: queryParams })
                    .success(function (data, status) {
                        $log.debug('successGetCallback:', data);
                        if (data._embedded) {
                            scope.objects = data._embedded[scope.gridOptions.resourceName]; //array of items
                        } else {
                            scope.objects = [];
                        }
                        if (data.page) {
                            scope.pagination.totalItems = data.page.totalElements;
                        } else {
                            scope.pagination.totalItems = scope.objects.length;
                        }
                        if (cb) cb();
                    })
                    .error(function(data, status) {
                        scope.notificationService.notify('LIST', status, data);
                    });
            };

            scope.toggleAddMode = function () {
                scope.addMode = !scope.addMode;
                scope.object = {}; //add object in scope for data binding in template.html
            };

            scope.toggleEditMode = function (object) {
                scope.editMode = !object.$edit;
                object.$animated = '';
                if (scope.editMode) {
                    // object.$animated = '';
                    var copyObj ={};
                    angular.copy(object, copyObj);
                    object.$edit = copyObj
                } else {
                    if (object.$edit) {
                        delete object.$edit;
                        // object.$animated = 'animated flash';
                    }
                }
                $log.debug("@ toggleEditMode: ", object);
            };


            scope.addObject = function () {
                $log.debug('addObject: ', scope.object);
                scope.animateObject = undefined;
                $timeout(function() {
                    // TO make sure the validation cycle has completed before going to save
                    if (isFormValid()) { //only one addForm per page
                        $http({ method: 'POST', url: scope.gridOptions.baseUrl + '/' + scope.gridOptions.resourceName, data: scope.object})
                            .success(function(data, status, headers, config) {
                                $log.debug('successPostCallback: ', data);
                                scope.notificationService.notify('ADD', status, data);
                                scope.getData(function () {
                                    scope.loading = false;
                                    scope.toggleAddMode();
                                });
                            })
                           .error(function(data, status) {
                                scope.notificationService.notify('ADD', status, data);
                            });
                    }
                })
            };

            scope.deleteObject = function (object) {
                var modal = $injector.get('$modal');
                if (modal) {
                    var modalInstance = modal.open({
                        templateUrl: 'delete-confirm.tpl.html',
                        controller: function($scope, $modalInstance) {
                            $scope.cancel = function() {
                                $modalInstance.dismiss('cancel');
                            };
                            $scope.delete = function() {
                                //$http.delete(object._links.self.href).success( successCallback ).error( errorCallback ); //DOES NOT WORK IN IE
                                $http({method: 'DELETE', url: object._links.self.href })
                                    .success(function(data, status) {
                                        $modalInstance.close(data);
                                        scope.notificationService.notify('DELETE', status, data);
                                        scope.getData(function () {
                                            scope.loading = false;
                                        });
                                    }).error(function(data, status) {
                                        scope.notificationService.notify('DELETE', status, data);
                                    });
                            };
                        }
                    });
                } else { //no $modal found
                    var r = confirm('Are you sure you want to delete this record?');
                    if (r == true) {
                        $http({method: 'DELETE', url: object._links.self.href })
                                    .success(function(data, status) {
                                        $modalInstance.close(data);
                                        scope.notificationService.notify('DELETE', status, data);
                                        scope.getData(function () {
                                            scope.loading = false;
                                        });
                                    }).error(function(data, status) {
                                        scope.notificationService.notify('DELETE', status, data);
                                    });
                    }

                }
            };

            var cleanObject = function(obj) {
                var cleanObj = {};
                angular.copy(obj, cleanObj);
                delete cleanObj._links;
                return cleanObj;
            };

            scope.updateObject = function (object, elem) {
                var editObj = object.$edit;
                $log.debug('updateObject: ', editObj, elem);

                $timeout(function() {
                    // use $timeout tO make sure the validation cycle has completed before going to save
                    if (isFormValid()) {
                        var cleanEditObj = cleanObject(editObj);
                        //$http.put(editObj._links.self.href, cleanEditObj)
                        $http({ method: 'PUT', url: editObj._links.self.href, data: cleanEditObj })
                            .success( function(data, status) {
                                scope.notificationService.notify('UPDATE', status, data);
                                scope.getData(function () {
                                    scope.loading = false;
                                    for(var i=0; i < scope.objects.length; i++) {
                                        if (scope.objects[i]._links.self.href == editObj._links.self.href) {
                                            scope.objects[i].$animated = 'animated flash';
                                        }
                                    }
                                });
                                //scope.animateObject = editObj;
                                //object.$animated = 'animated flash';
                            })
                            .error(function(data, status) {
                                scope.animateObject = undefined;
                                scope.notificationService.notify('UPDATE', status, data);
                            });
                    }
                });
            };

            scope.isInputForm = function(object, col) {
                return object.$edit && !col.readOnly;
            };

            //check if form is valid
            function isFormValid() {
                var valid = formCtrl.$valid;
                if (!valid) {
                    $log.debug('# Form -> invalid');
                    scope.notificationService.notify('FORM_INVALID');
                }
                return valid;
            };
            

            scope.setViewOrderBy = function (col) {
                var field = col.field;
                $log.debug('>> setViewOrderBy: ', field, ' >> scope.orderBy: ', scope.orderBy);
                for(var i=0; i < scope.objects.length; i++) {
                    scope.objects[i].$animated = '';
                }

                var asc = scope.viewOrderBy.field === field ? !(scope.viewOrderBy.sort == 'asc') : true;
                scope.viewOrderBy = { field: field, sort: asc ? 'asc' : 'desc' };
                //scope.viewOrderBy.viewOrdering = true;
                scope.orderBy.length = 0;
                scope.orderBy.push(scope.viewOrderBy);


                /*var updated = false;
                for(var i=0; i < scope.orderBy.length; i++) {
                    $log.debug('###### i=' + i, scope.orderBy[i], ' ## VS ## ', scope.viewOrderBy, ' Equals ? ', (scope.orderBy[i].field === scope.viewOrderBy.field));
                    if (scope.orderBy[i].field === scope.viewOrderBy.field) {
                        $log.debug('REPLACE: ', scope.orderBy[i], ' WITH: ', scope.viewOrderBy);
                        scope.orderBy[i] = scope.viewOrderBy;
                        updated = true;
                        break;
                    } else if (scope.orderBy[i].viewOrdering) {
                        scope.orderBy.splice(i, 1);//remove existing field from criteria
                        i--;
                    }
                }
                if (!updated) {
                    $log.debug('PUSH: ',  scope.viewOrderBy);
                    scope.orderBy.push(scope.viewOrderBy);
                }
*/
                $log.debug('>> setViewOrderBy - scope.viewOrderBy: ', scope.viewOrderBy);
                $log.debug('>> setViewOrderBy - scope.orderBy: ', scope.orderBy);
                //get data sorted by new field
                scope.getData(function () {
                    scope.loading = false;
                });
            };

            scope.refresh = function() {
                scope.getData(function () {
                    scope.loading = false;
                });
            };

            scope.hasError = function(formField, validation) {
              $log.debug('> hasError -> formField: ', formField);
              var error = false;
              if (angular.isUndefined(formField)) {
                error = false;
              } else if (validation) {
                error = formField.$error[validation];
              } else {
                error = formField.$invalid;
              }
              //$log.debug('> hasError -> formField: ', formField, 'returns: ', error);
              return error;
            };

        },
        templateUrl: 'crud-grid.tpl.html'
    }
});