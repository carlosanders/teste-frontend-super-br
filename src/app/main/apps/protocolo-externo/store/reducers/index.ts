import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProtocolosExternosReducer, ProcessosState } from './protocolos-externos.reducer';
import { PessoaReducer, PessoaState } from './pessoa.reducer';

export interface ProcessosAppState
{
    processos: ProcessosState;
    pessoa: PessoaState;
}

export const getProtocoloExternoAppState = createFeatureSelector<ProcessosAppState>(
    'protocolo-externo-app'
);

export const getProtocoloExternoState = createSelector(
    getProtocoloExternoAppState,
    (state: ProcessosAppState) => state
);

export const reducers: ActionReducerMap<ProcessosAppState> = {
    processos: ProtocolosExternosReducer,
    pessoa: PessoaReducer
};

export * from './protocolos-externos.reducer';
export * from './pessoa.reducer';
