import * as DesentranhamentoCreateBlocoActions from '../actions/desentranhamento-create-bloco.actions';

export interface DesentranhamentoCreateBlocoState {
    savingJuntadasId: number[];
    errors: any;
}

export const DesentranhamentoCreateInitialState: DesentranhamentoCreateBlocoState = {
    savingJuntadasId: [],
    errors: false
};

export function DesentranhamentoCreateBlocoReducer(
    state = DesentranhamentoCreateInitialState, action: DesentranhamentoCreateBlocoActions.DesentranhamentoCreateBlocoActionsAll
): DesentranhamentoCreateBlocoState {
    switch (action.type) {

        case DesentranhamentoCreateBlocoActions.CREATE_DESENTRANHAMENTO: {
            return {
                savingJuntadasId: [],
                errors: false
            };
        }

        case DesentranhamentoCreateBlocoActions.SAVE_DESENTRANHAMENTO: {
            return {
                ...state,
                savingJuntadasId: [...state.savingJuntadasId, action.payload.juntada.id]
            };
        }

        case DesentranhamentoCreateBlocoActions.SAVE_DESENTRANHAMENTO_SUCCESS: {
            return {
                ...state,
                savingJuntadasId: state.savingJuntadasId.filter(id => id !== action.payload.juntada.id)
            };
        }

        case DesentranhamentoCreateBlocoActions.SAVE_DESENTRANHAMENTO_FAILED: {
            return {
                ...state,
                savingJuntadasId: state.savingJuntadasId.filter(id => id !== action.payload.juntada.id),
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
