(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).split = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MobileState = (function () {
    function MobileState() {
    }
    return MobileState;
}());
exports.MobileState = MobileState;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var run = function ($rootScope, pipSplit, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var splitElements = $('.pip-split');
            if (splitElements.length > 0) {
                splitElements.removeClass('pip-transition-forward');
                splitElements.removeClass('pip-transition-back');
                if (toState.name != fromState.name) {
                    if (pipSplit.forwardTransition(toState, fromState)) {
                        splitElements.addClass('pip-transition-forward');
                    }
                    else {
                        splitElements.addClass('pip-transition-back');
                    }
                }
            }
        });
        var debounceResize = _.debounce(function () {
            var toState = pipSplit.goToDesktopState($state.current.name);
            if (toState)
                $state.go(toState, $state.current.params);
        }, 100);
        $rootScope.$on(pip.layouts.MainResizedEvent, function (event, breakpoints) {
            if (!breakpoints.xs) {
                debounceResize();
            }
        });
    };
    run.$inject = ['$rootScope', 'pipSplit', '$state'];
    var SplitService_1 = (function () {
        function SplitService_1(transitionSequences, mobileStates) {
            this.transitionSequences = transitionSequences;
            this.mobileStates = mobileStates;
        }
        SplitService_1.prototype.forwardTransition = function (toState, fromState) {
            for (var i = 0; i < this.transitionSequences.length; i++) {
                var toIndex = this.transitionSequences[i].indexOf(toState.name);
                var fromIndex = this.transitionSequences[i].indexOf(fromState.name);
                if (toIndex > -1) {
                    return toIndex > fromIndex;
                }
            }
            return false;
        };
        SplitService_1.prototype.goToDesktopState = function (fromState) {
            for (var i = 0; i < this.mobileStates.length; i++) {
                var fromIndex = _.findIndex(this.mobileStates[i], function (state) {
                    return state.name === fromState;
                });
                if (fromIndex > -1) {
                    return this.mobileStates[i][fromIndex].toState;
                }
            }
            return '';
        };
        return SplitService_1;
    }());
    var SplitProvider = (function () {
        function SplitProvider() {
            this.transitionSequences = [];
            this.mobileStates = [];
        }
        SplitProvider.prototype.addTransitionSequence = function (sequence, mobileStates) {
            if (!_.isArray(sequence) || sequence.length == 0) {
                throw new Error('Transition sequence must be an array of state names');
            }
            this.transitionSequences.push(sequence);
            this.mobileStates.push(mobileStates);
        };
        SplitProvider.prototype.$get = function () {
            "ngInject";
            if (this._service == null)
                this._service = new SplitService_1(this.transitionSequences, this.mobileStates);
            return this._service;
        };
        return SplitProvider;
    }());
    angular.module('pipSplit', [])
        .run(run)
        .provider('pipSplit', SplitProvider);
}
},{}],3:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
angular.module('pipSplit', []);
require("./SplitService");
__export(require("./ISplitService"));
},{"./ISplitService":1,"./SplitService":2}]},{},[3])(3)
});

//# sourceMappingURL=pip-suite-split.js.map
