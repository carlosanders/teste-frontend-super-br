import * as SetorActions from '../actions/setor.actions';

export interface SetorState {
    unidadeId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const SetorInitialState: SetorState = {
    unidadeId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function SetorReducer(
    state = SetorInitialState,
    action: SetorActions.SetorActionsAll
): SetorState {
    switch (action.type) {

        case SetorActions.GET_UNIDADE: {
            return {
                ...state,
                unidadeId: null,
                loading: true
            };
        }

        case SetorActions.GET_UNIDADE_SUCCESS: {

            return {
                ...state,
                unidadeId: action.payload.unidadeId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case SetorActions.GET_UNIDADE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
