import {createSelector} from '@ngrx/store';
import {
    getAtividadeCreateAppState,
    AtividadeCreateAppState,
    ComponenteDigitalState
} from '../reducers';

export const getComponenteDigitalState = createSelector(
    getAtividadeCreateAppState,
    (state: AtividadeCreateAppState) => state.componentesDigitais
);

export const getIsSavingComponentesDigitais = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getComponentesDigitaisErrors = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getIsLoadingSaving = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);
