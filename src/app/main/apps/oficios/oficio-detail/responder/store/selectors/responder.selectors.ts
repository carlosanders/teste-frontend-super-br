import {createSelector} from '@ngrx/store';
import {getResponderAppState, ResponderAppState, ResponderState} from '../reducers';

export const getResponderState: any = createSelector(
    getResponderAppState,
    (state: ResponderAppState) => state.responder
);

export const getIsSavingResponder: any = createSelector(
    getResponderState,
    (state: ResponderState) => state.saving
);

export const getErrorsResponder: any = createSelector(
    getResponderState,
    (state: ResponderState) => state.errors
);
