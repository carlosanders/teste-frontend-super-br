import {createSelector} from '@ngrx/store';
import {DadosBasicosAppState, getDadosBasicosAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {configuracaoNup as configuracaoNupSchema} from '@cdk/normalizr';
import {ConfiguracaoNup} from '@cdk/models/configuracao-nup.model';
import {ConfiguracaoNupState} from '../reducers/configuracao-nup.reducer';

const schemaSelectors = createSchemaSelectors<ConfiguracaoNup>(configuracaoNupSchema);

export const getConfiguracaoNupState: any = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.configuracaoNup
);

export const getConfiguracaoNupIds: any = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.entitiesId
);

export const getConfiguracaoNup: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getConfiguracaoNupIds,
    schemaSelectors.entitiesProjector
);

export const getConfiguracaoNupPagination: any = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.pagination
);

export const getConfiguracaoNupLoaded: any = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.loaded
);

export const getConfiguracaoNupIsLoading: any = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.loading
);

export const getConfiguracaoNupErrors: any = createSelector(
    getConfiguracaoNupState,
    (state: ConfiguracaoNupState) => state.errors
);
