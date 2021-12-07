import {createSelector} from '@ngrx/store';
import {AfastamentoEditAppState, AfastamentoEditState, getAfastamentoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Afastamento} from '@cdk/models/afastamento.model';
import {afastamento as afastamentoSchema, usuario as schemaUsuario} from '@cdk/normalizr';
import {getAfastamentosState} from '../../../store/selectors';
import {AfastamentosState} from '../../../store/reducers';
import {Usuario} from '@cdk/models';

const schemaAfastamentoSelectors = createSchemaSelectors<Afastamento>(afastamentoSchema);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(schemaUsuario);

export const getAfastamentoEditState: any = createSelector(
    getAfastamentoEditAppState,
    (state: AfastamentoEditAppState) => state.afastamento
);

export const getAfastamentoId: any = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.loaded ? state.loaded.value : null
);

export const getAfastamento: any = createSelector(
    schemaAfastamentoSelectors.getNormalizedEntities,
    getAfastamentoId,
    schemaAfastamentoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.errors
);

export const getUsuarioId: any = createSelector(
    getAfastamentosState,
    (state: AfastamentosState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);
