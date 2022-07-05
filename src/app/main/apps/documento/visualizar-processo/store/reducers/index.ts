import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {visualizarProcessoReducer, VisualizarProcessoState} from './visualizar-processo.reducer';
import {assinaturasReducer, AssinaturasState} from './assinaturas.reducer';
import {volumesReducer, VolumesState} from './volumes.reducer';

export interface VisualizarProcessoAppState
{
    visualizarProcesso: VisualizarProcessoState;
    assinaturas: AssinaturasState;
    volumes: VolumesState;
}

export const getVisualizarProcessoAppState = createFeatureSelector<VisualizarProcessoAppState>(
    'visualizar-processo-app'
);

export const getAppState: any = createSelector(
    getVisualizarProcessoAppState,
    (state: VisualizarProcessoAppState) => state
);

export const reducers: ActionReducerMap<VisualizarProcessoAppState> = {
    visualizarProcesso: visualizarProcessoReducer,
    assinaturas: assinaturasReducer,
    volumes: volumesReducer
};

export * from './visualizar-processo.reducer';
export * from './assinaturas.reducer';
export * from './volumes.reducer';
