import {createSelector} from '@ngrx/store';
import {getTramitacaoViewAppState, TramitacaoViewAppState, TramitacaoViewState} from '../reducers';

export const getTramitacaoViewState: any = createSelector(
    getTramitacaoViewAppState,
    (state: TramitacaoViewAppState) => state.tramitacaoView
);

export const getBinary: any = createSelector(
    getTramitacaoViewState,
    (state: TramitacaoViewState) => state.binary
);

export const getHasLoaded: any = createSelector(
    getTramitacaoViewState,
    (state: TramitacaoViewState) => state.loaded
);
