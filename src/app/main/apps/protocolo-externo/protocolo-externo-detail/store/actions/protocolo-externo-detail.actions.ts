import {Action} from '@ngrx/store';

export const GET_PROCESSO = '[PROTOCOLO EXTERNO DETAIL] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[PROTOCOLO EXTERNO DETAIL] GET PROCESSO FAILED';

export const EDIT_PROCESSO = '[PROTOCOLO EXTERNO DETAIL] EDIT PROCESSO';
export const EDIT_PROCESSO_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] EDIT PROCESSO SUCCESS';

export const CREATE_PROCESSO = '[PROTOCOLO EXTERNO DETAIL] CREATE PROCESSO';
export const CREATE_PROCESSO_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] CREATE PROCESSO SUCCESS';

export const SAVE_PROCESSO = '[PROTOCOLO EXTERNO DETAIL] SAVE PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] SAVE PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[PROTOCOLO EXTERNO DETAIL] SAVE PROCESSO FAILED';

export const DAR_CIENCIA_PROCESSO = '[PROTOCOLO EXTERNO DETAIL] DAR CIENCIA PROCESSO';
export const DAR_CIENCIA_PROCESSO_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] DAR CIENCIA PROCESSO SUCCESS';
export const DAR_CIENCIA_PROCESSO_FAILED = '[PROTOCOLO EXTERNO DETAIL] DAR CIENCIA PROCESSO FAILED';

export const DELETE_PROCESSO = '[PROTOCOLO EXTERNO DETAIL] DELETE PROCESSO';
export const DELETE_PROCESSO_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] DELETE PROCESSO SUCCESS';
export const DELETE_PROCESSO_FAILED = '[PROTOCOLO EXTERNO DETAIL] DELETE PROCESSO FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[PROTOCOLO EXTERNO DETAIL] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[PROTOCOLO EXTERNO DETAIL] VINCULACAO ETIQUETA FAILED';

export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA = '[PROTOCOLO EXTERNO DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA SUCCESS';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED = '[PROTOCOLO EXTERNO DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[PROTOCOLO EXTERNO DETAIL] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[PROTOCOLO EXTERNO DETAIL] DELETE VINCULACAO_ETIQUETA FAILED';

export const GET_DOCUMENTOS = '[PROTOCOLO EXTERNO DETAIL] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[PROTOCOLO EXTERNO DETAIL] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[PROTOCOLO EXTERNO DETAIL] GET DOCUMENTOS FAILED';

export const DESELECT_PROCESSO_ACTION = '[PROTOCOLO EXTERNO DETAIL] DESELECT PROCESSO ACTION';

/**
 * Get Processo
 */
export class GetProcesso implements Action
{
    readonly type = GET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action
{
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action
{
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Set Current Processo
 */
export class EditProcesso implements Action
{
    readonly type = EDIT_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Current Processo Success
 */
export class EditProcessoSuccess implements Action
{
    readonly type = EDIT_PROCESSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Processo
 */
export class SaveProcesso implements Action
{
    readonly type = SAVE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo Success
 */
export class SaveProcessoSuccess implements Action
{
    readonly type = SAVE_PROCESSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Processo Failed
 */
export class SaveProcessoFailed implements Action
{
    readonly type = SAVE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia Processo
 */
export class DarCienciaProcesso implements Action
{
    readonly type = DAR_CIENCIA_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia Processo Success
 */
export class DarCienciaProcessoSuccess implements Action
{
    readonly type = DAR_CIENCIA_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia Processo Failed
 */
export class DarCienciaProcessoFailed implements Action
{
    readonly type = DAR_CIENCIA_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta
 */
export class DeleteVinculacaoEtiqueta implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Success
 */
export class DeleteVinculacaoEtiquetaSuccess implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Failed
 */
export class DeleteVinculacaoEtiquetaFailed implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Success
 */
export class CreateVinculacaoEtiquetaSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Failed
 */
export class CreateVinculacaoEtiquetaFailed implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}




/**
 * Save Conteudo Vinculacao Etiqueta
 */
export class SaveConteudoVinculacaoEtiqueta implements Action
{
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta Success
 */
export class SaveConteudoVinculacaoEtiquetaSuccess implements Action
{
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta Failed
 */
export class SaveConteudoVinculacaoEtiquetaFailed implements Action
{
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}




/**
 * Delete Processo
 */
export class DeleteProcesso implements Action
{
    readonly type = DELETE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Processo Success
 */
export class DeleteProcessoSuccess implements Action
{
    readonly type = DELETE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Processo Failed
 */
export class DeleteProcessoFailed implements Action
{
    readonly type = DELETE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat Processo
 */
export class CreateProcesso implements Action
{
    readonly type = CREATE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat Processo Success
 */
export class CreateProcessoSuccess implements Action
{
    readonly type = CREATE_PROCESSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Deselect Processo Action
 */
export class DeselectProcessoAction implements Action
{
    readonly type = DESELECT_PROCESSO_ACTION;

    constructor()
    {
    }
}

/**
 * Get Documentos
 */
export class GetDocumentos implements Action
{
    readonly type = GET_DOCUMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Success
 */
export class GetDocumentosSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Failed
 */
export class GetDocumentosFailed implements Action
{
    readonly type = GET_DOCUMENTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

export type ProcessoDetailActionsAll
    = GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed
    | CreateProcesso
    | CreateProcessoSuccess
    | EditProcesso
    | EditProcessoSuccess
    | SaveProcesso
    | SaveProcessoSuccess
    | SaveProcessoFailed
    | DarCienciaProcesso
    | DarCienciaProcessoSuccess
    | DarCienciaProcessoFailed
    | DeleteProcesso
    | DeleteProcessoSuccess
    | DeleteProcessoFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | SaveConteudoVinculacaoEtiqueta
    | SaveConteudoVinculacaoEtiquetaSuccess
    | SaveConteudoVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | DeselectProcessoAction
    | GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed;
