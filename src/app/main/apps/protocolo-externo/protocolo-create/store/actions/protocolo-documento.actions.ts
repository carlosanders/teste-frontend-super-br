import {Action} from '@ngrx/store';

export const ENVIAR_DOCUMENTO = '[PROTOCOLO-DOCUMENTO] ENVIAR RESPOSTA';
export const ENVIAR_DOCUMENTO_SUCCESS = '[PROTOCOLO-DOCUMENTO] ENVIAR RESPOSTA SUCCESS';
export const ENVIAR_DOCUMENTO_FAILED = '[PROTOCOLO-DOCUMENTO] ENVIAR RESPOSTA FAILED';

export const GET_DOCUMENTOS = '[PROTOCOLO-DOCUMENTO] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[PROTOCOLO-DOCUMENTO] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[PROTOCOLO-DOCUMENTO] GET DOCUMENTOS FAILED';

export const UNLOAD_DOCUMENTOS = '[PROTOCOLO-DOCUMENTO] UNLOAD DOCUMENTOS';
export const CLICKED_DOCUMENTO = '[PROTOCOLO-DOCUMENTO] CLICKED DOCUMENTO';

export const ASSINA_DOCUMENTO = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

/**
 * Unload Documentos
 */
export class UnloadDocumentos implements Action
{
    readonly type = UNLOAD_DOCUMENTOS;

    constructor()
    {
    }
}

/**
 * Clicked Documento
 */
export class ClickedDocumento implements Action
{
    readonly type = CLICKED_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}


export class EnviarDocumento implements Action {
    readonly type = ENVIAR_DOCUMENTO;
    constructor(public payload: any) {
    }
}

export class EnviarDocumentoSuccess implements Action {
    readonly type = ENVIAR_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}


export class EnviarDocumentoFailed implements Action {
    readonly type = ENVIAR_DOCUMENTO_FAILED;
    constructor(public payload: any) {
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

/**
 * Assina Documento
 */
export class AssinaDocumento implements Action
{
    readonly type = ASSINA_DOCUMENTO;

    constructor(public payload: any)
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

export type ProtocoloDocumentoActionsAll
    = EnviarDocumento
    | EnviarDocumentoSuccess
    | EnviarDocumentoFailed
    | GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | UnloadDocumentos
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed;
