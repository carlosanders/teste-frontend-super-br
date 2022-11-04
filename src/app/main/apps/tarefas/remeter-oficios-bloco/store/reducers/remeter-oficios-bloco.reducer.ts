import {
    CdkOficiosTarefaGroupInterface
} from '@cdk/components/documento-avulso/cdk-oficios-card-list/cdk-oficios-tarefa-group.interface';
import * as _ from 'lodash';
import * as RemeterOficiosBlocoActions from '../actions/remeter-oficios-bloco.actions';

export interface RemeterOficiosBlocoState {
    entitiesId: number[];
    tarefaGroup: {[id: number]: CdkOficiosTarefaGroupInterface};
    remeterIds: number[];
    selectedIds: number[];
}

export const CdkOficiosTarefaGroupInitialState: CdkOficiosTarefaGroupInterface = {
    tarefaId: null,
    nupFormatado: null,
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loaded: false,
    saving: false,
    loading: false,
    error: {}
}

export const OficioCreateInitialState: RemeterOficiosBlocoState = {
    entitiesId: [],
    tarefaGroup: {},
    remeterIds: [],
    selectedIds: [],
};

export function RemeterOficiosBlocoReducer(
    state = OficioCreateInitialState, action: RemeterOficiosBlocoActions.OficioBlocoRemoveActionsAll
): RemeterOficiosBlocoState {
    switch (action.type) {

        case RemeterOficiosBlocoActions.UNLOAD_OFICIOS: {
            return {
                ...OficioCreateInitialState
            };
        }

        case RemeterOficiosBlocoActions.GET_OFICIOS: {
            const tarefaGroupState = state.tarefaGroup[action.payload.tarefa.id] ?? {...CdkOficiosTarefaGroupInitialState};
            return {
                ...state,
                tarefaGroup: {
                    ...state.tarefaGroup,
                    [action.payload.tarefa.id]: {
                        ...tarefaGroupState,
                        tarefaId: action.payload.tarefa.id,
                        nupFormatado: action.payload.tarefa.processo.NUPFormatado,
                        entitiesId: !action.payload?.more ? [] : tarefaGroupState.entitiesId,
                        loading: true,
                        loaded: false,
                        error: {},
                        pagination: {
                            limit: action.payload.pagination.limit,
                            offset: action.payload.pagination.offset,
                            filter: action.payload.pagination.filter,
                            listFilter: action.payload.pagination.listFilter,
                            populate: action.payload.pagination.populate,
                            sort: action.payload.pagination.sort,
                            total: 0,
                        }
                    }
                },
                entitiesId: !action.payload?.more ? _.without(state.entitiesId, ...tarefaGroupState.entitiesId).sort() : [...state.entitiesId]
            };
        }

        case RemeterOficiosBlocoActions.GET_OFICIOS_SUCCESS: {
            const tarefaGroupState = state.tarefaGroup[action.payload.tarefa.id] ?? {...CdkOficiosTarefaGroupInitialState};
            return {
                ...state,
                tarefaGroup: {
                    ...state.tarefaGroup,
                    [action.payload.tarefa.id]: {
                        ...tarefaGroupState,
                        entitiesId: !action.payload?.more ? action.payload.entitiesId : _.uniq([...tarefaGroupState.entitiesId, ...action.payload.entitiesId]).sort(),
                        loading: false,
                        loaded: true,
                        pagination: {
                            ...tarefaGroupState.pagination,
                            total: action.payload.total,
                        }
                    }
                },
                entitiesId: _.uniq([...state.entitiesId, ...action.payload.entitiesId]).sort()
            };
        }

        case RemeterOficiosBlocoActions.GET_OFICIOS_FAILED: {
            const tarefaGroupState = state.tarefaGroup[action.payload.tarefa.id] ?? {...CdkOficiosTarefaGroupInitialState};
            return {
                ...state,
                tarefaGroup: {
                    ...state.tarefaGroup,
                    [action.payload.tarefa.id]: {
                        ...tarefaGroupState,
                        loading: false,
                        loaded: false,
                    }
                }
            };
        }

        case RemeterOficiosBlocoActions.REMETER_OFICIO: {
            const tarefaGroupState = state.tarefaGroup[action.payload.tarefa.id] ?? {...CdkOficiosTarefaGroupInitialState};
            return {
                ...state,
                tarefaGroup: {
                    ...state.tarefaGroup,
                    [action.payload.tarefa.id]: {
                        ...tarefaGroupState,
                        error: _.omit(tarefaGroupState.error, action.payload.oficio.id)
                    }
                },
                remeterIds: _.uniq([...state.remeterIds, action.payload.oficio.id])
            };
        }

        case RemeterOficiosBlocoActions.REMETER_OFICIO_SUCCESS: {
            const tarefaGroupState = state.tarefaGroup[action.payload.tarefa.id] ?? {...CdkOficiosTarefaGroupInitialState};
            return {
                ...state,
                tarefaGroup: {
                    ...state.tarefaGroup,
                    [action.payload.tarefa.id]: {
                        ...tarefaGroupState,
                        entitiesId: _.without(tarefaGroupState.entitiesId, action.payload.oficio.id).sort(),
                        pagination: {
                            ...tarefaGroupState.pagination,
                            total: tarefaGroupState.pagination.total - 1
                        }
                    }
                },
                remeterIds: _.without(state.remeterIds, action.payload.oficio.id).sort(),
                selectedIds: _.without(state.selectedIds, action.payload.oficio.id),
            };
        }

        case RemeterOficiosBlocoActions.REMETER_OFICIO_FAILED: {
            const tarefaGroupState = state.tarefaGroup[action.payload.tarefa.id] ?? {...CdkOficiosTarefaGroupInitialState};
            return {
                ...state,
                tarefaGroup: {
                    ...state.tarefaGroup,
                    [action.payload.tarefa.id]: {
                        ...tarefaGroupState,
                        entitiesId: _.uniq([...tarefaGroupState.entitiesId, action.payload.oficio.id]).sort(),
                        pagination: {
                            ...tarefaGroupState.pagination,
                            total: tarefaGroupState.pagination.total + 1
                        },
                        error: {
                            ...tarefaGroupState.error,
                            [action.payload.oficio.id]: action.payload.error
                        }
                    }
                },
                remeterIds: _.without(state.remeterIds, action.payload.oficio.id)
            };
        }

        case RemeterOficiosBlocoActions.SET_SELECTED_IDS: {
            return {
                ...state,
                selectedIds: _.uniq(action.payload)
            };
        }

        default:
            return state;
    }
}
