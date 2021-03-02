import {ProcessoState} from '../reducers/processo.reducer';
import {createSelector} from '@ngrx/store';
import {ArquivistaDetailAppState, getArquivistaDetailAppState} from '../reducers';

export const getProcessoState = createSelector(
    getArquivistaDetailAppState,
    (state: ArquivistaDetailAppState) => state.processo
);

export const expandirTela = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

