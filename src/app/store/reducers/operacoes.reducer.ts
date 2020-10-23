import * as OperacoesActions from '../actions/operacoes.actions';
import * as moment from 'moment';

export interface Operacao {
    id: string;
    type: string;
    content: any;
    status: number;
    lote: string;
    dateTime: string;
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
    loteIdAtual: string;
    operacaoIdAtual: string;
}

export const OperacoesInitialState: OperacoesState = {
    type: null,
    content: null,
    success: null,
    dateTime: null,
    operacoes: {},
    lotes: {},
    loteIdAtual: null,
    operacaoIdAtual: null
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
            const operacoes = {
                ...state.operacoes,
                [action.payload.id]: {
                    ...action.payload,
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
                operacaoIdAtual: action.payload.id,
                lotes: lotes,
                loteIdAtual: action.payload.lote,
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
