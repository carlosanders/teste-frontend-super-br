import * as fromStore from '../';

export interface AssinaturasState {
    assinandoTarefasId: number[];
    documentosTarefa: { [id: number]: number[] };
}

export const AssinaturasInitialState: AssinaturasState = {
    assinandoTarefasId: [],
    documentosTarefa: {},
};

export const AssinaturasReducer = (
    state = AssinaturasInitialState,
    action
): AssinaturasState => {
    switch (action.type) {
        case fromStore.ASSINA_DOCUMENTO: {
            const tarefaId = action.payload.tarefaId;
            const documentosTarefa = {
                ...state.documentosTarefa,
                [tarefaId]: [...state.documentosTarefa[tarefaId], action.payload.documentoId]
            };
            return {
                ...state,
                assinandoTarefasId: [...state.assinandoTarefasId, tarefaId],
                documentosTarefa: documentosTarefa
            };
        }

        case fromStore.ASSINA_DOCUMENTO_SUCCESS: {
            const tarefaId = action.payload.tarefaId;
            let documentosTarefa = [];
            let assinandoTarefasId = state.assinandoTarefasId;
            documentosTarefa = state.documentosTarefa[tarefaId].filter(id => id !== action.payload.documentoId);
            if (documentosTarefa.length === 0) {
                assinandoTarefasId = assinandoTarefasId.filter(id => id !== tarefaId);
            }
            return {
                ...state,
                assinandoTarefasId: assinandoTarefasId,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [tarefaId]: documentosTarefa
                },
            };
        }

        case fromStore.ASSINA_DOCUMENTO_FAILED: {
            const tarefaId = action.payload.tarefaId;
            let documentosTarefa = [];
            let assinandoTarefasId = state.assinandoTarefasId;
            if (tarefaId) {
                documentosTarefa = state.documentosTarefa[tarefaId].filter(id => id !== action.payload.documentoId);
                if (documentosTarefa.length === 0) {
                    assinandoTarefasId = assinandoTarefasId.filter(id => id !== tarefaId);
                }
            }
            return {
                ...state,
                assinandoTarefasId: assinandoTarefasId,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [tarefaId]: documentosTarefa
                }
            };
        }

        case fromStore.PREPARA_ASSINATURA_FAILED: {
            let tarefaId = null;
            let documentosTarefa = {
                ...state.documentosTarefa
            };
            let documentos = [];
            let assinandoTarefasId = state.assinandoTarefasId;
            action.payload.ids.forEach((documentoId) => {
                Object.keys(state.documentosTarefa).forEach((tarefa) => {
                    if (state.documentosTarefa[tarefa].indexOf(documentoId) > -1) {
                        // Documento assinado pertence a esta tarefa
                        console.log(tarefa);
                        tarefaId = parseInt(tarefa, 10);
                        documentos = state.documentosTarefa[tarefa].filter(id => id !== documentoId);
                        if (documentos.length === 0) {
                            assinandoTarefasId = assinandoTarefasId.filter(tId => tId !== tarefaId);
                        }
                        documentosTarefa = {
                            ...documentosTarefa,
                            [tarefaId]: documentos
                        };
                    }
                });
            });
            return {
                ...state,
                assinandoTarefasId: assinandoTarefasId,
                documentosTarefa: documentosTarefa
            };
        }

        case fromStore.ASSINA_DOCUMENTO_ELETRONICAMENTE: {
            const tarefaId = action.payload.tarefaId;
            const documentosTarefa = {
                ...state.documentosTarefa,
                [tarefaId]: [...state.documentosTarefa[tarefaId], action.payload.documentoId]
            };
            return {
                ...state,
                assinandoTarefasId: [...state.assinandoTarefasId, tarefaId],
                documentosTarefa: documentosTarefa
            };
        }

        case fromStore.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS: {
            const tarefaId = action.payload.tarefaId;
            let documentosTarefa = [];
            let assinandoTarefasId = state.assinandoTarefasId;
            documentosTarefa = state.documentosTarefa[tarefaId].filter(id => id !== action.payload.documentoId);
            if (documentosTarefa.length === 0) {
                assinandoTarefasId = assinandoTarefasId.filter(id => id !== tarefaId);
            }
            return {
                ...state,
                assinandoTarefasId: assinandoTarefasId,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [tarefaId]: documentosTarefa
                },
            };
        }

        case fromStore.ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED: {
            const tarefaId = action.payload.tarefaId;
            let documentosTarefa = [];
            let assinandoTarefasId = state.assinandoTarefasId;
            if (tarefaId) {
                documentosTarefa = state.documentosTarefa[tarefaId].filter(id => id !== action.payload.documentoId);
                if (documentosTarefa.length === 0) {
                    assinandoTarefasId = assinandoTarefasId.filter(id => id !== tarefaId);
                }
            }
            return {
                ...state,
                assinandoTarefasId: assinandoTarefasId,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [tarefaId]: documentosTarefa
                }
            };
        }

        default:
            return state;
    }
};
