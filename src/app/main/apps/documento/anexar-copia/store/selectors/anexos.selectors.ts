import {createSelector} from '@ngrx/store';
import {AnexarCopiaAppState, AnexosState, getAnexarCopiaAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';

const schemaSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getAnexosState: any = createSelector(
    getAnexarCopiaAppState,
    (state: AnexarCopiaAppState) => state.anexos
);

export const getAnexosId: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.componentesDigitaisId
);

export const getAnexos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAnexosId,
    schemaSelectors.entitiesProjector
);

export const getIsLoadingAnexos: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.loading
);

export const getAnexosHasLoaded: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.documentosLoaded
);

export const getSelectedAnexosIds: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.selectedComponentesDigitaisId
);

export const getSelectedAnexos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedAnexosIds,
    schemaSelectors.entitiesProjector
);

export const getSavingComponentesDigitaisIds: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.savingComponentesDigitaisId
);

export const getSavedComponentesDigitaisIds: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.savedComponentesDigitaisId
);

export const getErrorsComponentesDigitaisIds: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.errorsComponentesDigitaisId
);

export const getErrorsComponentesDigitais: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.errorsComponentesDigitais
);

export const getComponentesDigitaisError: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.error
);

export const getAnexosPagination: any = createSelector(
    getAnexosState,
    (state: AnexosState) => state.pagination
);
