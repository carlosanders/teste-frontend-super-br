import {createSelector} from '@ngrx/store';
import {getRelacionamentoEditAppState, RelacionamentoEditAppState, RelacionamentoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {RelacionamentoPessoal} from '@cdk/models';
import {relacionamentoPessoal as relacionamentoSchema} from '@cdk/normalizr';

const schemaRelacionamentoSelectors = createSchemaSelectors<RelacionamentoPessoal>(relacionamentoSchema);

export const getRelacionamentoEditState: any = createSelector(
    getRelacionamentoEditAppState,
    (state: RelacionamentoEditAppState) => state.relacionamento
);

export const getRelacionamentoId: any = createSelector(
    getRelacionamentoEditState,
    (state: RelacionamentoEditState) => state.loaded ? state.loaded.value : null
);

export const getRelacionamento: any = createSelector(
    schemaRelacionamentoSelectors.getNormalizedEntities,
    getRelacionamentoId,
    schemaRelacionamentoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRelacionamentoEditState,
    (state: RelacionamentoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRelacionamentoEditState,
    (state: RelacionamentoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRelacionamentoEditState,
    (state: RelacionamentoEditState) => state.errors
);
