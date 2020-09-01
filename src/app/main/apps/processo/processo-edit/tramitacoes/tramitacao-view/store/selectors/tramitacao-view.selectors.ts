import {createSelector} from '@ngrx/store';
import {getTramitacaoViewAppState, TramitacaoViewAppState, TramitacaoViewState} from '../reducers';

export const getTramitacaoViewState = createSelector(
    getTramitacaoViewAppState,
    (state: TramitacaoViewAppState) => state.tramitacaoView
);

export const getBinary = createSelector(
    getTramitacaoViewState,
    (state: TramitacaoViewState) => state.binary
);

export const getHasLoaded = createSelector(
    getTramitacaoViewState,
    (state: TramitacaoViewState) => state.loaded
);
