import * as AnexarCopiaActions from '../actions/anexar-copia.actions';

export interface AnexarCopiaState {
    processoId: number;
}

export const anexarCopiaInitialState: AnexarCopiaState = {
    processoId: null
};

export const anexarCopiaReducer = (state = anexarCopiaInitialState, action: AnexarCopiaActions.AnexarCopiaActionsAll): AnexarCopiaState => {
    switch (action.type) {

        case AnexarCopiaActions.GET_PROCESSO: {
            return {
                ...state,
                processoId: action.payload
            };
        }

        default:
            return state;
    }
};
