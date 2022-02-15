import {createSelector} from '@ngrx/store';
import {ComponenteDigitalState, getTarefaOficiosAppState, TarefaOficiosAppState} from '../reducers';

export const getComponenteDigitalState: any = createSelector(
    getTarefaOficiosAppState,
    (state: TarefaOficiosAppState) => state.componentesDigitais
);

export const getIsSavingComponentesDigitais: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getComponentesDigitaisErrors: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getIsLoadingSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);
