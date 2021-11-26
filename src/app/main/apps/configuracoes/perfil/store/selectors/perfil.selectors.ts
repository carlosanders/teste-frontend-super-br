import {createSelector} from '@ngrx/store';
import {getProfileAppState, ProfileAppState, ProfileState} from '../reducers';
import {createSchemaSelectors} from "@cdk/ngrx-normalizr";
import {ComponenteDigital} from "@cdk/models";
import {componenteDigital as componenteDigitalSchema} from "@cdk/normalizr";

const componenteDigitalSchemaSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getProfileState: any = createSelector(
    getProfileAppState,
    (state: ProfileAppState) => state.assunto
);

export const getIsSaving: any = createSelector(
    getProfileState,
    (state: ProfileState) => state.saving
);

export const getErrors: any = createSelector(
    getProfileState,
    (state: ProfileState) => state.errors
);

export const getImgPerfilId: any = createSelector(
    getProfileState,
    (state: ProfileState) => state.imgPerfilId
);

export const getImgPerfil: any = createSelector(
    componenteDigitalSchemaSelectors.getNormalizedEntities,
    getImgPerfilId,
    componenteDigitalSchemaSelectors.entityProjector
);

export const getImgChancelaId: any = createSelector(
    getProfileState,
    (state: ProfileState) => state.imgChancelaId
);

export const getImgChancela: any = createSelector(
    componenteDigitalSchemaSelectors.getNormalizedEntities,
    getImgChancelaId,
    componenteDigitalSchemaSelectors.entityProjector
);
