/**
 * @file Controllers for split view sample page
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('app', [
        'ui.router', 'ngMaterial', 
        'ngMessages', 'ngAnimate', 'pipTranslate', 
        'pipLayout', 'pipNav', 'pipBehaviors',
        'pipServices', 'pipTool', 'pipTabs', 'pipSplit'
    ]);

    thisModule.config(
        function ($urlRouterProvider, $mdIconProvider) {
            $urlRouterProvider.otherwise('/tool');
            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);
        }
    );

})(window.angular);
