/**
 * @file Sample tool split sub2 module
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipTool.Split.Sub2', []);

    thisModule.controller('ToolSplitSub2Controller',
        function ($scope, $rootScope, $state, pipAppBar, pipBreadcrumb, pipNavIcon, pipActions, pipMedia) {
            if (!pipMedia('xs')) {
                $scope.transition('tool.view.split.details');
            }
            $scope.parentItem = $scope.getItem($state.params.id, $scope.itemCollection);
            $scope.selectItem($state.params.sub2_id, $scope.itemCollection);
            $scope.onSwipeRight = onSwipeRight;

            // Configure application header
            pipAppBar.parts = {
                icon: true,
                title: 'breadcrumb',
                actions: true
            };

            pipBreadcrumb.items = [{
                    title: 'Tool name',
                    click: function () {
                        $scope.transition('tool.list', {
                            id: $scope.parentItem.id
                        });
                    }
                },
                {
                    title: $scope.parentItem.title,
                    click: function () {
                        $scope.transition('tool.view.split.details', {
                            id: $scope.parentItem.id,
                            show: 'sub2'
                        });
                    }
                },
                {
                    title: 'Sub details'
                }
            ];
            pipNavIcon.showMenu();
            pipActions.show([], []);

            $scope.$on('pipWindowResized', onWindowResized);

            return;

            // --------------------------------------------------------------------------------------------------------

            function onWindowResized() {
                if (!pipMedia('xs')) {
                    $scope.transition('tool.view.split.details', {
                        id: $scope.parentItem.id
                    });
                }
            }

            function onSwipeRight() {
                $scope.transition('tool.view.split.details', {
                    id: $scope.parentItem.id
                });
            }

        });

})(window.angular);