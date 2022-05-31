import * as ComponentesDigitaisActions from 'app/main/apps/pesquisa/componentes-digitais/store/actions';

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
}

export const ComponentesDigitaisInitialState: ComponentesDigitaisState = {
    entitiesId: [],
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: ['populateAll', 'documento', 'documento.tipoDocumento', 'documento.juntadaAtual', 'documento.juntadaAtual.volume', 'documento.juntadaAtual.volume.processo', 'documento.juntadaAtual.criadoPor', 'documento.setorOrigem', 'documento.setorOrigem.unidade'],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false
};

export function ComponentesDigitaisReducer(state = ComponentesDigitaisInitialState, action: ComponentesDigitaisActions.ComponentesDigitaisActionsAll): ComponentesDigitaisState {
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

        default:
            return state;
    }
}
