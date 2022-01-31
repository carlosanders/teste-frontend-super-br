import {createSelector} from '@ngrx/store';
import {Avaliacao} from '@cdk/models';
import {avaliacao as avaliacaoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {getAvaliacaoState} from '../reducers';
import {AvaliacaoState} from '../reducers/avaliacao.reducer';

const schemaSelectors = createSchemaSelectors<Avaliacao>(avaliacaoSchema);

export const getAvaliacaoId: any = createSelector(
    getAvaliacaoState,
    (state: AvaliacaoState) => state.avaliacaoId
);

export const getAvaliacao: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAvaliacaoId,
    schemaSelectors.entityProjector
);

export const getIsSavingAvaliacao: any = createSelector(
    getAvaliacaoState,
    (state: AvaliacaoState) => state.saving
);

export const getErrorsAvaliacao: any = createSelector(
    getAvaliacaoState,
    (state: AvaliacaoState) => state.errors
);

