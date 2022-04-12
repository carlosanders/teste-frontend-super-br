import {createSelector} from '@ngrx/store';
import {ValidacaoAssinaturaAppState, ComponenteDigitalState, getValidacaoAssinaturaAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';

const schemaComponenteDigitalSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getComponenteDigitalState: any = createSelector(
    getValidacaoAssinaturaAppState,
    (state: ValidacaoAssinaturaAppState) => state.componenteDigital
);

export const getIsLoading: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);

export const getIsSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getErrors: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getComponenteDigitalLoaded: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loaded
);

export const getComponenteDigitalId: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.componenteDigitalId
);

export const getComponenteDigital: any = createSelector(
    schemaComponenteDigitalSelectors.getNormalizedEntities,
    getComponenteDigitalId,
    schemaComponenteDigitalSelectors.entityProjector
);
