import * as OperacoesActions from '../actions/operacoes.actions';

export interface OperacoesState {
    type: string;
    content: any;
    success: boolean;
    dateTime: string;
}

export const OperacoesInitialState: OperacoesState = {
    type: null,
    content: null,
    success: null,
    dateTime: null
};

export function OperacoesReducer(state = OperacoesInitialState, action: OperacoesActions.OperacoesActionsAll): OperacoesState {
    switch (action.type) {

        case OperacoesActions.RESULTADO: {
            return {
                type: action.payload.type,
                content: action.payload.content,
                dateTime: action.payload.dateTime,
                success: action.payload.success
            };
        }

        default:
            return state;
    }
}
