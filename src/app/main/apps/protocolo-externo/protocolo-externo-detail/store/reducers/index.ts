import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProtocoloExternoDetailReducer, ProcessoDetailState} from './protocolo-externo-detail.reducer';
import {ProcessoReducer, ProcessoState} from './processo.reducer';

export interface ProcessoDetailAppState
{
    processoDetail: ProcessoDetailState;
    processo: ProcessoState;
}

export const getProcessoDetailAppState = createFeatureSelector<ProcessoDetailAppState>(
    'protocolo-externo-detail-app'
);

export const getAppState: any = createSelector(
    getProcessoDetailAppState,
    (state: ProcessoDetailAppState) => state
);

export const reducers: ActionReducerMap<ProcessoDetailAppState> = {
    processoDetail: ProtocoloExternoDetailReducer,
    processo: ProcessoReducer
};

export * from './protocolo-externo-detail.reducer';
export * from './processo.reducer';
