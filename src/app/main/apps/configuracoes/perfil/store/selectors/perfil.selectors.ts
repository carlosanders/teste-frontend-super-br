import {createSelector} from '@ngrx/store';
import {getProfileAppState, ProfileAppState, ProfileState} from '../reducers';
import {createSchemaSelectors} from "@cdk/ngrx-normalizr";
import {ComponenteDigital} from "@cdk/models";
import {componenteDigital as componenteDigitalSchema} from "@cdk/normalizr";

const componenteDigitalSchemaSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getProfileState = createSelector(
    getProfileAppState,
    (state: ProfileAppState) => state.assunto
);

export const getIsSaving = createSelector(
    getProfileState,
    (state: ProfileState) => state.saving
);

export const getErrors = createSelector(
    getProfileState,
    (state: ProfileState) => state.errors
);

export const getImgPerfilId = createSelector(
    getProfileState,
    (state: ProfileState) => state.imgPerfilId
);

export const getImgPerfil = createSelector(
    componenteDigitalSchemaSelectors.getNormalizedEntities,
    getImgPerfilId,
    componenteDigitalSchemaSelectors.entityProjector
);

export const getImgChancelaId = createSelector(
    getProfileState,
    (state: ProfileState) => state.imgChancelaId
);

export const getImgChancela = createSelector(
    componenteDigitalSchemaSelectors.getNormalizedEntities,
    getImgChancelaId,
    componenteDigitalSchemaSelectors.entityProjector
);
