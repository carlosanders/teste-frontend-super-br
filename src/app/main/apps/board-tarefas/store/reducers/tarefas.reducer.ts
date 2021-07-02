import * as TarefasActions from '../actions/tarefas.actions';
import {Etiqueta} from '@cdk/models';
import * as _ from 'lodash';

export interface FolderTarefaState {
    folderNome: string;
    loading: boolean;
    loaded: any;
    entitiesId: number[];
    displayedCampos: string[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        folderFilter: any;
        gridFilter: any;
        listFilter: any;
        etiquetaFilter: Etiqueta[];
        populate: any;
        sort: any;
        total: number;
        context: any;
    }
}

export const FolderTarefaInitialState: FolderTarefaState = {
    folderNome: null,
    loading: false,
    loaded: false,
    entitiesId: [],
    displayedCampos: [
        'especieTarefa.nome',
        'setorResponsavel.nome',
        'dataHoraDistribuicao',
        'dataHoraPrazo',
        'observacao'
    ],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        folderFilter: {},
        gridFilter: {},
        listFilter: {},
        etiquetaFilter: [],
        populate: [],
        sort: {},
        total: 0,
        context: {}
    }
}

export interface TarefasState {
    folderTarefas: FolderTarefaState[];
    loading: boolean;
    loaded: any;
    togglingUrgenteIds: number[];
    deletingTarefaIds: number[];
    undeletingTarefaIds: number[];
    changingFolderTarefaIds: number[];
    selectedTarefaIds: number[];
    savingIds: number[];
    error: any;
    processoLoadingId: number[];
    tarefasExpandedIds: number[];
    assuntos: any[];
    interessados: any[];
}

export const TarefasInitialState: TarefasState = {
    folderTarefas: [],
    loading: false,
    loaded: false,
    togglingUrgenteIds: [],
    deletingTarefaIds: [],
    undeletingTarefaIds: [],
    changingFolderTarefaIds: [],
    selectedTarefaIds: [],
    savingIds: [],
    error: null,
    processoLoadingId: [],
    tarefasExpandedIds: [],
    assuntos: [],
    interessados: []
};

