import * as RootLotacoesActions from '../actions/lotacoes.actions';

export interface RootLotacoesState {
    setorId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RootLotacoesInitialState: RootLotacoesState = {
    setorId: null,
    errors: false,
    loading: false,
    loaded: false,
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
                loading: true
            };
        }

        case RootLotacoesActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RootLotacoesActions.GET_SETOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
