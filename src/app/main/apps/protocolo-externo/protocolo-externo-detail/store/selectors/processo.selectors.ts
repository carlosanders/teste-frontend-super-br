import {ProcessoState} from '../reducers/processo.reducer';
import {createSelector} from '@ngrx/store';
import {getProcessoDetailAppState, ProcessoDetailAppState} from '../reducers';

export const getProcessoState: any = createSelector(
    getProcessoDetailAppState,
    (state: ProcessoDetailAppState) => state.processo
);

export const expandirTela: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

