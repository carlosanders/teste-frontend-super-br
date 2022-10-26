import * as AnexosActions from '../actions/anexos.actions';

export interface AnexosState {
    componentesDigitaisId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
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
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
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
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case AnexosActions.GET_ANEXOS_SUCCESS: {
            return {
                ...state,
                loading: false,
                componentesDigitaisId: [...state.componentesDigitaisId, ...action.payload.entitiesId],
                documentosLoaded: action.payload.loaded,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                }
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
