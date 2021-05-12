import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import {createSelector} from '@ngrx/store';
import {ArquivistaDetailAppState, ArquivistaDetailState, getArquivistaDetailAppState} from '../reducers/';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getArquivistaDetailState = createSelector(
    getArquivistaDetailAppState,
    (state: ArquivistaDetailAppState) => state.arquivistaDetail
);

export const getMaximizado = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.maximizado
);

export const getSavingVinculacaoEtiquetaId = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.savingVinculacaoEtiquetaId
);

