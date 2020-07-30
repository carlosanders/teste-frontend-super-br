import * as NotificacaoActions from '../actions';
import {Notificacao} from '../../../@cdk/models';

export interface NotificacaoState {
    notiticacoes: Notificacao[];
}

export const NotificacaoInitialState: NotificacaoState = {
    notiticacoes: []
};

export function NotificacaoReducer(
    state = NotificacaoInitialState,
    action: NotificacaoActions.NotificacaoActionsAll
): NotificacaoState {
    switch (action.type) {

        case NotificacaoActions.GET_NOTIFICACOES: {
            return {
                ...state,
            };
        }

        case NotificacaoActions.GET_NOTIFICACOES_SUCCESS: {
            return {
                ...state,
            };
        }

        case NotificacaoActions.RELOAD_NOTIFICACOES: {
            return {
                ...state,
            };
        }

        case NotificacaoActions.GET_NOTIFICACOES_FAILED: {
            return {
                ...state,
            };
        }

        default:
            return state;
    }
}
