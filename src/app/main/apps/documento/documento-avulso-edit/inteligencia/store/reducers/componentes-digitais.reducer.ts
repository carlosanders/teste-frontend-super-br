import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

export interface ComponenteDigitalState {
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
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    componenteDigitalId: number;
    repositorio: string;
}

export const ComponenteDigitalInitialState: ComponenteDigitalState = {
    entitiesId: [],
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    saving: false,
    errors: false,
    loading: null,
    loaded: null,
    componenteDigitalId: null,
    repositorio: null,
    deletedIds: [],
    deletingIds: []
};

export function ComponenteDigitalReducer(state = ComponenteDigitalInitialState, action: ComponenteDigitalActions.ComponenteDigitalActionsAll): ComponenteDigitalState {
    switch (action.type) {

        case ComponenteDigitalActions.RELOAD_COMPONENTES_DIGITAIS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ComponenteDigitalActions.GET_COMPONENTES_DIGITAIS: {
            return {
                ...state,
                entitiesId: null,
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

        case ComponenteDigitalActions.GET_COMPONENTES_DIGITAIS_SUCCESS: {
            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL: {
            return {
                ...state,
                componenteDigitalId: null,
                loading: action.payload.repositorioId,
                saving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                componenteDigitalId: action.payload.componenteDigitalId,
                loading: null,
                loaded: action.payload.repositorioId,
                saving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                componenteDigitalId: null,
                loading: null,
                loaded: null,
                saving: false,
                errors: action.payload
            };
        }

        case ComponenteDigitalActions.SET_REPOSITORIO_COMPONENTE_DIGITAL: {
            return {
                ...state,
                loaded: action.payload ? state.loaded : null,
                repositorio: action.payload
            };
        }

        case ComponenteDigitalActions.UNLOAD_REPOSITORIO_COMPONENTE_DIGITAL: {
            return {
                ...ComponenteDigitalInitialState
            };
        }

        default:
            return state;
    }
}
