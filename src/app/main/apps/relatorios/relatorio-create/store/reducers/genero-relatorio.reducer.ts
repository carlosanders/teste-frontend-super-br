import * as GeneroRelatorioActions from '../actions/genero-relatorio.actions';

export interface GeneroRelatorioState {
    generoRelatoriosId: number[];
    generoRelatoriosLoaded: any;
    loading: boolean;
    loaded: boolean;
    errors: any;
}

export const GeneroRelatorioInitialState: GeneroRelatorioState = {
    generoRelatoriosId: [],
    generoRelatoriosLoaded: false,
    loading: false,
    loaded: false,
    errors: false
};

export function GeneroRelatorioReducer(state = GeneroRelatorioInitialState, action: GeneroRelatorioActions.GeneroRelatorioActionsAll): GeneroRelatorioState {
    switch (action.type) {

        case GeneroRelatorioActions.GET_GENERO_RELATORIOS_SUCCESS: {
            return {
                ...state,
                generoRelatoriosId: action.payload.entitiesId,
                generoRelatoriosLoaded: true,
            };
        }

        case GeneroRelatorioActions.GET_GENERO_RELATORIOS_FAILED: {
            return {
                ...state,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
