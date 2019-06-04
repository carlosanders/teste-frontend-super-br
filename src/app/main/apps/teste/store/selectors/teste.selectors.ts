import { createSelector } from '@ngrx/store';
import { getTesteAppState, TesteAppState, TesteState } from 'app/main/apps/teste/store/reducers';

export const getTesteState = createSelector(
    getTesteAppState,
    (state: TesteAppState) => state.teste
);

export const getTeste = createSelector(
    getTesteState,
    (state: TesteState) => state.entities
);

export const getTotal = createSelector(
    getTesteState,
    (state: TesteState) => state.total
);

export const getTesteIsLoading = createSelector(
    getTesteState,
    (state: TesteState) => state.loading
);

export const getCurrentTeste = createSelector(
    getTesteState,
    (state: TesteState) => state.currentTeste
);

export const getCurrentTesteLoaded = createSelector(
    getTesteState,
    (state: TesteState) => state.currentTeste.loaded
);

export const getDeletingTesteIds = createSelector(
    getTesteState,
    (state: TesteState) => state.deletingTesteIds
);

export const getDeletedTesteIds = createSelector(
    getTesteState,
    (state: TesteState) => state.deletedTesteIds
);
