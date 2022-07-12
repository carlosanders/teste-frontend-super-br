import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {visualizarProcessoReducer, VisualizarProcessoState} from './visualizar-processo.reducer';
import {assinaturasReducer, AssinaturasState} from './assinaturas.reducer';
import {volumesReducer, VolumesState} from './volumes.reducer';
import {assuntoReducer, AssuntoState} from './assunto.reducer';
import {interessadoReducer, InteressadoState} from './interessado.reducer';
import {vinculacaoProcessoReducer, VinculacaoProcessoState} from './vinculacao-processo.reducer';
import {juntadaReducer, JuntadaState} from './juntada.reducer';
import {bookmarkReducer, BookmarksState} from './bookmark.reducer';

export interface VisualizarProcessoAppState
{
    visualizarProcesso: VisualizarProcessoState;
    assinaturas: AssinaturasState;
    volumes: VolumesState;
    assuntos: AssuntoState;
    interessados: InteressadoState;
    vinculacoesProcessos: VinculacaoProcessoState;
    juntadas: JuntadaState;
    bookmark: BookmarksState;
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
    volumes: volumesReducer,
    assuntos: assuntoReducer,
    interessados: interessadoReducer,
    vinculacoesProcessos: vinculacaoProcessoReducer,
    juntadas: juntadaReducer,
    bookmark: bookmarkReducer
};

export * from './visualizar-processo.reducer';
export * from './assinaturas.reducer';
export * from './volumes.reducer';
export * from './assunto.reducer';
export * from './interessado.reducer';
export * from './vinculacao-processo.reducer';
export * from './juntada.reducer';
export * from './bookmark.reducer';
