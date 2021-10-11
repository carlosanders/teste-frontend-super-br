import {createSelector} from '@ngrx/store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Visibilidade} from '@cdk/models';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import * as fromStore from '../index';

const schemaVisibilidadeSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getClassificacaoVisibilidadeEditState = createSelector(
    fromStore.getClassificacaoVisibilidadeEditAppState,
    (state: fromStore.ClassificacaoVisibilidadeEditAppState) => state.classificacaoVisibilidade
);

export const getClassificacaoVisibilidadeId = createSelector(
    getClassificacaoVisibilidadeEditState,
    (state: fromStore.ClassificacaoVisibilidadeEditState) => state.loaded ? state.loaded.value : null
);

export const getClassificacaoVisibilidade = createSelector(
    schemaVisibilidadeSelectors.getNormalizedEntities,
    getClassificacaoVisibilidadeId,
    schemaVisibilidadeSelectors.entityProjector
);

export const getClassificacaoVisibilidadeIsSaving = createSelector(
    getClassificacaoVisibilidadeEditState,
    (state: fromStore.ClassificacaoVisibilidadeEditState) => state.saving
);

export const getClassificacaoVisibilidadeHasLoaded = createSelector(
    getClassificacaoVisibilidadeEditState,
    (state: fromStore.ClassificacaoVisibilidadeEditState) => state.loaded
);

export const getClassificacaoVisibilidadeErrors = createSelector(
    getClassificacaoVisibilidadeEditState,
    (state: fromStore.ClassificacaoVisibilidadeEditState) => state.errors
);
