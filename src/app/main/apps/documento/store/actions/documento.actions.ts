import {Action} from '@ngrx/store';

export const GET_DOCUMENTO = '[DOCUMENTO] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[DOCUMENTO] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[DOCUMENTO] GET DOCUMENTO FAILED';

export const UNLOAD_DOCUMENTO = '[DOCUMENTO] UNLOAD DOCUMENTO';

export const SAVE_DOCUMENTO = '[DOCUMENTO] SAVE DOCUMENTO';
export const SAVE_DOCUMENTO_SUCCESS = '[DOCUMENTO] SAVE DOCUMENTO SUCCESS';
export const SAVE_DOCUMENTO_FAILED = '[DOCUMENTO] SAVE DOCUMENTO FAILED';

export const SAVE_TEMPLATE = '[DOCUMENTO] SAVE TEMPLATE';
export const SAVE_TEMPLATE_SUCCESS = '[DOCUMENTO] SAVE TEMPLATE SUCCESS';
export const SAVE_TEMPLATE_FAILED = '[DOCUMENTO] SAVE TEMPLATE FAILED';

export const SET_CURRENT_STEP = '[DOCUMENTO] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[DOCUMENTO] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[DOCUMENTO] SET CURRENT STEP FAILED';

export const ASSINA_DOCUMENTO = '[DOCUMENTO] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[DOCUMENTO] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[DOCUMENTO] ASSINA DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[DOCUMENTO] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[DOCUMENTO] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[DOCUMENTO] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[DOCUMENTO] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[DOCUMENTO] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[DOCUMENTO] VINCULACAO ETIQUETA FAILED';

export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA = '[DOCUMENTO] SAVE CONTEUDO VINCULACAO ETIQUETA';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS = '[DOCUMENTO] SAVE CONTEUDO VINCULACAO ETIQUETA SUCCESS';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED = '[DOCUMENTO] SAVE CONTEUDO VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[DOCUMENTO] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[DOCUMENTO] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[DOCUMENTO] DELETE VINCULACAO_ETIQUETA FAILED';

export const CRIADO_ANEXO_DOCUMENTO = '[DOCUMENTO] CRIADO ANEXO EM DOCUMENTO';
export const REMOVIDO_ANEXO_DOCUMENTO = '[DOCUMENTO] REMOVIDO ANEXO DE DOCUMENTO';

/**
 * Get Documento
 */
export class GetDocumento implements Action
{
    readonly type = GET_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Get Documento Success
 */
export class GetDocumentoSuccess implements Action
{
    readonly type = GET_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento Failed
 */
export class GetDocumentoFailed implements Action
{
    readonly type = GET_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Documento
 */
export class UnloadDocumento implements Action
{
    readonly type = UNLOAD_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Save Documento
 */
export class SaveDocumento implements Action
{
    readonly type = SAVE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Documento Success
 */
export class SaveDocumentoSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Documento Failed
 */
export class SaveDocumentoFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Template
 */
export class SaveTemplate implements Action
{
    readonly type = SAVE_TEMPLATE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Template Success
 */
export class SaveTemplateSuccess implements Action
{
    readonly type = SAVE_TEMPLATE_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Template Failed
 */
export class SaveTemplateFailed implements Action
{
    readonly type = SAVE_TEMPLATE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Current Step
 */
export class SetCurrentStep implements Action {
    readonly type = SET_CURRENT_STEP;

    constructor(public payload: any) {
    }
}

/**
 * Set Current Step Success
 */
export class SetCurrentStepSuccess implements Action {
    readonly type = SET_CURRENT_STEP_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Set Current Step Failed
 */
export class SetCurrentStepFailed implements Action {
    readonly type = SET_CURRENT_STEP_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Assina Documento
 */
export class AssinaDocumento implements Action
{
    readonly type = ASSINA_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Assina Documento Success
 */
export class AssinaDocumentoSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Failed
 */
export class AssinaDocumentoFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Eletronicamente
 */
export class AssinaDocumentoEletronicamente implements Action
{
    readonly type = ASSINA_DOCUMENTO_ELETRONICAMENTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Eletronicamente Success
 */
export class AssinaDocumentoEletronicamenteSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Eletronicamente Failed
 */
export class AssinaDocumentoEletronicamenteFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED;

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
 * Action disparada quando um anexo for criado em um documento
 */
export class CriadoAnexoDocumento implements Action
{
    readonly type = CRIADO_ANEXO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Action disparada quando um anexo for removido de um documento
 */
export class RemovidoAnexoDocumento implements Action
{
    readonly type = REMOVIDO_ANEXO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

export type DocumentoActionsAll
    = GetDocumento
    | GetDocumentoSuccess
    | GetDocumentoFailed
    | UnloadDocumento
    | SaveDocumento
    | SaveDocumentoSuccess
    | SaveDocumentoFailed
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed
    | SaveTemplate
    | SaveTemplateSuccess
    | SaveTemplateFailed
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | SaveConteudoVinculacaoEtiqueta
    | SaveConteudoVinculacaoEtiquetaSuccess
    | SaveConteudoVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | CriadoAnexoDocumento
    | RemovidoAnexoDocumento;
