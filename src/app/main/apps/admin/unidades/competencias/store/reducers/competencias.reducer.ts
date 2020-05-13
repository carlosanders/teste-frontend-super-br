import * as CompetenciasActions from '../actions/competencias.actions';

export interface CompetenciasState {
    unidadeId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const CompetenciasInitialState: CompetenciasState = {
    unidadeId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function CompetenciasReducer(
    state = CompetenciasInitialState,
    action: CompetenciasActions.CompetenciasActionsAll
): CompetenciasState {
    switch (action.type) {

        case CompetenciasActions.GET_UNIDADE: {
            return {
                ...state,
                unidadeId: null,
                loading: true
            };
        }

        case CompetenciasActions.GET_UNIDADE_SUCCESS: {

            return {
                ...state,
                unidadeId: action.payload.unidadeId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CompetenciasActions.GET_UNIDADE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
