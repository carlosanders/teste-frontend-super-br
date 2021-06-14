import {createSelector} from '@ngrx/store';
import {ComponenteDigitalState, getModelosAppState, ModelosAppState} from '../reducers';

export const getComponenteDigitalState = createSelector(
    getModelosAppState,
    (state: ModelosAppState) => state.componenteDigital
);

export const getIsSaving = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => (state.saving > 0)
);
