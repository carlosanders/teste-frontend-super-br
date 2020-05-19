import * as NumeroUnicoDocumentoActions from '../actions/numero-unico-documento.actions';

export interface NumeroUnicoDocumentoState {
    setorId: number;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const NumeroUnicoDocumentoInitialState: NumeroUnicoDocumentoState = {
    setorId: null,
    errors: false,
    loading: false,
    loaded: false,
};

export function NumeroUnicoDocumentoReducer(
    state = NumeroUnicoDocumentoInitialState,
    action: NumeroUnicoDocumentoActions.NumeroUnicoDocumentoActionsAll
): NumeroUnicoDocumentoState {
    switch (action.type) {

        case NumeroUnicoDocumentoActions.GET_SETOR_SUCCESS: {

            return {
                ...state,
                setorId: action.payload.setorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        default:
            return state;
    }
}
