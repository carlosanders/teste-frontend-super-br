import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    ProcessoSolicitarDossiesReducer,
    ProcessoSolicitarDossiesState
} from './processo-solicitar-dossies.reducer';

export interface ProcessoSolicitarDossiesAppState
{
    interessadoList: ProcessoSolicitarDossiesState;
    tiposDossieList: ProcessoSolicitarDossiesState;
}

export const getProcessoSolicitarDossiesAppState = createFeatureSelector<ProcessoSolicitarDossiesAppState>(
    'processo-solicitar-dossies-app'
);

export const getAppState: any = createSelector(
    getProcessoSolicitarDossiesAppState,
    (state: ProcessoSolicitarDossiesAppState) => state
);

export const reducers: ActionReducerMap<ProcessoSolicitarDossiesAppState> = {
    interessadoList: ProcessoSolicitarDossiesReducer,
    tiposDossieList: ProcessoSolicitarDossiesReducer
};

export * from './processo-solicitar-dossies.reducer';
