import {createSelector} from '@ngrx/store';
import {ProcessoViewAppState, AssinaturasState, getProcessoViewAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assinatura as assinaturaSchema} from '@cdk/normalizr';
import {Assinatura} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Assinatura>(assinaturaSchema);

export const getAssinaturasState: any = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state.assinaturas
);

export const getAssinaturasIds: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.entitiesId
);

export const getAssinaturas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssinaturasIds,
    schemaSelectors.entitiesProjector
);

export const getAssinaturasPagination: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.pagination
);

export const getAssinaturasIsLoaded: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.loaded
);

export const getAssinaturasIsLoading: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.loading
);
