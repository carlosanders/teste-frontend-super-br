import {createSelector} from '@ngrx/store';
import {ComponenteDigitalState, getTarefasAppState, TarefasAppState} from '../reducers';

export const getComponenteDigitalState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.componentesDigitais
);

export const getSavingComponentesDigitaisIds: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getErrorsComponentesDigitais: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getIsLoadingSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);
