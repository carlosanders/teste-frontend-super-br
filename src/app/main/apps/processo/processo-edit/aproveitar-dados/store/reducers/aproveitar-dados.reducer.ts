import * as AproveitarDadosActions from '../actions/aproveitar-dados.actions';

export interface AproveitarDadosState {
    saving: boolean;
    errors: any;
    loaded: any;
}

export const AproveitarDadosInitialState: AproveitarDadosState = {
    saving: false,
    errors: false,
    loaded: false
};

export function AproveitarDadosReducer(state = AproveitarDadosInitialState, action: AproveitarDadosActions.DadosBasicosActionsAll): AproveitarDadosState {
    switch (action.type) {

        case AproveitarDadosActions.CREATE_PROCESSO: {
            return {
                loaded: {
                    id: 'processoHandle',
                    value: 'criar'
                },
                saving: false,
                errors: false
            };
        }

        case AproveitarDadosActions.SET_PROCESSO: {
            return {
                ...state,
                loaded: action.payload
            };
        }

        case AproveitarDadosActions.SAVE_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AproveitarDadosActions.SAVE_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AproveitarDadosActions.SAVE_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
