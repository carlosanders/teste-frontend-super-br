import {createSelector} from '@ngrx/store';
import {
    getComponenteDigitalAppState,
    ComponenteDigitalAppState,
    ComponenteDigitalState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr/componente-digital.schema';

const schemaComponenteDigitalSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getComponenteDigitalState = createSelector(
    getComponenteDigitalAppState,
    (state: ComponenteDigitalAppState) => state.componenteDigital
);

export const getIsLoading = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);

export const getComponenteDigitalLoaded = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loaded
);

export const getComponenteDigitalId = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.componenteDigitalId
);

export const getComponenteDigital = createSelector(
    schemaComponenteDigitalSelectors.getNormalizedEntities,
    getComponenteDigitalId,
    schemaComponenteDigitalSelectors.entityProjector
);
