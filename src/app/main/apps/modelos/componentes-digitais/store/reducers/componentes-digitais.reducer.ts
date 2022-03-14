import * as ComponentesDigitaisActions from '../actions';

export interface ComponentesDigitaisState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    saving: boolean;
    errors: any;
}

export const componentesDigitaisInitialState: ComponentesDigitaisState = {
    entitiesId: [],
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        gridFilter: {},
        // eslint-disable-next-line max-len
        populate: ['populateAll', 'documento', 'documento.tipoDocumento', 'documento.juntadaAtual', 'documento.juntadaAtual.volume', 'documento.juntadaAtual.volume.processo', 'documento.juntadaAtual.criadoPor'],
        sort: {},
        total: 0,
    },
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export const componentesDigitaisReducer = (
    state = componentesDigitaisInitialState,
    action: ComponentesDigitaisActions.ComponentesDigitaisActionsAll
): ComponentesDigitaisState => {
    switch (action.type) {

        case ComponentesDigitaisActions.GET_COMPONENTES_DIGITAIS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case ComponentesDigitaisActions.SET_LOADED: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                loading: false,
                loaded
            };
        }

        case ComponentesDigitaisActions.GET_COMPONENTES_DIGITAIS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case ComponentesDigitaisActions.RELOAD_COMPONENTES_DIGITAIS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ComponentesDigitaisActions.GET_COMPONENTES_DIGITAIS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        case ComponentesDigitaisActions.SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: true,
                loading: true,
                loaded: false
            };
        }

        case ComponentesDigitaisActions.SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponentesDigitaisActions.SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload.error,
                loading: false
            };
        }

        default:
            return state;
    }
};
