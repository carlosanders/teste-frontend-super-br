import {createSelector} from '@ngrx/store';
import {ComponenteDigitalState, getModelosAppState, ModelosAppState} from '../reducers';

export const getComponenteDigitalState: any = createSelector(
    getModelosAppState,
    (state: ModelosAppState) => state.componenteDigital
);

export const getIsSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => (state.saving > 0)
);
