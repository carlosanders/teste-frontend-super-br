import {createSelector} from '@ngrx/store';
import {getDadosBasicosAppState, DadosBasicosAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {configuracaoNup as configuracaoNupSchema} from '@cdk/normalizr';
import {ConfiguracaoNup} from "../../../../../../../../@cdk/models/configuracao-nup.model";
import {ConfiguracaoNupState} from "../reducers/configuracao-nup.reducer";

const schemaSelectors = createSchemaSelectors<ConfiguracaoNup>(configuracaoNupSchema);

export const getConfiguracaoNupState = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.configuracaoNup
);

export const getConfiguracaoNupIds = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.entitiesId
);

export const getConfiguracaoNup = createSelector(
    schemaSelectors.getNormalizedEntities,
    getConfiguracaoNupIds,
    schemaSelectors.entitiesProjector
);

export const getConfiguracaoNupPagination = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.pagination
);

export const getConfiguracaoNupLoaded = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.loaded
);

export const getConfiguracaoNupIsLoading = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.loading
);

export const getConfiguracaoNupErrors = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.errors
);