export function TarefasReducer(state = TarefasInitialState, action: TarefasActions.TarefasActionsAll): TarefasState {
    switch (action.type) {

        case TarefasActions.GET_TAREFAS: {

            //copy
            const folderTarefasList = state.folderTarefas.filter(_=> true);
            let folderTarefasFind = folderTarefasList.filter(val => val.folderNome === action.payload.nome)[0];

            if (folderTarefasFind) {

                let entitiesId = [];
                if (action.payload?.increment === true) {
                    entitiesId = folderTarefasFind.entitiesId;
                }

                const folderTarefas = {
                    ...folderTarefasFind,
                    loading: true,
                    loaded: false,
                    pagination: {
                        ...action.payload.pagination
                    },
                    entitiesId: entitiesId
                }

                folderTarefasList.splice(
                    folderTarefasList.indexOf(folderTarefasFind),
                    1,
                    folderTarefas
                )

            } else {
                const folderTarefas = {
                    ...FolderTarefaInitialState,
                    folderNome: action.payload.nome,
                    loading: true,
                    loaded: false,
                    pagination: {
                        ...action.payload.pagination
                    }
                };

                folderTarefasList.push(folderTarefas);
            }

            return {
                ...state,
                loading: true,
                folderTarefas: folderTarefasList,
                tarefasExpandedIds: [],
                error: null
            };
        }

        case TarefasActions.GET_TAREFAS_SUCCESS: {

            const tarefaIndex = state.folderTarefas.indexOf(
                state.folderTarefas.filter(folderTarefas => folderTarefas.folderNome === action.payload.nome)[0]
            );

            const folderTarefas =  {
                ...state.folderTarefas[tarefaIndex],
                pagination: {
                    ...state.folderTarefas[tarefaIndex].pagination,
                    total: action.payload.total,
                    listFilter: null
                },
                entitiesId: [
                    ...state.folderTarefas[tarefaIndex].entitiesId,
                    ...action.payload.entitiesId
                ],
                loading: false,
                loaded: true
            };

            //clone
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(tarefaIndex, 1 , folderTarefas);

            return {
                ...state,
                folderTarefas: folderTarefasList,
                error: null
            };
        }

        case TarefasActions.GET_TAREFAS_FAILED: {
            const tarefaIndex = state.folderTarefas.indexOf(
                state.folderTarefas.filter(folderTarefas => folderTarefas.folderNome === action.payload.nome)[0]
            );

            const folderTarefas =  {
                ...state.folderTarefas[tarefaIndex],
                pagination: {
                    ...state.folderTarefas[tarefaIndex].pagination,
                    listFilter: null
                },
                loading: false,
                loaded: false
            };

            //clone
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(tarefaIndex, 1 , folderTarefas);

            return {
                ...state,
                folderTarefas: folderTarefasList,
                error: action.payload.error.error
            };
        }

        case TarefasActions.UPDATE_DISPLAYED_CAMPOS: {
            //copy
            const folderTarefasList = state.folderTarefas.filter(_=> true);
            let folderTarefasFind = folderTarefasList.filter(val => val.folderNome === action.payload.nome)[0];

            if (folderTarefasFind) {
                const folderTarefas = {
                    ...folderTarefasFind,
                    displayedCampos: action.payload.displayedCampos
                }

                folderTarefasList.splice(
                    folderTarefasList.indexOf(folderTarefasFind),
                    1,
                    folderTarefas
                )

            }

            return {
                ...state,
                folderTarefas: folderTarefasList
            };
        }

        case TarefasActions.CHANGE_SELECTED_TAREFAS: {
            return {
                ...state,
                selectedTarefaIds: action.payload,

            };
        }

        case TarefasActions.CHANGE_TAREFAS_FOLDER: {

            const newFolderNome  = (action.payload.newFolder?.nome.toUpperCase() || 'ENTRADA');
            const oldFolderNome  = (action.payload.oldFolder?.nome.toUpperCase() || 'ENTRADA');

            let oldFolderTarefasFind = _.find(state.folderTarefas, {folderNome: oldFolderNome});
            let newFolderTarefasFind = _.find(state.folderTarefas, {folderNome: newFolderNome});

            const oldFolderTarefas = {
                ...oldFolderTarefasFind,
                entitiesId: oldFolderTarefasFind.entitiesId.filter(id => id !== action.payload.tarefa.id),
                pagination: {
                    ...oldFolderTarefasFind.pagination,
                    total: (oldFolderTarefasFind.pagination.total-1)
                }
            }

            const newFolderTarefas = {
                ...newFolderTarefasFind,
                entitiesId: [
                    action.payload.tarefa.id,
                    ...newFolderTarefasFind.entitiesId.filter(id => id !== action.payload.tarefa.id)
                ],
                pagination: {
                    ...newFolderTarefasFind.pagination,
                    total: (newFolderTarefasFind.pagination.total+1)
                }
            }

            //copy
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(folderTarefasList.indexOf(oldFolderTarefasFind), 1, oldFolderTarefas);
            folderTarefasList.splice(folderTarefasList.indexOf(newFolderTarefasFind), 1, newFolderTarefas);

            return {
                ...state,
                folderTarefas: folderTarefasList,
                savingIds: [
                    ...state.savingIds.filter(id => id !== action.payload.tarefa.id),
                    action.payload.tarefa.id
                ],
                selectedTarefaIds: state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case TarefasActions.CHANGE_TAREFAS_FOLDER_SUCCESS: {
            return {
                ...state,
                savingIds: state.savingIds.filter(id => id !== action.payload.tarefa.id),
                selectedTarefaIds: state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case TarefasActions.CHANGE_TAREFAS_FOLDER_FAILED: {
            const newFolderNome  = (action.payload.newFolder?.nome.toUpperCase() || 'ENTRADA');
            const oldFolderNome  = (action.payload.oldFolder?.nome.toUpperCase() || 'ENTRADA');

            let oldFolderTarefasFind = _.find(state.folderTarefas, {folderNome: oldFolderNome});
            let newFolderTarefasFind = _.find(state.folderTarefas, {folderNome: newFolderNome});

            const newFolderTarefas = {
                ...newFolderTarefasFind,
                entitiesId: newFolderTarefasFind.entitiesId.filter(id => id !== action.payload.tarefa.id),
                pagination: {
                    ...newFolderTarefasFind.pagination,
                    total: (newFolderTarefasFind.pagination.total-1)
                }
            }

            const oldFolderTarefas = {
                ...oldFolderTarefasFind,
                entitiesId: [
                    action.payload.tarefa.id,
                    ...oldFolderTarefasFind.entitiesId.filter(id => id !== action.payload.tarefa.id)
                ],
                pagination: {
                    ...oldFolderTarefasFind.pagination,
                    total: (oldFolderTarefasFind.pagination.total+1)
                }
            }

            //copy
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(folderTarefasList.indexOf(oldFolderTarefasFind), 1, oldFolderTarefas);
            folderTarefasList.splice(folderTarefasList.indexOf(newFolderTarefasFind), 1, newFolderTarefas);

            return {
                ...state,
                folderTarefas: folderTarefasList,
                savingIds: state.savingIds.filter(id => id !== action.payload.tarefa.id),
                selectedTarefaIds: [
                    action.payload.tarefa.id,
                    ...state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id)
                ]
            };
        }

        case TarefasActions.DELETE_FOLDER_TAREFAS: {
            return {
                ...state,
                folderTarefas: state.folderTarefas.filter(folderTarefas => folderTarefas.folderNome !== action.payload),

            };
        }

        case TarefasActions.GET_TAREFAS_INTERESSADOS: {
            let interessados = state.interessados.filter(interessado => interessado.id !== action.payload.processoId);

            interessados.push({
                id: action.payload.processoId,
                total: 0
            });

            return {
                ...state,
                processoLoadingId: [
                    ...state.processoLoadingId.filter(id => id !== action.payload.processoId),
                    action.payload.processoId
                ],
                interessados: interessados
            };
        }

        case TarefasActions.GET_TAREFAS_INTERESSADOS_FAILED: {
            return {
                ...state,
                processoLoadingId: state.processoLoadingId.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.GET_TAREFAS_INTERESSADOS_SUCCESS: {
            let interessados = state.interessados.filter(interessado => interessado.id !== action.payload.processoId);

            interessados.push({
                id: action.payload.processoId,
                total: action.payload.total
            });

            return {
                ...state,
                interessados: interessados,
                processoLoadingId: state.processoLoadingId.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.GET_TAREFAS_ASSUNTOS: {
            let assuntos = state.assuntos.filter(assunto => assunto.id !== action.payload.processoId);

            assuntos.push({
                id: action.payload.processoId,
                total: 0
            });

            return {
                ...state,
                processoLoadingId: [
                    ...state.processoLoadingId.filter(id => id !== action.payload.processoId),
                    action.payload.processoId
                ],
                assuntos: assuntos
            };
        }

        case TarefasActions.GET_TAREFAS_ASSUNTOS_FAILED: {
            return {
                ...state,
                processoLoadingId: state.processoLoadingId.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.GET_TAREFAS_ASSUNTOS_SUCCESS: {
            let assuntos = state.assuntos.filter(assunto => assunto.id !== action.payload.processoId);

            assuntos.push({
                id: action.payload.processoId,
                total: action.payload.total
            });

            return {
                ...state,
                assuntos: assuntos,
                processoLoadingId: state.processoLoadingId.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.TOGGLE_EXPAND_TAREFAS: {
            return {
                ...state,
                tarefasExpandedIds: (
                    state.tarefasExpandedIds.includes(action.payload)
                        ? state.tarefasExpandedIds.filter(id => id !== action.payload)
                        : [
                            ...state.tarefasExpandedIds,
                            action.payload
                        ]
                )
            };
        }

        case TarefasActions.DELETE_TAREFAS: {
            const folderNome  = (action.payload.folder?.nome.toUpperCase() || 'ENTRADA');

            let folderTarefasFind = _.find(state.folderTarefas, {folderNome: folderNome});

            const folderTarefas = {
                ...folderTarefasFind,
                entitiesId: folderTarefasFind.entitiesId.filter(id => id !== action.payload.tarefa.id),
                pagination: {
                    ...folderTarefasFind.pagination,
                    total: (folderTarefasFind.pagination.total-1)
                }
            }

            //copy
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(folderTarefasList.indexOf(folderTarefasFind), 1, folderTarefas);

            return {
                ...state,
                deletingTarefaIds: [
                    ...state.deletingTarefaIds.filter(id => id !== action.payload.tarefa.id),
                    action.payload.tarefa.id
                ],
                folderTarefas: folderTarefasList,
                selectedTarefaIds: state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case TarefasActions.DELETE_TAREFAS_SUCCESS: {
            return {
                ...state,
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload.tarefa.id),
            };
        }

        case TarefasActions.DELETE_TAREFAS_FAILED: {
            const folderNome  = (action.payload.folder?.nome.toUpperCase() || 'ENTRADA');

            let folderTarefasFind = _.find(state.folderTarefas, {folderNome: folderNome});

            const folderTarefas = {
                ...folderTarefasFind,
                entitiesId: [
                    action.payload.tarefa.id,
                    folderTarefasFind.entitiesId.filter(id => id !== action.payload.tarefa.id)
                ],
                pagination: {
                    ...folderTarefasFind.pagination,
                    total: (folderTarefasFind.pagination.total+1)
                }
            }

            //copy
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(folderTarefasList.indexOf(folderTarefasFind), 1, folderTarefas);

            return {
                ...state,
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload.tarefa.id),
                folderTarefas: folderTarefasList,
                error: action.payload.error,
                selectedTarefaIds: [
                    action.payload.tarefa.id,
                    ...state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id)
                ]
            };
        }

        case TarefasActions.UNDELETE_TAREFAS: {
            return {
                ...state,
                undeletingTarefaIds: [
                    action.payload.tarefa.id,
                    ...state.undeletingTarefaIds.filter(id => id !== action.payload.tarefa.id)
                ],
            };
        }

        case TarefasActions.UNDELETE_TAREFAS_SUCCESS: {
            const folderNome  = (action.payload.folder?.nome.toUpperCase() || 'ENTRADA');

            let folderTarefasFind = _.find(state.folderTarefas, {folderNome: folderNome});

            const folderTarefas = {
                ...folderTarefasFind,
                entitiesId: [
                    action.payload.tarefa.id,
                    ...folderTarefasFind.entitiesId.filter(id => id !== action.payload.tarefa.id)
                ],
                pagination: {
                    ...folderTarefasFind.pagination,
                    total: (folderTarefasFind.pagination.total+1)
                }
            }

            //copy
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(folderTarefasList.indexOf(folderTarefasFind), 1, folderTarefas);

            return {
                ...state,
                undeletingTarefaIds: state.undeletingTarefaIds.filter(id => id !== action.payload.tarefa.id),
                folderTarefas: folderTarefasList
            };
        }

        case TarefasActions.UNDELETE_TAREFAS_FAILED: {
            return {
                ...state,
                undeletingTarefaIds: state.undeletingTarefaIds.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFAS: {
            const folderNome  = (action.payload.folder?.nome.toUpperCase() || 'ENTRADA');

            let folderTarefasFind = _.find(state.folderTarefas, {folderNome: folderNome});

            const folderTarefas = {
                ...folderTarefasFind,
                entitiesId: folderTarefasFind.entitiesId.filter(id => id !== action.payload.tarefa.id),
                pagination: {
                    ...folderTarefasFind.pagination,
                    total: (folderTarefasFind.pagination.total-1)
                }
            }

            //copy
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(folderTarefasList.indexOf(folderTarefasFind), 1, folderTarefas);

            return {
                ...state,
                folderTarefas: folderTarefasList,
                selectedTarefaIds: state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id),
                savingIds: [
                    ...state.savingIds.filter(id => id !== action.payload.tarefa.id),
                    action.payload.tarefa.id
                ]
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFAS_SUCCESS: {
            return {
                ...state,
                savingIds: state.savingIds.filter(id => id !== action.payload.tarefa.id),
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFAS_FAILED: {
            const folderNome  = (action.payload.folder?.nome.toUpperCase() || 'ENTRADA');

            let folderTarefasFind = _.find(state.folderTarefas, {folderNome: folderNome});

            const folderTarefas = {
                ...folderTarefasFind,
                entitiesId: [
                    action.payload.tarefa.id,
                    folderTarefasFind.entitiesId.filter(id => id !== action.payload.tarefa.id)
                ],
                pagination: {
                    ...folderTarefasFind.pagination,
                    total: (folderTarefasFind.pagination.total+1)
                }
            }

            //copy
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(folderTarefasList.indexOf(folderTarefasFind), 1, folderTarefas);

            return {
                ...state,
                folderTarefas: folderTarefasList,
                error: action.payload.error,
                selectedTarefaIds: [
                    action.payload.tarefa.id,
                    ...state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id)
                ],
                savingIds: state.savingIds.filter(id => id !== action.payload.tarefa.id),
            };
        }

        case TarefasActions.TOGGLE_URGENTE_TAREFA: {
            return {
                ...state,
                togglingUrgenteIds: [...state.togglingUrgenteIds, action.payload.id],
            };
        }

        case TarefasActions.TOGGLE_URGENTE_TAREFA_SUCCESS: {
            return {
                ...state,
                togglingUrgenteIds: state.togglingUrgenteIds.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.TOGGLE_URGENTE_TAREFA_FAILED: {
            return {
                ...state,
                togglingUrgenteIds: state.togglingUrgenteIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}


