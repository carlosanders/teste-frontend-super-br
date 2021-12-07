import {createSelector} from '@ngrx/store';
import {
    ComponentesDigitaisAppState,
    ComponentesDigitaisState,
    getComponentesDigitaisAppState
} from 'app/main/apps/pesquisa/componentes-digitais/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {ComponenteDigital} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getComponentesDigitaisState: any = createSelector(
    getComponentesDigitaisAppState,
    (state: ComponentesDigitaisAppState) => state.componentesDigitais
);

export const getComponentesDigitaisIds: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.entitiesId
);

export const getComponentesDigitais: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getComponentesDigitaisIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.pagination
);

export const getIsLoading: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.loading
);
