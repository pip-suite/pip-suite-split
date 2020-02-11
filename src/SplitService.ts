/// <reference path="../typings/tsd.d.ts" />

import {
    ISplitService,
    ISplitProvider,
    MobileState
} from './ISplitService';

{
    const run = function (
        $rootScope: ng.IRootScopeService, pipSplit: ISplitService, $state: ng.ui.IStateService
    ) {
        $rootScope.$on('$stateChangeStart',
            (event, toState, toParams, fromState, fromParams) => {
                // Split animation
                const splitElements = $('.pip-split');

                if (splitElements.length > 0) {
                    splitElements.removeClass('pip-transition-forward');
                    splitElements.removeClass('pip-transition-back');
                    if (toState.name != fromState.name) {
                        if (pipSplit.forwardTransition(toState, fromState)) {
                            splitElements.addClass('pip-transition-forward');
                        } else {
                            splitElements.addClass('pip-transition-back');
                        }
                    }
                }
            }
        );

        const debounceResize = _.debounce(() => {
            const toState = pipSplit.goToDesktopState($state.current.name);
            if (toState) $state.go(toState, $state.current.params);
        }, 100);

        $rootScope.$on(pip.layouts.MainResizedEvent, (
            event: ng.IAngularEvent,
            breakpoints: pip.layouts.MediaBreakpointStatuses
        ) => {
            if (!breakpoints.xs) {
                debounceResize();
            }
        });

    }

    class SplitService implements ISplitService {
        constructor(
            private transitionSequences: any,
            private mobileStates: any
        ) {}

        public forwardTransition(toState, fromState) {
            for (let i = 0; i < this.transitionSequences.length; i++) {
                const toIndex = this.transitionSequences[i].indexOf(toState.name);
                const fromIndex = this.transitionSequences[i].indexOf(fromState.name);

                if (toIndex > -1) {
                    return toIndex > fromIndex;
                }
            }

            return false
        }

        public goToDesktopState(fromState: string): string {
            for (let i = 0; i < this.mobileStates.length; i++) {
                const fromIndex = _.findIndex(this.mobileStates[i], (state: MobileState) => {
                    return state.name === fromState;
                })

                if (fromIndex > -1) {
                    return this.mobileStates[i][fromIndex].toState;
                }
            }

            return '';
        }
    }

    class SplitProvider implements ISplitProvider {
        private transitionSequences: any = [];
        private mobileStates: any = [];
        private _service: ISplitService;

        constructor() {}

        public addTransitionSequence(sequence: string[], mobileStates ? : MobileState[]) {
            if (!_.isArray(sequence) || sequence.length == 0) {
                throw new Error('Transition sequence must be an array of state names');
            }

            this.transitionSequences.push(sequence);
            this.mobileStates.push(mobileStates);
        }

        public $get() {
            "ngInject";

            if (this._service == null)
                this._service = new SplitService(this.transitionSequences, this.mobileStates);

            return this._service;
        }
    }

    angular.module('pipSplit', [])
        .run(run)
        .provider('pipSplit', SplitProvider);
}