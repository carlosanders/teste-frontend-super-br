import {createSelector} from '@ngrx/store';
import {getVinculacaoPessoaBarramentoEditAppState, VinculacaoPessoaBarramentoEditAppState, VinculacaoPessoaBarramentoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoPessoaBarramento as vinculacaoPessoaBarramentoSchema} from '@cdk/normalizr/index';
import {VinculacaoPessoaBarramento} from "@cdk/models/vinculacao-pessoa-barramento";

const schemaVinculacaoPessoaBarramentoSelectors = createSchemaSelectors<VinculacaoPessoaBarramento>(vinculacaoPessoaBarramentoSchema);

export const getVinculacaoPessoaBarramentoEditState: any = createSelector(
    getVinculacaoPessoaBarramentoEditAppState,
    (state: VinculacaoPessoaBarramentoEditAppState) => state.vinculacaoPessoaBarramento
);

export const getVinculacaoPessoaBarramentoId: any = createSelector(
    getVinculacaoPessoaBarramentoEditState,
    (state: VinculacaoPessoaBarramentoEditState) => state.loaded ? state.loaded.value : null
);

export const getVinculacaoPessoaBarramento: any = createSelector(
    schemaVinculacaoPessoaBarramentoSelectors.getNormalizedEntities,
    getVinculacaoPessoaBarramentoId,
    schemaVinculacaoPessoaBarramentoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getVinculacaoPessoaBarramentoEditState,
    (state: VinculacaoPessoaBarramentoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getVinculacaoPessoaBarramentoEditState,
    (state: VinculacaoPessoaBarramentoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getVinculacaoPessoaBarramentoEditState,
    (state: VinculacaoPessoaBarramentoEditState) => state.errors
);
