import {createSelector} from '@ngrx/store';
import {ComponenteDigitalState, getModelosAppState, ModelosBlocoAppState} from '../reducers';

export const getComponenteDigitalState: any = createSelector(
    getModelosAppState,
    (state: ModelosBlocoAppState) => state.componenteDigital
);

export const getIsSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getErrors: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getIsLoadingSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);
