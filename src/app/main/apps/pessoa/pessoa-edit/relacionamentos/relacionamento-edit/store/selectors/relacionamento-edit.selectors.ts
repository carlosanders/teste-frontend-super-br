import {createSelector} from '@ngrx/store';
import {getRelacionamentoEditAppState, RelacionamentoEditAppState, RelacionamentoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {RelacionamentoPessoal} from '@cdk/models/relacionamento-pessoal.model';
import {relacionamentoPessoal as relacionamentoSchema} from '@cdk/normalizr/relacionamento-pessoal.schema';

const schemaRelacionamentoSelectors = createSchemaSelectors<RelacionamentoPessoal>(relacionamentoSchema);

export const getRelacionamentoEditState = createSelector(
    getRelacionamentoEditAppState,
    (state: RelacionamentoEditAppState) => state.relacionamento
);

export const getRelacionamentoId = createSelector(
    getRelacionamentoEditState,
    (state: RelacionamentoEditState) => state.loaded ? state.loaded.value : null
);

export const getRelacionamento = createSelector(
    schemaRelacionamentoSelectors.getNormalizedEntities,
    getRelacionamentoId,
    schemaRelacionamentoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRelacionamentoEditState,
    (state: RelacionamentoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getRelacionamentoEditState,
    (state: RelacionamentoEditState) => state.loaded
);

export const getErrors = createSelector(
    getRelacionamentoEditState,
    (state: RelacionamentoEditState) => state.errors
);
