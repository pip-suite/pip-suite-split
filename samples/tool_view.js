/**
 * @file Sample tool view module
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (angular) {
    'use strict';
    var thisModule = angular.module('pipTool.View', ['pipTool.Tiles', 'pipTool.Split']);

    thisModule.controller('ToolViewController', function ($scope, $rootScope, $state, pipAppBar, $location) {

        $scope.selected.selectItems = selectItems;
        $scope.search = $state.params.search;
        $scope.selected.viewType = $state.current.name.indexOf('split') > -1 ? 'split' : 'tiles';

        $scope.onSearch = onSearch;

        return;

        // --------------------------------------------------------------------

        function updateUrl() {
            $rootScope.$state.params.id = $scope.selectedItem.id;
            $rootScope.$state.params.search = $scope.search ? $scope.search : undefined;

            $scope.updateStateUrl($rootScope.$state.name, $rootScope.$state.params);
        }

        function onSearch(search) {
            $scope.search = search;

            selectItems();
            updateUrl();
        }

        function filter(item) {
            if ($scope.search && $scope.search.indexOf(item.title) < 0) {
                return false;
            }

            return true;
        }

        function selectItems() {
            $scope.selected.itemCollection = _.filter($scope.itemCollection, filter);
            $scope.itemId = $scope.itemId || 0;
            $scope.selectItem($scope.selected.itemId, $scope.selected.itemCollection);
        }
    });

})(window.angular);
