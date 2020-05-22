import * as LotacoesActions from '../actions/lotacoes.actions';

export interface LotacoesState {
    setorId: number;
    usuarioId: number;
    errors: any;
    loading: boolean;
    loaded: any;
    loadedSetor: any;
}

export const LotacoesInitialState: LotacoesState = {
    setorId: null,
    usuarioId: null,
    errors: false,
    loading: false,
    loaded: false,
    loadedSetor: false,
};

export function LotacoesReducer(
    state = LotacoesInitialState,
    action: LotacoesActions.LotacoesActionsAll
): LotacoesState {
    switch (action.type) {

        case LotacoesActions.GET_SETOR: {
            return {
                ...state,
                setorId: null,
                usuarioId: null,
                loading: true
            };
        }

        case LotacoesActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loadedSetor: action.payload.loaded,
                loading: false
            };
        }

        case LotacoesActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case LotacoesActions.GET_USUARIO: {
            return {
                ...state,
                setorId: null,
                usuarioId: null,
                loading: true
            };
        }

        case LotacoesActions.GET_USUARIO_SUCCESS: {

            return {
                ...state,
                usuarioId: action.payload.usuarioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case LotacoesActions.GET_USUARIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case LotacoesActions.UNLOAD_USUARIO: {
            return {
                ...state,
                usuarioId: null,
                loading: false,
                loaded: false
            };
        }

        case LotacoesActions.UNLOAD_SETOR: {
            return {
                ...state,
                setorId: null,
                loading: false,
                loadedSetor: false
            };
        }

        default:
            return state;
    }
}
