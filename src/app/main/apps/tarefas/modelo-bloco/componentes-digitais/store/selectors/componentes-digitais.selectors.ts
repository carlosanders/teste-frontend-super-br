import {createSelector} from '@ngrx/store';
import {
    ComponentesDigitaisBlocoAppState,
    ComponentesDigitaisState,
    getComponentesDigitaisAppState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {
    componenteDigital as componenteDigitalSchema
} from '@cdk/normalizr';
import {ComponenteDigital} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getComponentesDigitaisState: any = createSelector(
    getComponentesDigitaisAppState,
    (state: ComponentesDigitaisBlocoAppState) => state.componentesDigitais
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

export const getIsSaving: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.saving
);

export const getErrors: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.errors
);

export const getIsLoadingSaving: any = createSelector(
    getComponentesDigitaisState,
    (state: ComponentesDigitaisState) => state.loading
);
