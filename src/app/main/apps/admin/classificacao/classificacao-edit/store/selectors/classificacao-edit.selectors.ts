import {createSelector} from '@ngrx/store';
import {getClassificacaoEditAppState, ClassificacaoEditAppState, ClassificacaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Classificacao} from '@cdk/models';
import {classificacao as classificacaoSchema} from '@cdk/normalizr';

const schemaClassificacaoSelectors = createSchemaSelectors<Classificacao>(classificacaoSchema);

export const getClassificacaoEditState = createSelector(
    getClassificacaoEditAppState,
    (state: ClassificacaoEditAppState) => state.classificacao
);

export const getClassificacaoId = createSelector(
    getClassificacaoEditState,
    (state: ClassificacaoEditState) => state.entityId
);

export const getClassificacao = createSelector(
    schemaClassificacaoSelectors.getNormalizedEntities,
    getClassificacaoId,
    schemaClassificacaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getClassificacaoEditState,
    (state: ClassificacaoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getClassificacaoEditState,
    (state: ClassificacaoEditState) => state.loaded
);

export const getErrors = createSelector(
    getClassificacaoEditState,
    (state: ClassificacaoEditState) => state.errors
);
