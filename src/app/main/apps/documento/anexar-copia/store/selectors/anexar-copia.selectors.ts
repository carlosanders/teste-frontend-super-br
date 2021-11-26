import {createSelector} from '@ngrx/store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';
import {AnexarCopiaAppState, AnexarCopiaState, getAnexarCopiaAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getAnexarCopiaState: any = createSelector(
    getAnexarCopiaAppState,
    (state: AnexarCopiaAppState) => state.anexarCopia
);

export const getProcessoId: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.processoId
);

export const getProcessoLoaded: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.loaded
);

export const getProcesso: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessoId,
    schemaSelectors.entityProjector
);
