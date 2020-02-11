export interface ISplitService {
    forwardTransition(toState: any, fromState: any): boolean;
    goToDesktopState(fromState: string): string;
}

export interface ISplitProvider {
    addTransitionSequence(sequence: string[], mobileStates?: MobileState[]): void;
}

export class MobileState {
    name: string;
    toStateName: string;
}