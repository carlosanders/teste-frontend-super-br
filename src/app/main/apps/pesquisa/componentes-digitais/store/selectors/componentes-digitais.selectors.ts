import {createSelector} from '@ngrx/store';
import {
    getComponentesDigitaisAppState,
    ComponentesDigitaisAppState,
    ComponentesDigitaisState
} from 'app/main/apps/pesquisa/componentes-digitais/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr/componente-digital.schema';
import {ComponenteDigital} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getComponentesDigitaisState = createSelector(
    getComponentesDigitaisAppState,
    (state: ComponentesDigitaisAppState) => state.componentesDigitais
);

export const getComponentesDigitaisIds = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.entitiesId
);

export const getComponentesDigitais = createSelector(
    schemaSelectors.getNormalizedEntities,
    getComponentesDigitaisIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.pagination
);

export const getIsLoading = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.loading
);
