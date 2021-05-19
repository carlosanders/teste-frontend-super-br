import * as AssinaturasActions from '../actions';

export interface AssinaturasState {
    assinandoDocumentosId: number[];
    assinandoDocumentosEletronicamenteId: number[];
    assinandoTarefasId: number[];
    assinandoTarefasEletronicamenteId: number[];
    documentosTarefa: { [id: number]: number[] };
    documentosId: number[];
    errors: any
}

export const AssinaturasInitialState: AssinaturasState = {
    assinandoDocumentosId: [],
    assinandoDocumentosEletronicamenteId: [],
    assinandoTarefasId: [],
    assinandoTarefasEletronicamenteId: [],
    documentosTarefa: {},
    documentosId: [],
    errors: false
};

export function AssinaturasReducer(
    state = AssinaturasInitialState,
    action: AssinaturasActions.AssinaturasActionsAll
): AssinaturasState {
    switch (action.type) {

        case AssinaturasActions.GET_DOCUMENTOS: {
            return {
                ...state,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [action.payload.tarefaId]: []
                }
            }
        }

        case AssinaturasActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [action.payload.tarefaId]: action.payload.entitiesId
                }
            }
        }

        case AssinaturasActions.ASSINA_DOCUMENTO: {
            return {
                ...state,
                assinandoDocumentosId: [...state.assinandoDocumentosId, ...action.payload.documentosIds],
                assinandoTarefasId: [...state.assinandoTarefasId, action.payload.tarefaId],
                errors: false
            };
        }

        case AssinaturasActions.ASSINA_DOCUMENTO_SUCCESS: {
            let tarefaId = null;
            let documentosTarefa = [];
            let assinandoTarefasId = state.assinandoTarefasId;
            Object.keys(state.documentosTarefa).forEach(tarefa => {
                if (state.documentosTarefa[tarefa].indexOf(action.payload) > -1) {
                    // Documento assinado pertence a esta tarefa
                    console.log(tarefa);
                    tarefaId = tarefa;
                    documentosTarefa = state.documentosTarefa[tarefa].filter(id => id !== action.payload);
                }
            });
            if (documentosTarefa.length === 0) {
                assinandoTarefasId = assinandoTarefasId.filter(id => id != tarefaId);
            }
            console.log(tarefaId);
            console.log(documentosTarefa);
            console.log(assinandoTarefasId);
            return {
                ...state,
                assinandoDocumentosId: state.assinandoDocumentosId.filter(id => id !== action.payload),
                assinandoTarefasId: assinandoTarefasId,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [tarefaId]: documentosTarefa
                },
            };
        }

        case AssinaturasActions.ASSINA_DOCUMENTO_FAILED: {
            let tarefaId = action.payload.tarefaId;
            let documentosTarefa = [];
            let assinandoTarefasId = state.assinandoTarefasId;
            let assinandoDocumentosId = state.assinandoDocumentosId;
            if (tarefaId) {
                state.documentosTarefa[tarefaId].forEach(documento => {
                    assinandoDocumentosId = assinandoDocumentosId.filter(id => id !== documento);
                });
                assinandoTarefasId = assinandoDocumentosId.filter(id => id !== tarefaId);
            } else {
                Object.keys(state.documentosTarefa).forEach(tarefa => {
                    if (state.documentosTarefa[tarefa].indexOf(action.payload.documentoId) > -1) {
                        // Documento assinado pertence a esta tarefa
                        console.log(tarefa);
                        tarefaId = tarefa;
                        documentosTarefa = state.documentosTarefa[tarefa].filter(id => id !== action.payload.documentoId);
                    }
                });
                if (documentosTarefa.length === 0) {
                    assinandoTarefasId = assinandoTarefasId.filter(id => id !== tarefaId);
                }
                assinandoDocumentosId = assinandoDocumentosId.filter(id => id !== action.payload.documentoId);
            }
            return {
                ...state,
                assinandoDocumentosId: state.assinandoDocumentosId.filter(id => id !== action.payload),
                assinandoTarefasId: assinandoTarefasId,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [tarefaId]: documentosTarefa
                }
            };
        }

        case AssinaturasActions.PREPARA_ASSINATURA_FAILED: {
            return {
                ...state,
                assinandoDocumentosId: state.assinandoDocumentosId.filter((el) => action.payload.ids.includes(el)),
                errors: action.payload.error
            }
        }

        case AssinaturasActions.ASSINA_DOCUMENTO_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentosEletronicamenteId: [...state.assinandoDocumentosEletronicamenteId, action.payload.documento.id],
                assinandoTarefasEletronicamenteId: [...state.assinandoTarefasEletronicamenteId, action.payload.tarefaId],
                errors: false
            };
        }

        case AssinaturasActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS: {
            const documentosTarefa = state.documentosTarefa[action.payload.tarefaId]
                .filter(id => id !== action.payload.documentoId);
            let assinandoTarefasId = state.assinandoTarefasEletronicamenteId;
            if (documentosTarefa.length === 0) {
                assinandoTarefasId = assinandoTarefasId.filter(id => id !== action.payload.tarefaId);
            }
            return {
                ...state,
                assinandoDocumentosEletronicamenteId: state.assinandoDocumentosEletronicamenteId.filter(id => id !== action.payload.documentoId),
                assinandoTarefasEletronicamenteId: assinandoTarefasId,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [action.payload.tarefaId]: documentosTarefa
                },
                errors: false
            };
        }

        case AssinaturasActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED: {
            const documentosTarefa = state.documentosTarefa[action.payload.tarefaId]
                .filter(id => id !== action.payload.documentoId);
            let assinandoTarefasId = state.assinandoTarefasEletronicamenteId;
            if (documentosTarefa.length === 0) {
                assinandoTarefasId = assinandoTarefasId.filter(id => id !== action.payload.tarefaId);
            }
            return {
                ...state,
                assinandoDocumentosEletronicamenteId: state.assinandoDocumentosEletronicamenteId.filter(id => id !== action.payload.documentoId),
                assinandoTarefasEletronicamenteId: assinandoTarefasId,
                documentosTarefa: {
                    ...state.documentosTarefa,
                    [action.payload.tarefaId]: documentosTarefa
                },
                errors: action.payload.error
            };
        }

        default:
            return state;
    }
}
