import * as AnexarCopiaActions from '../actions/anexar-copia.actions';

export interface AnexarCopiaState {
    processoId: number;
    loaded: any;
}

export const anexarCopiaInitialState: AnexarCopiaState = {
    processoId: null,
    loaded: false
};

export const anexarCopiaReducer = (state = anexarCopiaInitialState, action: AnexarCopiaActions.AnexarCopiaActionsAll): AnexarCopiaState => {
    switch (action.type) {

        case AnexarCopiaActions.GET_PROCESSO: {
            return {
                ...state,
                processoId: null,
                loaded: false
            };
        }

        case AnexarCopiaActions.GET_PROCESSO_SUCCESS: {
            return {
                ...state,
                processoId: action.payload.processoId,
                loaded: action.payload.loaded
            };
        }

        case AnexarCopiaActions.GET_PROCESSO_FAILED: {
            return {
                ...state,
                processoId: null,
                loaded: false
            };
        }

        case AnexarCopiaActions.UNLOAD_COPIA: {
            return {
                ...anexarCopiaInitialState
            };
        }

        default:
            return state;
    }
};
