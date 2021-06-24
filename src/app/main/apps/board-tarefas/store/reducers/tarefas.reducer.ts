import * as TarefasActions from '../actions/tarefas.actions';
import {Etiqueta} from '@cdk/models';

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
    bufferingDelete: number;
    bufferingCiencia: number;
    bufferingRedistribuir: number;
    bufferingDistribuir: number;
    changingFolderTarefaIds: number[];
    deletedTarefaIds: number[];
    selectedTarefaIds: number[];
    cienciaTarefaIds: number[];
    savingIds: number[];
    redistribuindoTarefaIds: number[];
    distribuindoTarefaIds: number[];
    error: any;
    errorDelete: number[];
    errorCiencia: number[];
    errorRedistribuir: number[];
    errorDistribuir: number[];
    processoLoadingId: number[];
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
    bufferingDelete: 0,
    bufferingCiencia: 0,
    bufferingRedistribuir: 0,
    bufferingDistribuir: 0,
    deletedTarefaIds: [],
    selectedTarefaIds: [],
    cienciaTarefaIds: [],
    savingIds: [],
    redistribuindoTarefaIds: [],
    distribuindoTarefaIds: [],
    error: null,
    errorDelete: [],
    errorCiencia: [],
    errorRedistribuir: [],
    errorDistribuir: [],
    processoLoadingId: [],
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
                    total: action.payload.total
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
                errorDelete: []
            };
        }

        case TarefasActions.GET_TAREFAS_FAILED: {
            const tarefaIndex = state.folderTarefas.indexOf(
                state.folderTarefas.filter(folderTarefas => folderTarefas.folderNome === action.payload.nome)[0]
            );

            const folderTarefas =  {
                ...state.folderTarefas[tarefaIndex],
                loading: false,
                loaded: false
            };

            //clone
            const folderTarefasList = state.folderTarefas.filter(_=> true);

            folderTarefasList.splice(tarefaIndex, 1 , folderTarefas);

            return {
                ...state,
                folderTarefas: folderTarefasList,
                error: action.payload.error.error,
                errorDelete: []
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
            return {
                ...state,
                savingIds: [
                    ...state.savingIds.filter(id => id !== action.payload.tarefa.id),
                    action.payload.tarefa.id
                ]
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
            return {
                ...state,
                savingIds: state.savingIds.filter(id => id !== action.payload.tarefa.id)
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

        case TarefasActions.DISTRIBUIR_TAREFA: {
            console.log('verificar e implementar DISTRIBUIR_TAREFA');
            // let entitiesId = state.entitiesId;
            // const navegacao = state.loaded.value.split('_');
            // let total = state.pagination.total;
            // // Checar se estamos visualizando tarefas do tipo coordenação
            // // E se o setor em questão é diferente do setorResponsável para onde foi distribuída a tarefa
            // if (navegacao[1] === 'coordenacao' && navegacao[2] != action.payload.setorResponsavel) {
            //     // Caso afirmativo, remover a tarefa da lista
            //     entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefa.id);
            //     total = total > 0 ? total - 1 : 0;
            // } else if (navegacao[1] === 'minhas-tarefas' && action.payload.usuarioResponsavel) {
            //     entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefa.id);
            //     total = total > 0 ? total - 1 : 0;
            // }
            //
            // return {
            //     ...state,
            //     entitiesId: entitiesId,
            //     selectedTarefaIds: state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id),
            //     pagination: {
            //         ...state.pagination,
            //         total: total
            //     },
            //     distribuindoTarefaIds: [...state.distribuindoTarefaIds, action.payload.tarefa.id]
            // };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_SUCCESS: {
            console.log('verificar e implementar DISTRIBUIR_TAREFA_SUCCESS');
            // return {
            //     ...state,
            //     distribuindoTarefaIds: state.distribuindoTarefaIds.filter(id => id !== action.payload),
            //     errorDistribuir: [],
            //     error: null
            // };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_FAILED: {
            console.log('verificar e implementar DISTRIBUIR_TAREFA_FAILED');
            // const navegacao = state.loaded.value.split('_');
            // let entitiesId = state.entitiesId;
            // let total = state.pagination.total;
            // // Checar se estamos visualizando tarefas do tipo coordenação
            // // E se o setor em questão é diferente do setorResponsável para onde foi distribuída a tarefa
            // if (navegacao[1] === 'coordenacao' && navegacao[2] != action.payload.setorResponsavel) {
            //     // Caso afirmativo, devolver a tarefa à lista
            //     entitiesId = [...entitiesId, action.payload.id];
            //     total++;
            // } else if (navegacao[1] === 'minhas-tarefas' && action.payload.usuarioResponsavel) {
            //     // Devolver a tarefa à lista
            //     entitiesId = [...entitiesId, action.payload.id];
            //     total++;
            // }
            // return {
            //     ...state,
            //     errorDistribuir: [...state.errorDistribuir, action.payload.id],
            //     distribuindoTarefaIds: state.distribuindoTarefaIds.filter(id => id !== action.payload.id),
            //     entitiesId: entitiesId,
            //     pagination: {
            //         ...state.pagination,
            //         total: total
            //     },
            //     error: action.payload.error
            // };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_CANCEL: {
            console.log('verificar e implementar DISTRIBUIR_TAREFA_CANCEL');
            // return {
            //     ...state,
            //     distribuindoTarefaIds: [],
            //     bufferingDistribuir: state.bufferingDistribuir + 1,
            //     errorDistribuir: [],
            //     error: null
            // };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_FLUSH: {
            console.log('verificar e implementar DISTRIBUIR_TAREFA_FLUSH');
            // return {
            //     ...state,
            //     bufferingDistribuir: state.bufferingDistribuir + 1
            // };
        }

        case TarefasActions.DISTRIBUIR_TAREFA_CANCEL_SUCCESS: {
            console.log('verificar e implementar DISTRIBUIR_TAREFA_CANCEL_SUCCESS');
            // const navegacao = state.loaded.value.split('_');
            // let entitiesId = state.entitiesId;
            // let total = state.pagination.total;
            // // Checar se estamos visualizando tarefas do tipo coordenação
            // // E se o setor em questão é diferente do setorResponsável para onde foi distribuída a tarefa
            // if (navegacao[1] === 'coordenacao' && navegacao[2] != action.payload.setorResponsavel) {
            //     // Caso afirmativo, devolver a tarefa à lista
            //     entitiesId = [...entitiesId, action.payload.tarefa.id];
            //     total++;
            // } else if (navegacao[1] === 'minhas-tarefas' && action.payload.usuarioResponsavel) {
            //     // Devolver a tarefa à lista
            //     entitiesId = [...entitiesId, action.payload.tarefa.id];
            //     total++;
            // }
            //
            // return {
            //     ...state,
            //     entitiesId: entitiesId,
            //     pagination: {
            //         ...state.pagination,
            //         total: total
            //     },
            // };
        }

        case TarefasActions.DELETE_TAREFA: {
            console.log('verificar e implementar DELETE_TAREFA');
            // const entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefaId);
            // const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.tarefaId);
            // return {
            //     ...state,
            //     entitiesId: entitiesId,
            //     selectedTarefaIds: selectedTarefaIds,
            //     pagination: {
            //         ...state.pagination,
            //         total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
            //     },
            //     deletingTarefaIds: [...state.deletingTarefaIds, action.payload.tarefaId],
            //     error: null
            // };
        }

        case TarefasActions.DELETE_TAREFA_SUCCESS: {
            console.log('verificar e implementar DELETE_TAREFA_SUCCESS');
            // return {
            //     ...state,
            //     deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload),
            //     errorDelete: [],
            //     error: null
            // };
        }

        case TarefasActions.DELETE_TAREFA_FAILED: {
            console.log('verificar e implementar DELETE_TAREFA_FAILED');
            // return {
            //     ...state,
            //     errorDelete: [...state.errorDelete, action.payload.id],
            //     deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload.id),
            //     entitiesId: [...state.entitiesId, action.payload.id],
            //     error: action.payload.error
            // };
        }

        case TarefasActions.UNDELETE_TAREFA: {
            console.log('verificar e implementar UNDELETE_TAREFA');
            // return {
            //     ...state,
            //     undeletingTarefaIds: [...state.undeletingTarefaIds, action.payload.tarefa.id],
            // };
        }

        case TarefasActions.UNDELETE_TAREFA_SUCCESS: {
            console.log('verificar e implementar UNDELETE_TAREFA_SUCCESS');
            // return {
            //     ...state,
            //     undeletingTarefaIds: state.undeletingTarefaIds.filter(id => id !== action.payload.tarefa.id),
            //     entitiesId: !action.payload.loaded || action.payload.loaded === state.loaded ?
            //         [...state.entitiesId, action.payload.tarefa.id] : state.entitiesId
            // };
        }

        case TarefasActions.UNDELETE_TAREFA_FAILED: {
            console.log('verificar e implementar UNDELETE_TAREFA_FAILED');
            // return {
            //     ...state,
            //     undeletingTarefaIds: state.undeletingTarefaIds.filter(id => id !== action.payload.id)
            // };
        }

        case TarefasActions.DELETE_TAREFA_CANCEL: {
            console.log('verificar e implementar DELETE_TAREFA_CANCEL');
            // return {
            //     ...state,
            //     deletingTarefaIds: [],
            //     bufferingDelete: state.bufferingDelete + 1,
            //     errorDelete: [],
            //     error: null
            // };
        }

        case TarefasActions.DELETE_TAREFA_FLUSH: {
            console.log('verificar e implementar DELETE_TAREFA_FLUSH');
            // return {
            //     ...state,
            //     bufferingDelete: state.bufferingDelete + 1
            // };
        }

        case TarefasActions.DELETE_TAREFA_CANCEL_SUCCESS: {
            console.log('verificar e implementar DELETE_TAREFA_CANCEL_SUCCESS');
            // return {
            //     ...state,
            //     entitiesId: [...state.entitiesId, action.payload],
            //     pagination: {
            //         ...state.pagination,
            //         total: state.pagination.total + 1
            //     },
            // };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA: {
            console.log('verificar e implementar DAR_CIENCIA_TAREFA');
            // const entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefa.id);
            // const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id);
            // return {
            //     ...state,
            //     entitiesId: entitiesId,
            //     selectedTarefaIds: selectedTarefaIds,
            //     pagination: {
            //         ...state.pagination,
            //         total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
            //     },
            //     cienciaTarefaIds: [...state.cienciaTarefaIds, action.payload.tarefa.id]
            // };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_SUCCESS: {
            console.log('verificar e implementar DAR_CIENCIA_TAREFA_SUCCESS');
            // return {
            //     ...state,
            //     cienciaTarefaIds: state.cienciaTarefaIds.filter(id => id !== action.payload),
            //     errorCiencia: [],
            //     error: null
            // };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_FAILED: {
            console.log('verificar e implementar DAR_CIENCIA_TAREFA_FAILED');
            // return {
            //     ...state,
            //     errorCiencia: [...state.errorCiencia, action.payload.id],
            //     cienciaTarefaIds: state.cienciaTarefaIds.filter(id => id !== action.payload.id),
            //     entitiesId: [...state.entitiesId, action.payload.id],
            //     error: action.payload.error
            // };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_CANCEL: {
            console.log('verificar e implementar DAR_CIENCIA_TAREFA_CANCEL');
            // return {
            //     ...state,
            //     cienciaTarefaIds: [],
            //     bufferingCiencia: state.bufferingCiencia + 1,
            //     errorCiencia: [],
            //     error: null
            // };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_FLUSH: {
            console.log('verificar e implementar DAR_CIENCIA_TAREFA_FLUSH');
            // return {
            //     ...state,
            //     bufferingCiencia: state.bufferingCiencia + 1,
            // };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_CANCEL_SUCCESS: {
            console.log('verificar e implementar DAR_CIENCIA_TAREFA_CANCEL_SUCCESS');
            // return {
            //     ...state,
            //     entitiesId: [...state.entitiesId, action.payload],
            //     pagination: {
            //         ...state.pagination,
            //         total: state.pagination.total + 1
            //     },
            // };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA: {
            console.log('verificar e implementar REDISTRIBUIR_TAREFA');
            // const entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefa.id);
            // const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.tarefa.id);
            // return {
            //     ...state,
            //     entitiesId: entitiesId,
            //     selectedTarefaIds: selectedTarefaIds,
            //     pagination: {
            //         ...state.pagination,
            //         total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
            //     },
            //     redistribuindoTarefaIds: [...state.redistribuindoTarefaIds, action.payload.tarefa.id]
            // };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA_FAILED: {
            console.log('verificar e implementar REDISTRIBUIR_TAREFA_FAILED');
            // return {
            //     ...state,
            //     redistribuindoTarefaIds: state.redistribuindoTarefaIds.filter(id => id !== action.payload),
            //     entitiesId: [...state.entitiesId, action.payload.id],
            //     errorRedistribuir: [...state.errorRedistribuir, action.payload.id],
            //     error: action.payload.error
            // };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA_SUCCESS: {
            console.log('verificar e implementar REDISTRIBUIR_TAREFA_SUCCESS');
            // return {
            //     ...state,
            //     redistribuindoTarefaIds: state.redistribuindoTarefaIds.filter(id => id !== action.payload),
            //     errorRedistribuir: [],
            //     error: null
            // };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA_CANCEL: {
            return {
                ...state,
                redistribuindoTarefaIds: [],
                errorRedistribuir: [],
                error: null
            };
        }

        case TarefasActions.REDISTRIBUIR_TAREFA_CANCEL_SUCCESS: {
            console.log('verificar e implementar REDISTRIBUIR_TAREFA_CANCEL_SUCCESS');
            // return {
            //     ...state,
            //     entitiesId: [...state.entitiesId, action.payload],
            //     pagination: {
            //         ...state.pagination,
            //         total: state.pagination.total + 1
            //     },
            // };
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


