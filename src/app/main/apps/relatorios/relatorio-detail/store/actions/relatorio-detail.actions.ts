import {Action} from '@ngrx/store';

export const GET_RELATORIO = '[RELATORIO DETAIL] GET RELATORIO';
export const GET_RELATORIO_SUCCESS = '[RELATORIO DETAIL] GET RELATORIO SUCCESS';
export const GET_RELATORIO_FAILED = '[RELATORIO DETAIL] GET RELATORIO FAILED';

export const EDIT_RELATORIO = '[RELATORIO DETAIL] EDIT RELATORIO';
export const EDIT_RELATORIO_SUCCESS = '[RELATORIO DETAIL] EDIT RELATORIO SUCCESS';

export const CREATE_RELATORIO = '[RELATORIO DETAIL] CREATE RELATORIO';
export const CREATE_RELATORIO_SUCCESS = '[RELATORIO DETAIL] CREATE RELATORIO SUCCESS';

export const SAVE_RELATORIO = '[RELATORIO DETAIL] SAVE RELATORIO';
export const SAVE_RELATORIO_SUCCESS = '[RELATORIO DETAIL] SAVE RELATORIO SUCCESS';
export const SAVE_RELATORIO_FAILED = '[RELATORIO DETAIL] SAVE RELATORIO FAILED';

export const DELETE_RELATORIO = '[RELATORIO DETAIL] DELETE RELATORIO';
export const DELETE_RELATORIO_SUCCESS = '[RELATORIO DETAIL] DELETE RELATORIO SUCCESS';
export const DELETE_RELATORIO_FAILED = '[RELATORIO DETAIL] DELETE RELATORIO FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[RELATORIO DETAIL] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[RELATORIO DETAIL] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[RELATORIO DETAIL] VINCULACAO ETIQUETA FAILED';

export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA = '[RELATORIO DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS = '[RELATORIO DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA SUCCESS';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED = '[RELATORIO DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[RELATORIO DETAIL] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[RELATORIO DETAIL] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[RELATORIO DETAIL] DELETE VINCULACAO_ETIQUETA FAILED';

export const GET_DOCUMENTOS = '[RELATORIO DETAIL] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[RELATORIO DETAIL] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[RELATORIO DETAIL] GET DOCUMENTOS FAILED';

export const DESELECT_RELATORIO_ACTION = '[RELATORIO DETAIL] DESELECT RELATORIO ACTION';

/**
 * Get Relatorio
 */
export class GetRelatorio implements Action
{
    readonly type = GET_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relatorio Success
 */
export class GetRelatorioSuccess implements Action
{
    readonly type = GET_RELATORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relatorio Failed
 */
export class GetRelatorioFailed implements Action
{
    readonly type = GET_RELATORIO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Set Current Relatorio
 */
export class EditRelatorio implements Action
{
    readonly type = EDIT_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Current Relatorio Success
 */
export class EditRelatorioSuccess implements Action
{
    readonly type = EDIT_RELATORIO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Relatorio
 */
export class SaveRelatorio implements Action
{
    readonly type = SAVE_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Relatorio Success
 */
export class SaveRelatorioSuccess implements Action
{
    readonly type = SAVE_RELATORIO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Relatorio Failed
 */
export class SaveRelatorioFailed implements Action
{
    readonly type = SAVE_RELATORIO_FAILED;

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
 * Delete Relatorio
 */
export class DeleteRelatorio implements Action
{
    readonly type = DELETE_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Relatorio Success
 */
export class DeleteRelatorioSuccess implements Action
{
    readonly type = DELETE_RELATORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Relatorio Failed
 */
export class DeleteRelatorioFailed implements Action
{
    readonly type = DELETE_RELATORIO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat Relatorio
 */
export class CreateRelatorio implements Action
{
    readonly type = CREATE_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat Relatorio Success
 */
export class CreateRelatorioSuccess implements Action
{
    readonly type = CREATE_RELATORIO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Deselect Relatorio Action
 */
export class DeselectRelatorioAction implements Action
{
    readonly type = DESELECT_RELATORIO_ACTION;

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

export type RelatorioDetailActionsAll
    = GetRelatorio
    | GetRelatorioSuccess
    | GetRelatorioFailed
    | CreateRelatorio
    | CreateRelatorioSuccess
    | EditRelatorio
    | EditRelatorioSuccess
    | SaveRelatorio
    | SaveRelatorioSuccess
    | SaveRelatorioFailed
    | DeleteRelatorio
    | DeleteRelatorioSuccess
    | DeleteRelatorioFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | SaveConteudoVinculacaoEtiqueta
    | SaveConteudoVinculacaoEtiquetaSuccess
    | SaveConteudoVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | DeselectRelatorioAction
    | GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed;
