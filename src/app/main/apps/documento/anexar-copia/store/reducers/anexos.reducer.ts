import * as AnexosActions from '../actions/anexos.actions';

export interface AnexosState {
    componentesDigitaisId: number[];
    documentosLoaded: any;
    selectedComponentesDigitaisId: number[];
    loading: boolean;
    loaded: boolean;
    savingComponentesDigitaisId: number[],
    savedComponentesDigitaisId: number[],
    errorsComponentesDigitaisId: number[],
    errorsComponentesDigitais: any,
    error: any;
}

export const anexosInitialState: AnexosState = {
    componentesDigitaisId: [],
    documentosLoaded: false,
    selectedComponentesDigitaisId: [],
    loading: false,
    loaded: false,
    savingComponentesDigitaisId: [],
    savedComponentesDigitaisId: [],
    errorsComponentesDigitaisId: [],
    errorsComponentesDigitais: {},
    error: null,
};

export const anexosReducer = (
    state = anexosInitialState,
    action: AnexosActions.AnexosActionsAll
): AnexosState => {
    switch (action.type) {

        case AnexosActions.GET_ANEXOS: {
            return {
                ...state,
                loading: true,
            };
        }

        case AnexosActions.GET_ANEXOS_SUCCESS: {
            return {
                ...state,
                loading: false,
                componentesDigitaisId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }

        case AnexosActions.GET_ANEXOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AnexosActions.SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                savingComponentesDigitaisId: [...state.savingComponentesDigitaisId, action.payload.componenteDigitalId]
            };
        }

        case AnexosActions.SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            const errorsComponentesDigitais = {...state.errorsComponentesDigitais};
            delete errorsComponentesDigitais[action.payload.componenteDigitalId];
            return {
                ...state,
                savingComponentesDigitaisId: state.savingComponentesDigitaisId.filter(id => id !== action.payload.componenteDigitalId),
                savedComponentesDigitaisId: [...state.savedComponentesDigitaisId, action.payload.componenteDigitalId],
                selectedComponentesDigitaisId: state.selectedComponentesDigitaisId.filter(id => id !== action.payload.componenteDigitalId),
                errorsComponentesDigitais: errorsComponentesDigitais,
                errorsComponentesDigitaisId: state.errorsComponentesDigitaisId.filter(id => id !== action.payload.componenteDigitalId)
            }
        }

        case AnexosActions.SAVE_COMPONENTE_DIGITAL_FAILED: {
            const errorsComponentesDigitais = {...state.errorsComponentesDigitais};
            errorsComponentesDigitais[action.payload.id] = action.payload.error;
            return {
                ...state,
                savingComponentesDigitaisId: state.savingComponentesDigitaisId.filter(id => id !== action.payload.id),
                errorsComponentesDigitaisId: [...state.errorsComponentesDigitaisId, action.payload.id],
                errorsComponentesDigitais: errorsComponentesDigitais,
            }
        }

        case AnexosActions.CHANGE_SELECTED_ANEXOS: {
            return {
                ...state,
                selectedComponentesDigitaisId: action.payload
            };
        }

        case AnexosActions.UNLOAD_ANEXOS: {
            return {
                ...anexosInitialState
            };
        }

        default:
            return state;
    }
};
