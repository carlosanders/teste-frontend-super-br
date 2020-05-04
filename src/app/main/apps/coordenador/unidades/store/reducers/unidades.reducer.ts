import * as UnidadesOrgaoCentralActions from '../actions/unidades.actions';

export interface UnidadesOrgaoCentralState {
    unidadeId: number;
    orgaoId: number;
    errors: any;
    loading: boolean;
    loaded: any;
    loadedUnidade: any;
}

export const UnidadesOrgaoCentralInitialState: UnidadesOrgaoCentralState = {
    unidadeId: null,
    orgaoId: null,
    errors: false,
    loading: false,
    loaded: false,
    loadedUnidade: false
};

export function UnidadesOrgaoCentralReducer(
    state = UnidadesOrgaoCentralInitialState,
    action: UnidadesOrgaoCentralActions.UnidadesOrgaoCentralActionsAll
): UnidadesOrgaoCentralState {
    switch (action.type) {

        case UnidadesOrgaoCentralActions.GET_SETOR: {
            return {
                ...state,
                unidadeId: null,
                loading: true
            };
        }

        case UnidadesOrgaoCentralActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                unidadeId: action.payload.unidadeId,
                loadedUnidade: action.payload.loaded,
                loading: false
            };
        }

        case UnidadesOrgaoCentralActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case UnidadesOrgaoCentralActions.GET_ORGAO_CENTRAL: {
            return {
                ...state,
                unidadeId: null,
                orgaoId: null,
                loading: true,
                loadedUnidade: false
            };
        }

        case UnidadesOrgaoCentralActions.GET_ORGAO_CENTRAL_SUCCESS: {

            return {
                ...state,
                orgaoId: action.payload.orgaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case UnidadesOrgaoCentralActions.GET_ORGAO_CENTRAL_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
