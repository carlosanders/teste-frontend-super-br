import * as JuntadaCreateBlocoActions
    from 'app/main/apps/processo/processo-edit/juntadas/desentranhamento-create-bloco/store/actions';

export interface JuntadaCreateBlocoState {
    entitiesId: number[];
    selectedJuntadasIds: number[];
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
    desentranhandoIds: number[];
    desentranhadoIds: number[];
    bufferingDesentranhando: number;
    copiandoIds: number[];
    copiadoIds: number[];
    savingJuntadasId: number[];
    errors: any;
    errorsDesentranhando: number[];
}

export const JuntadaCreateBlocoInitialState: JuntadaCreateBlocoState = {
    entitiesId: [],
    selectedJuntadasIds: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    desentranhadoIds: [],
    desentranhandoIds: [],
    bufferingDesentranhando: 0,
    copiandoIds: [],
    copiadoIds: [],
    savingJuntadasId: [],
    errors: false,
    errorsDesentranhando: []
};

export function JuntadaCreateBlocoReducer(state = JuntadaCreateBlocoInitialState, action: JuntadaCreateBlocoActions.JuntadaCreateBlocoActionsAll): JuntadaCreateBlocoState {
    switch (action.type) {
        case JuntadaCreateBlocoActions.GET_JUNTADAS: {
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

        case JuntadaCreateBlocoActions.GET_JUNTADAS_SUCCESS: {

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

        case JuntadaCreateBlocoActions.GET_JUNTADAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case JuntadaCreateBlocoActions.RELOAD_JUNTADAS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case JuntadaCreateBlocoActions.SET_SELECTED_JUNTADAS: {
            return {
                ...state,
                selectedJuntadasIds: action.payload
            };
        }

        case JuntadaCreateBlocoActions.CREATE_DESENTRANHAMENTO: {
            return {
                ...state,
                savingJuntadasId: [],
                errors: false
            };
        }

        case JuntadaCreateBlocoActions.SAVE_DESENTRANHAMENTO: {
            const selectedIds = state.selectedJuntadasIds.filter(id => id !== action.payload.desentranhamento.juntada.id);
            return {
                ...state,
                selectedJuntadasIds: selectedIds,
                savingJuntadasId: [...state.savingJuntadasId, action.payload.desentranhamento.juntada.id],
                desentranhadoIds: [...state.desentranhadoIds, action.payload.desentranhamento.juntada.id],
            };
        }

        case JuntadaCreateBlocoActions.SAVE_DESENTRANHAMENTO_SUCCESS: {
            return {
                ...state,
                savingJuntadasId: state.savingJuntadasId.filter(id => id !== action.payload.juntada.id),
                errors: [],
                desentranhadoIds: state.desentranhadoIds.filter(id => id !== action.payload.juntada.id)
            };
        }

        case JuntadaCreateBlocoActions.SAVE_DESENTRANHAMENTO_FAILED: {
            return {
                ...state,
                selectedJuntadasIds: [...state.selectedJuntadasIds, action.payload.id],
                savingJuntadasId: state.savingJuntadasId.filter(id => id !== action.payload.id),
                errorsDesentranhando: [...state.errorsDesentranhando, action.payload.id],
                errors: action.payload.error
            };
        }

        case JuntadaCreateBlocoActions.SAVE_DESENTRANHAMENTO_CANCEL: {
            return {
                ...state,
                savingJuntadasId: [],
                bufferingDesentranhando: state.bufferingDesentranhando + 1,
                errorsDesentranhando: [],
                errors: null
            };
        }

        case JuntadaCreateBlocoActions.SAVE_DESENTRANHAMENTO_FLUSH: {
            return {
                ...state,
                bufferingDesentranhando: state.bufferingDesentranhando + 1
            };
        }

        case JuntadaCreateBlocoActions.SAVE_DESENTRANHAMENTO_CANCEL_SUCCESS: {
            return {
                ...state,
                selectedJuntadasIds: [...state.selectedJuntadasIds, action.payload],
                desentranhadoIds: state.desentranhadoIds.filter(id => id !== action.payload),
            };
        }

        default:
            return state;
    }
}
