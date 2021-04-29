import {createSelector} from '@ngrx/store';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoShema} from '@cdk/normalizr';
import {
    getArquivistaEditBlocoAppState,
    ArquivistaEditBlocoAppState,
    ArquivistaEditBlocoState
} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store/selectors';

const schemaArquivistaEditBlocoSelectors = createSchemaSelectors<Processo>(processoShema);

export const getArquivistaEditBlocoState = createSelector(
    getArquivistaEditBlocoAppState,
    (state: ArquivistaEditBlocoAppState) => state.arquivistaEditBloco
);

export const getProcessos = createSelector(
    schemaArquivistaEditBlocoSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaArquivistaEditBlocoSelectors.entitiesProjector
);

export const getSavingId = createSelector(
    getArquivistaEditBlocoState,
    (state: ArquivistaEditBlocoState) => state.savingId
);

export const getErrors = createSelector(
    getArquivistaEditBlocoState,
    (state: ArquivistaEditBlocoState) => state.errors
);
