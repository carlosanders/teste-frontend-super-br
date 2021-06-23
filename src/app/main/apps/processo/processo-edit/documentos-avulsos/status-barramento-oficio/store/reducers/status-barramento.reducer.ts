import * as StatusBarramentoActions from '../actions/status-barramento.actions';

export interface StatusBarramentoState {
    statusBarramentoId: number;
    documentoAvulsoId: number;
    barramentoStatus: number;
    loading: boolean;
    errors: any;
    loaded: any;
}

export const StatusBarramentoInitialState: StatusBarramentoState = {
    statusBarramentoId: null,
    barramentoStatus: null,
    documentoAvulsoId: null,
    loading: false,
    errors: false,
    loaded: false
};

export function StatusBarramentoReducer(state = StatusBarramentoInitialState,
                                        action: StatusBarramentoActions.StatusBarramentoActionsAll): StatusBarramentoState {
    switch (action.type) {
        case StatusBarramentoActions.GET_BARRAMENTO_OFICIO: {
            return {
                ...state,
                loading: true,
                errors: false
            };
        }

        case StatusBarramentoActions.GET_BARRAMENTO_SUCCESS_OFICIO: {

            return {
                ...state,
                statusBarramentoId: action.payload.statusBarramentoId,
                documentoAvulsoId: action.payload.documentoAvulsoId,
                loading: false,
                loaded: action.payload
            };
        }

        case StatusBarramentoActions.GET_BARRAMENTO_FAILED_OFICIO: {
            return {
                ...state,
                statusBarramentoId: null,
                barramentoStatus: null,
                loading: false
            };
        }

        default:
            return state;
    }
}
