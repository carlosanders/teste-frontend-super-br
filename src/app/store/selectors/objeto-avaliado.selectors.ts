import {createSelector} from '@ngrx/store';
import {ObjetoAvaliado} from '@cdk/models';
import {objetoAvaliado as objetoAvaliadoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {getObjetoAvaliadoState} from '../reducers';
import {ObjetoAvaliadoState} from '../reducers/objeto-avaliado.reducer';

const schemaSelectors = createSchemaSelectors<ObjetoAvaliado>(objetoAvaliadoSchema);

export const getObjetoAvaliadoId: any = createSelector(
    getObjetoAvaliadoState,
    (state: ObjetoAvaliadoState) => state.objetoAvaliadoId
);

export const getObjetoAvaliado: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getObjetoAvaliadoId,
    schemaSelectors.entityProjector
);

export const getIsLoadingObjetoAvaliado: any = createSelector(
    getObjetoAvaliadoState,
    (state: ObjetoAvaliadoState) => state.loading
);

export const getObjetoAvaliadoLoaded: any = createSelector(
    getObjetoAvaliadoState,
    (state: ObjetoAvaliadoState) => state.loaded
);

export const getObjetoAvaliadoFromRedux = (objetoId: number, classe: string): any => createSelector(
    schemaSelectors.getEntities,
    (entities) => entities?.find(e => e.classe === classe && e.objetoId === objetoId)
);
