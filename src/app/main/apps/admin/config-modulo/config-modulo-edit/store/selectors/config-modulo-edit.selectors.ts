import {createSelector} from '@ngrx/store';
import {getConfigModuleEditAppState, ConfigModuleEditAppState, ConfigModuleEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {configModule as configModuleSchema} from '../../../../../../../../@cdk/normalizr';
import {ConfigModulo} from '../../../../../../../../@cdk/models';

const schemaConfigModuleSelectors = createSchemaSelectors<ConfigModulo>(configModuleSchema);

export const getConfigModuleEditState : any = createSelector(
    getConfigModuleEditAppState,
    (state: ConfigModuleEditAppState) => state.configModule
);

export const getConfigModuleId : any = createSelector(
    getConfigModuleEditState,
    (state: ConfigModuleEditState) => state.entityId
);

export const getConfigModule : any = createSelector(
    schemaConfigModuleSelectors.getNormalizedEntities,
    getConfigModuleId,
    schemaConfigModuleSelectors.entityProjector
);

export const getIsSaving : any = createSelector(
    getConfigModuleEditState,
    (state: ConfigModuleEditState) => state.saving
);

export const getHasLoaded : any = createSelector(
    getConfigModuleEditState,
    (state: ConfigModuleEditState) => state.loaded
);

export const getErrors : any = createSelector(
    getConfigModuleEditState,
    (state: ConfigModuleEditState) => state.errors
);
