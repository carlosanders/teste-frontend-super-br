import * as OperacoesActions from '../actions/operacoes.actions';
import * as moment from 'moment';

export interface Operacao {
    id: string;
    type: string;
    content: any;
    status: number;
    lote: string;
    dateTime: string;
    redo: any;
    undo: any;
}

export interface Lote {
    id: string;
    dateTime: string;
    operacoesId: string[];
}

export interface OperacoesState {
    type: string;
    content: any;
    success: boolean;
    dateTime: string;
    operacoes: { [id: string]: Operacao };
    lotes: { [id: string]: Lote };
}

export const OperacoesInitialState: OperacoesState = {
    type: null,
    content: null,
    success: null,
    dateTime: null,
    operacoes: {},
    lotes: {}
};

export function OperacoesReducer(state = OperacoesInitialState, action: OperacoesActions.OperacoesActionsAll): OperacoesState {
    switch (action.type) {

        case OperacoesActions.RESULTADO: {
            return {
                ...state,
                type: action.payload.type,
                content: action.payload.content,
                dateTime: (action.payload.dateTime ?? moment()),
                success: action.payload.success
            };
        }

        case OperacoesActions.OPERACAO: {
            let redo = action.payload.redo;
            let undo = action.payload.undo;
            if (redo === 'inherent') {
                redo = state.operacoes[action.payload.id]?.redo;
            }
            if (undo === 'inherent') {
                undo = state.operacoes[action.payload.id]?.undo;
            }
            const operacoes = {
                ...state.operacoes,
                [action.payload.id]: {
                    ...action.payload,
                    redo: redo,
                    undo: undo,
                    dateTime: (action.payload.dateTime ?? moment())
                }
            };
            let lotes = state.lotes;
            if (action.payload.lote) {
                lotes = {
                    ...state.lotes,
                    [action.payload.lote]: {
                        dateTime: (state.lotes[action.payload.lote]?.dateTime ?? moment()),
                        operacoes: state.lotes[action.payload.lote]?.operacoesId ? [...state.lotes[action.payload.lote].operacoesId, action.payload.id] : [action.payload.id]
                    }
                };
            }

            return {
                ...state,
                operacoes: operacoes,
                lotes: lotes,
                type: action.payload.type,
                content: action.payload.content,
                dateTime: (action.payload.dateTime ?? moment()),
                success: action.payload.success
            };
        }

        default:
            return state;
    }
}
