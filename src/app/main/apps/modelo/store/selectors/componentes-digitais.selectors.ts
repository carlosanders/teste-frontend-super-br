import {createSelector} from '@ngrx/store';
import {ComponenteDigitalState, getModelosAppState, ModelosAppState} from 'app/main/apps/modelo/store/reducers';

export const getComponenteDigitalState = createSelector(
    getModelosAppState,
    (state: ModelosAppState) => state.componenteDigital
);

export const getIsSaving = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getErrors = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getIsLoadingSaving = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);
