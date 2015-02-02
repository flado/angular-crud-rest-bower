/*! crud-grid - v1.0.3 - 2015-02-02
* https://github.com/flado/angular-crud-rest
* Copyright (c) Florin.Adochiei@gmail.com 2015; Licensed MIT */
angular.module('angular.crud.grid', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("crud-grid.tpl.html",
    "<!-- Search filter -->\n" +
    "\n" +
    "<div class=\"panel panel-default\" ng-if=\"hasSearchPanel\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <div class=\"row\">\n" +
    "        <h3 class=\"col-sm-2 panel-title\">Search Filter</h3>\n" +
    "        <div class=\"col-sm-10\">\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <button class=\"btn btn-default\" type=\"button\" name=\"searchLogic\" ng-model=\"searchLogic.and\" btn-radio=\"false\">OR</button>\n" +
    "                <button class=\"btn btn-default\" type=\"button\" name=\"searchLogic\" ng-model=\"searchLogic.and\" btn-radio=\"true\">AND</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "  <div class=\"panel-body form-horizontal\" ng-form=\"searchForm\">\n" +
    "      <div ng-repeat=\"col in gridOptions.columnDefs\">\n" +
    "        <div class=\"form-group\" ng-if=\"col.searchable\">\n" +
    "            <label class=\"col-sm-2 control-label\">{{col.displayName}}</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "              <input type=\"text\" ng-model=\"searchFilter[col.field]\"\n" +
    "                dynamic-name=\"col.field\" class=\"form-control\"\n" +
    "                placeholder=\"{{col.displayName}}\" ng-class=\"{'has-error': hasError(searchForm[col.field]) }\" ng-pattern=\"{{col.validPattern}}\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "          <button ng-click=\"search()\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\"></span> Search</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- page with data -->\n" +
    "<table class=\"crud-grid table table-hover table-bordered table-condensed \">\n" +
    "    <thead>\n" +
    "        <tr class=\"navigation\">\n" +
    "            <th colspan=\"{{headerColSpan}}\">\n" +
    "                <div ng-show=\"loading\"><i class=\"glyphicon glyphicon-refresh spin\"></i> Please wait while loading data...{{se}}<br></div>\n" +
    "                <div ng-show=\"!(searchFilter | allPropertiesEmpty)\">\n" +
    "                    <span class=\"glyphicon glyphicon-search\"></span> : <span ng-show=\"searchLogic.and\">AND</span><span ng-show=\"!searchLogic.and\">OR</span>\n" +
    "                    <div ng-repeat=\"col in gridOptions.columnDefs\">\n" +
    "                        <li ng-if=\"col.searchable && col.type=='S'\">\"{{col.displayName}}\" contains:  {{ searchFilter[col.field] }}</li>\n" +
    "                        <li ng-if=\"col.searchable && col.type!='S'\">\"{{col.displayName}}\" = {{ searchFilter[col.field] }}</li>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div ng-show=\"!loading\" class=\"pull-right\">\n" +
    "                    <!-- Select pagination size -->\n" +
    "                    Items per page:&nbsp;\n" +
    "                    <select class=\"form-control\" ng-change=\"refresh()\" style=\"width: 90px; display: inline\" ng-model=\"pagination.itemsPerPage\" ng-options=\"size for size in pageSizes\"></select>\n" +
    "                    &nbsp;&nbsp;&nbsp;\n" +
    "                    <pagination total-items=\"pagination.totalItems\"\n" +
    "                        page=\"pagination.currentPage\" items-per-page=\"pagination.itemsPerPage\"\n" +
    "                        max-size=\"pagination.maxSize\" class=\"pull-right\" rotate=\"true\" num-pages=\"pagination.numPages\"></pagination>\n" +
    "                </div>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "        <tr class=\"header\">\n" +
    "            <th class=\"col-md-1\" ng-if=\"!readOnly\">\n" +
    "                <div class=\"btn btn-default btn-xs\" ng-click=\"toggleAddMode()\">\n" +
    "                    <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "                </div>\n" +
    "            </th>\n" +
    "            <th class=\"{{col.width}}\" ng-repeat=\"col in gridOptions.columnDefs\" ng-if=\"!col.hide\">\n" +
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
    "        <td ng-repeat=\"col in gridOptions.columnDefs\" ng-if=\"!col.hide\">\n" +
    "\n" +
    "            <span ng-if=\"col.readOnly && !col.defaultOnAdd\"></span>\n" +
    "            <span ng-if=\"col.readOnly && col.defaultOnAdd\" ng-init=\"object[col.field]=col.defaultOnAdd\">{{col.defaultOnAdd}}</span>\n" +
    "            \n" +
    "            <span ng-if=\"!col.readOnly\">\n" +
    "                <input type=\"text\" dynamic-name=\"col.field\"\n" +
    "                    class=\"form-control\" placeholder=\"{{col.displayName}}\"\n" +
    "                    ng-class=\"{'has-error': hasError(addForm[col.field]) }\"\n" +
    "                    ng-model=\"object[col.field]\" ng-required=\"{{col.required}}\" ng-pattern=\"{{col.validPattern}}\" />\n" +
    "            </span>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr ng-repeat=\"object in objects\" ng-if=\"!col.hide\">\n" +
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
    "\n" +
    "        <!-- Object details -->\n" +
    "\n" +
    "        <td ng-repeat=\"col in gridOptions.columnDefs\" ng-if=\"!col.hide\">\n" +
    "            <span ng-if=\"col.readOnly\" >{{object[col.field]}}</span>\n" +
    "            <span ng-if=\"!col.readOnly\" ng-show=\"object.$edit == null\" ng-class=\"object.$animated\">{{object[col.field]}}</span>\n" +
    "            <ng-form name=\"editForm\" ng-if=\"editMode\">\n" +
    "                <input class=\"form-control\" ng-if=\"isInputForm(object, col)\"\n" +
    "                    ng-model=\"object.$edit[col.field]\"\n" +
    "                    ng-required=\"{{col.required}}\"\n" +
    "                    ng-init=\"object.$edit['$old_' + col.field]=object.$edit[col.field]\"\n" +
    "                    ng-change=\"valueChanged(col.field, object.$edit)\"\n" +
    "                    ng-pattern=\"{{col.validPattern}}\" model-change-blur />\n" +
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
    "        <td colspan=\"{{headerColSpan}}\">\n" +
    "            <span ng-show=\"!loading\" class=\"pull-left\"><i class=\"glyphicon glyphicon-hand-right\"></i> Total Items: {{pagination.totalItems}}</span>\n" +
    "            <span ng-show=\"!loading\" class=\"pull-right\">                \n" +
    "                <pagination total-items=\"pagination.totalItems\"\n" +
    "                        page=\"pagination.currentPage\" items-per-page=\"pagination.itemsPerPage\"\n" +
    "                        max-size=\"pagination.maxSize\" class=\"pull-right\" rotate=\"true\" num-pages=\"pagination.numPages\"></pagination>\n" +
    "            </div>\n" +
    "        </td>\n" +
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
    " 	Are you sure you want to delete this record?<br><br>\n" +
    " 	<ul>\n" +
    " 	  <li ng-repeat=\"col in gridOptions.columnDefs\" ng-if=\"!col.hide\"><b>{{col.displayName}}</b> = {{object[col.field]}}</li>\n" +
    " 	</ul>\n" +
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

.filter('isEmpty', function () {
    var bar;
    return function (obj) {
        for (bar in obj) {
            if (obj.hasOwnProperty(bar)) {
                return false;
            }
        }
        return true;
    };
})


.filter('allPropertiesEmpty', function () {
    var bar;
    return function (obj) {
        for (bar in obj) {
            if (obj.hasOwnProperty(bar)) {
                if (obj[bar] && obj[bar].trim().length > 0) {
                    return false;
                }
            }
        }
        return true;
    };
})


.directive('crudGrid', function ($log, $http, $injector, $timeout, $filter) {
    return {
        restrict: 'A',
        replace: false,
        scope: {
            readOnly: '=',
            notificationService: '=',
            serverValidationService: '=',
            baseUrl: '='
        },


        require: '^form',

        link: function(scope, elem, attrs, formCtrl) {
            $log.debug('>>>>> crudGrid >>> link <<<<<<<<<<', formCtrl);

            if (toastr) {
                toastr.options.closeButton = true;
            } else {
                $log.warn('crudGrid: toastr library is missing');
            }

            scope.objects = [];
            scope.addMode = false;
            scope.editMode = false;
            scope.previous = "<< Previous";
            scope.next = "Next >>";

            scope.pageSizes = [10, 25, 50, 100, 200, 500, 1000, 5000, 10000, 20000];

            scope.colDefMap = {}; //key: field name

            scope.searchFilter = {};
            scope.gridOptions = scope.$eval(attrs.gridOptions);

            if (scope.readOnly) {
                scope.headerColSpan = scope.gridOptions.columnDefs.length;
            } else {
                scope.headerColSpan = scope.gridOptions.columnDefs.length + 1;
            }

            //TODO: validate gridOptions mandatory properties & log default values

            if (scope.gridOptions.searchConfig) {
                if (scope.gridOptions.searchConfig.hideSearchPanel) {
                    scope.hasSearchPanel = false;
                } else {
                    scope.hasSearchPanel = true;
                }
            }
            //validate searchConfig
            if (scope.hasSearchPanel) {
                var cfg = scope.gridOptions.searchConfig;
                if (cfg.fields.length == 0) {
                    throw new Error("searchConfig.fields is missing");
                }
                if (cfg.fields.length == 1) {
                    if (cfg.filters.length != 1) {
                        throw new Error("searchConfig.filters should define a single URL for field: " + cfg.fields[0]);
                    }
                }
                if (cfg.fields.length > 1) {
                    if (cfg.filters.length != 2) {
                        throw new Error("searchConfig.filters should specify both AND + OR filters");
                    }
                }
            }

            for(var i=0; i < scope.gridOptions.columnDefs.length; i++) {
                var col = scope.gridOptions.columnDefs[i];
                //derive if col is searchable
                if (scope.hasSearchPanel && scope.gridOptions.searchConfig.fields.indexOf(col.field) > -1) {
                    if (!col.hasOwnProperty('searchable')) {
                        col.searchable = true;
                    }
                    scope.searchFilter[col.field] = '';//empty string
                }
                scope.colDefMap[col.field] = col;
                if (col.sortable === undefined) {
                    col.sortable = true; //by default every column is sortable
                } else {
                    $log.debug('# crudGrid  ### field: ', col.field, ' -> NOT SORTABLE');
                }
            }

            if (!scope.gridOptions.baseUrl) {
                scope.gridOptions.baseUrl = 'api';
            }

            scope.orderBy =  scope.gridOptions.orderBy ? scope.gridOptions.orderBy : [];
            scope.viewOrderBy =  [];
            var maxSizePagination = 10; //number of visible page buttons
            if (scope.gridOptions.maxSize) {
                maxSizePagination = scope.gridOptions.maxSize;
            }
            scope.pagination = {itemsPerPage : scope.gridOptions.itemsPerPage, maxSize: maxSizePagination};

            var getSortParams = function() {
                var result = [];
                for(var i=0; i < scope.orderBy.length; i++) {
                    result.push(scope.orderBy[i].field  + ',' + scope.orderBy[i].sort);
                }
                $log.debug('## crudGrid ### getSortParams: ', result);
                return result;
            };

            scope.searchLogic = { and: false }; //default search logic is OR if none specified in config

            scope.$watch('pagination.currentPage', function(oldValue, newValue){
                $log.debug(">> crudGrid << pagination.currentPage: ", oldValue, ' -> ', newValue); //trigger to get new data here
                scope.getData(function () {
                    scope.loading = false;
                });
            });
            //set start page index
            scope.pagination.currentPage = 1;

            scope.search = function() {  //apply search filter to referesh data
                $log.debug('>> crudGrid - search() <<');
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
                var hasSearchFilter = false;
                var queryParams = {page: scope.pagination.currentPage-1, size: scope.pagination.itemsPerPage}; //Spring Data pagination starts at 0 index

                //check if serachFilter has all props empty
                hasSearchFilter = !$filter('allPropertiesEmpty')(scope.searchFilter);
                var searchPostfix = '';

                if (hasSearchFilter) {
                    for (var field in scope.searchFilter) {
                        if (scope.searchFilter.hasOwnProperty(field)) {
                            if (scope.searchFilter[field] &&  scope.searchFilter[field].trim().length > 0) {
                                if (scope.colDefMap[field].type  == 'S') { //search by partial content
                                    queryParams[field] = '%' + scope.searchFilter[field].trim() + '%';
                                } else {
                                    queryParams[field] = scope.searchFilter[field].trim();
                                }

                            } else if (scope.colDefMap[field].type  == 'S'){ //default search value for Strings
                                queryParams[field] = '%';
                            }
                        }
                    }
                    var filters = scope.gridOptions.searchConfig.filters;
                    if (filters.length > 1) {
                        for(var i=0; i < filters.length; i++) {
                            if ((filters[i].logic == "AND" && scope.searchLogic.and) || (filters[i].logic == "OR" && !scope.searchLogic.and) ) {
                                scope.searchFilterUrl = filters[i].url;
                                break;
                            }
                        }
                    } else {
                        scope.searchFilterUrl = filters[0].url;
                    }
                    searchPostfix = '/search' + scope.searchFilterUrl;
                }
                //check fo default search filter (eg. discriminator column)
                if (scope.gridOptions.searchConfig) {
                    var defaultFilter = scope.gridOptions.searchConfig.defaultFilter;
                    if (defaultFilter) {
                        if (hasSearchFilter) {
                            if (!queryParams[defaultFilter.fieldName]) {
                                queryParams[defaultFilter.fieldName] = defaultFilter.fieldValue;
                            }
                        } else {
                            queryParams[defaultFilter.fieldName] = defaultFilter.fieldValue;
                            searchPostfix = '/search' + defaultFilter.url;
                        }
                    }
                }

                //set sort order using config
                var sort = getSortParams();
                if (sort.length > 0) {
                    queryParams.sort = sort;
                }

                var myData = {};
                var req = { method: 'GET', url: scope.gridOptions.baseUrl + '/' + scope.gridOptions.resourceName + searchPostfix, params: queryParams };
                myData.resourceName = scope.gridOptions.resourceName;
                myData.request = req;

                $http(req)
                    .success(function (data, status) {
                        $log.debug('crudGrid.successGetCallback:', data);
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
                        if (cb) cb();
                        myData.response = data;
                        scope.notificationService.notify('LIST', status, myData);
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
                $log.debug("@ crudGrid - toggleEditMode: ", object);
            };


            scope.addObject = function () {
                $log.debug('crudGrid > addObject: ', scope.object);
                scope.animateObject = undefined;
                $timeout(function() {
                    // TO make sure the validation cycle has completed before going to save
                    if (isFormValid()) { //only one addForm per page
                        //add default values (if any)
                        for(var i=0; i < scope.gridOptions.columnDefs.length; i++) {
                            var col = scope.gridOptions.columnDefs[i];
                            if (col.hide && col.defaultOnAdd) {
                                scope.object[col.field] = col.defaultOnAdd;
                            }
                        }

                        //check for validation service
                        if (scope.serverValidationService) {
                            //validateAction returns promise
                            scope.serverValidationService.validateAction('ADD', scope.object, scope.gridOptions.resourceName).then(
                                //promise ok
                                function(result){
                                    if (!result.valid) {
                                        scope.object.$serverValidationMessage = result.message;
                                        scope.notificationService.notify('ADD', 409, { response: scope.object });
                                    } else {
                                        doInsert(scope.object, $http);
                                    }
                                },
                                //promise error
                                function(reason) {
                                    scope.notificationService.notify('ADD', 500, { response: reason});
                                }
                            );
                        } else { //no server side validation required
                            doInsert(scope.object, $http);
                        }
                    }
                })
            };

            var doInsert = function(insertObj, $http) {
                var req = { method: 'POST', url: scope.gridOptions.baseUrl + '/' + scope.gridOptions.resourceName, data: insertObj};
                var myData = {};
                myData.resourceName = scope.gridOptions.resourceName;
                myData.request = req;
                $http(req)
                .success(function(data, status, headers, config) {
                    $log.debug('crudGrid.successPostCallback: ', data);
                    myData.response = data;
                    scope.notificationService.notify('ADD', status, myData);

                    scope.getData(function () {
                        scope.loading = false;
                        scope.toggleAddMode();
                    });
                })
                .error(function(data, status) {
                    myData.response = data;
                    scope.notificationService.notify('ADD', status, myData);
                });
            }

            scope.deleteObject = function (object) {
                var modal = $injector.get('$modal');
                if (modal) {
                    var modalInstance = modal.open({
                        templateUrl: 'delete-confirm.tpl.html',
                        controller: function($scope, $modalInstance) {
                            $scope.object = object;
                            $scope.gridOptions = scope.gridOptions;

                            $scope.cancel = function() {
                                $modalInstance.dismiss('cancel');
                            };
                            $scope.delete = function() {
                                //$http.delete(object._links.self.href).success( successCallback ).error( errorCallback ); //DOES NOT WORK IN IE
                                var req = {method: 'DELETE', url: object._links.self.href };
                                var myData = {};
                                myData.resourceName = scope.gridOptions.resourceName;
                                myData.request = req;
                                $http(req)
                                    .success(function(data, status) {
                                        $modalInstance.close(data);
                                        myData.response = data;
                                        //
                                        scope.notificationService.notify('DELETE', status, myData);
                                        scope.getData(function () {
                                            scope.loading = false;
                                        });
                                    }).error(function(data, status) {
                                        myData.response = data;
                                        scope.notificationService.notify('DELETE', status, myData);
                                    });
                            };
                        }
                    });
                } else { //no $modal found
                    var r = confirm('Are you sure you want to delete this record?');
                    if (r == true) {
                        var req = {method: 'DELETE', url: object._links.self.href };
                        var myData = {};
                        myData.resourceName = scope.gridOptions.resourceName;
                        myData.request = req;
                        $http(req)
                                    .success(function(data, status) {
                                        $modalInstance.close(data);
                                        myData.response = data;
                                        scope.notificationService.notify('DELETE', status, myData);
                                        scope.getData(function () {
                                            scope.loading = false;
                                        });
                                    }).error(function(data, status) {
                                        myData.response = data;
                                        scope.notificationService.notify('DELETE', status, myData);
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
                $log.debug('crudGrid.updateObject: ', editObj, elem);

                $timeout(function() {
                    // use $timeout tO make sure the validation cycle has completed before going to save
                    if (isFormValid()) {

                        if (scope.serverValidationService) {
                            //validateAction returns promise
                            scope.serverValidationService.validateAction('UPDATE', editObj, scope.gridOptions.resourceName).then(
                                //promise ok
                                function(result){
                                    if (!result.valid) {
                                        editObj.$serverValidationMessage = result.message;
                                        scope.notificationService.notify('UPDATE', 409, { response: editObj });
                                    } else {
                                        doUpdate(editObj, $http);
                                    }
                                },
                                //promise error
                                function(reason) {
                                    scope.notificationService.notify('UPDATE', 500, { response:reason });
                                }
                            );
                        } else { //no server side validation required
                            doUpdate(editObj, $http);
                        }
                    }
                });
            };

            var doUpdate = function(editObj, $http) {
                var cleanEditObj = cleanObject(editObj);
                var myData = {};
                var req = { method: 'PUT', url: editObj._links.self.href, data: cleanEditObj };
                myData.resourceName = scope.gridOptions.resourceName;
                myData.request = req;
                $http(req)
                .success( function(data, status) {
                    myData.response = data;
                    scope.notificationService.notify('UPDATE', status, myData);
                    scope.getData(function () {
                        scope.loading = false;
                        for(var i=0; i < scope.objects.length; i++) {
                            if (scope.objects[i]._links.self.href == editObj._links.self.href) {
                                scope.objects[i].$animated = 'animated flash';
                            }
                        }
                    });
                })
                .error(function(data, status) {
                    scope.animateObject = undefined;
                    myData.response = data;
                    scope.notificationService.notify('UPDATE', status, myData);
                });
            };

            scope.valueChanged = function(field, value) {
                $log.debug('## crudGrid ## valueChanged: ', field, value);
                if (scope.gridOptions.uniqueConstraint && scope.gridOptions.uniqueConstraint.indexOf(field) > -1) {
                    if (value['$old_' + field] != value[field]) {
                        if (value[field] && value[field].trim().length == 0 && value['$old_' + field]==null) {
                            value.$uniqueDirty = false;
                        } else {
                            value.$uniqueDirty = true;
                        }
                    } else {
                        value.$uniqueDirty = false;
                    }
                }
            }

            scope.isInputForm = function(object, col) {
                return object.$edit && !col.readOnly;
            };

            //check if form is valid
            function isFormValid() {
                var valid = formCtrl.$valid;
                if (!valid) {
                    $log.debug('# crudGrid ## Form -> invalid');
                    scope.notificationService.notify('FORM_INVALID');
                }
                return valid;
            };


            scope.setViewOrderBy = function (col) {
                var field = col.field;
                $log.debug('>> crudGrid >> setViewOrderBy: ', field, ' >> scope.orderBy: ', scope.orderBy);
                for(var i=0; i < scope.objects.length; i++) {
                    scope.objects[i].$animated = '';
                }
                var asc = scope.viewOrderBy.field === field ? !(scope.viewOrderBy.sort == 'asc') : true;
                scope.viewOrderBy = { field: field, sort: asc ? 'asc' : 'desc' };
                //scope.viewOrderBy.viewOrdering = true;
                scope.orderBy.length = 0;
                scope.orderBy.push(scope.viewOrderBy);
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

            scope.search = function() {
                $log.debug('## search: ', scope.searchFilter);
                scope.getData(function () {
                    scope.loading = false;
                });
            };

            scope.hasError = function(formField, validation) {
              $log.debug('> crudGrid >> hasError -> formField: ', formField);
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