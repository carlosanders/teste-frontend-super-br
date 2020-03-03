import {getRealizarTransicaoAppState, RealizarTransicaoAppState, RealizarTransicaoState} from "../reducers";
import {createSelector} from "@ngrx/store";


export const getRealizarTransicaoState = createSelector(
    getRealizarTransicaoAppState,
    (state: RealizarTransicaoAppState) => state.transicao
);

export const getIsSaving = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.saving
);

export const getHasLoaded = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.loaded
);

export const getErrors = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.errors
);

export const getLoagind = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.loading
);
