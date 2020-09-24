import * as RootLotacoesActions from '../actions/lotacoes.actions';

export interface RootLotacoesState {
    setorId: number;
    usuarioId: number;
    errors: any;
    loading: boolean;
    loadedSetor: any;
    loaded: any;
}

export const RootLotacoesInitialState: RootLotacoesState = {
    setorId: null,
    usuarioId: null,
    errors: false,
    loading: false,
    loadedSetor: false,
    loaded: false
};

export function RootLotacoesReducer(
    state = RootLotacoesInitialState,
    action: RootLotacoesActions.RootLotacoesActionsAll
): RootLotacoesState {
    switch (action.type) {

        case RootLotacoesActions.GET_SETOR: {
            return {
                ...state,
                setorId: null,
                usuarioId: null,
                loading: true
            };
        }

        case RootLotacoesActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loadedSetor: action.payload.loaded,
                loading: false
            };
        }

        case RootLotacoesActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RootLotacoesActions.GET_USUARIO: {
            return {
                ...state,
                setorId: null,
                usuarioId: null,
                loading: true
            };
        }

        case RootLotacoesActions.GET_USUARIO_SUCCESS: {

            return {
                ...state,
                usuarioId: action.payload.usuarioId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RootLotacoesActions.GET_USUARIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RootLotacoesActions.UNLOAD_USUARIO: {
            return {
                ...state,
                usuarioId: null,
                loading: false,
                loaded: false
            };
        }

        case RootLotacoesActions.UNLOAD_SETOR: {
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
