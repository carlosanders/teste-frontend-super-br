import {createSelector} from '@ngrx/store';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoShema} from '@cdk/normalizr';
import {ArquivistaEditBlocoAppState, ArquivistaEditBlocoState, getArquivistaEditBlocoAppState} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store/selectors';

const schemaArquivistaEditBlocoSelectors = createSchemaSelectors<Processo>(processoShema);

export const getArquivistaEditBlocoState: any = createSelector(
    getArquivistaEditBlocoAppState,
    (state: ArquivistaEditBlocoAppState) => state.arquivistaEditBloco
);

export const getProcessos: any = createSelector(
    schemaArquivistaEditBlocoSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaArquivistaEditBlocoSelectors.entitiesProjector
);

export const getSavingId: any = createSelector(
    getArquivistaEditBlocoState,
    (state: ArquivistaEditBlocoState) => state.savingId
);

export const getErrors: any = createSelector(
    getArquivistaEditBlocoState,
    (state: ArquivistaEditBlocoState) => state.errors
);
