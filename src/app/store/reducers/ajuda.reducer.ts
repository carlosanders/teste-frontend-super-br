import * as AjudaActions from '../actions/ajuda.action';
import {Topico} from '../../../ajuda/topico';

export interface AjudaState {
    topicos: Topico[];
}

export const AjudaInitialState: AjudaState = {
    topicos: []
};

export function AjudaReducer(state = AjudaInitialState, action: AjudaActions.AjudaActionsAll): AjudaState {
    switch (action.type) {

        case AjudaActions.ADD_TOPICO: {
            return {
                topicos: [...state.topicos, action.payload.topico]
            };
        }

        default:
            return state;
    }
}
