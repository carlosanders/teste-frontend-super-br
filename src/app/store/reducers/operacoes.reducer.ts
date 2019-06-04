import * as OperacoesActions from '../actions/operacoes.actions';

export interface OperacoesState {
    type: string;
    content: any;
    dateTime: string;
}

export const OperacoesInitialState: OperacoesState = {
    type: null,
    content: null,
    dateTime: null
};

export function OperacoesReducer(state = OperacoesInitialState, action: OperacoesActions.OperacoesActionsAll): OperacoesState {
    switch (action.type) {

        case OperacoesActions.RESULTADO: {
            return {
                type: action.payload.type,
                content: action.payload.content,
                dateTime: action.payload.dateTime
            };
        }

        default:
            return state;
    }
}
