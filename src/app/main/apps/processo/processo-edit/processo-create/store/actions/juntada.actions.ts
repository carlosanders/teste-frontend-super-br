import {Action} from '@ngrx/store';

export const GET_JUNTADAS = '[DADOS BASICOS STEPS] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[DADOS BASICOS STEPS] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[DADOS BASICOS STEPS] GET JUNTADAS FAILED';

export const UNLOAD_JUNTADAS = '[DADOS BASICOS STEPS] UNLOAD JUNTADAS';

export const RELOAD_JUNTADAS = '[DADOS BASICOS STEPS] RELOAD JUNTADAS';
export const ASSINA_DOCUMENTO_JUNTADA = '[DADOS BASICOS STEPS] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_JUNTADA_SUCCESS = '[DADOS BASICOS STEPS] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_JUNTADA_FAILED = '[DADOS BASICOS STEPS] ASSINA DOCUMENTO FAILED';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[DADOS BASICOS STEPS] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[DADOS BASICOS STEPS] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[DADOS BASICOS STEPS] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const SAVE_DESENTRANHAMENTO = '[DADOS BASICOS STEPS] SAVE DESENTRANHAMENTO';
export const SAVE_DESENTRANHAMENTO_SUCCESS = '[DADOS BASICOS STEPS] SAVE DESENTRANHAMENTO SUCCESS';
export const SAVE_DESENTRANHAMENTO_FAILED = '[DADOS BASICOS STEPS] SAVE DESENTRANHAMENTO FAILED';

/**
 * Get Juntadas
 */
export class GetJuntadas implements Action
{
    readonly type = GET_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Success
 */
export class GetJuntadasSuccess implements Action
{
    readonly type = GET_JUNTADAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Failed
 */
export class GetJuntadasFailed implements Action
{
    readonly type = GET_JUNTADAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Juntadas
 */
export class UnloadJuntadas implements Action
{
    readonly type = UNLOAD_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento
 */
export class AssinaDocumento implements Action
{
    readonly type = ASSINA_DOCUMENTO_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Success
 */
export class AssinaDocumentoSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Failed
 */
export class AssinaDocumentoFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_JUNTADA_FAILED;

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
 * Reload Juntadas
 */
export class ReloadJuntadas implements Action
{
    readonly type = RELOAD_JUNTADAS;

    constructor()
    {
    }
}

/**
 * Save Desentranhamento
 */
export class SaveDesentranhamento implements Action
{
    readonly type = SAVE_DESENTRANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Desentranhamento Success
 */
export class SaveDesentranhamentoSuccess implements Action
{
    readonly type = SAVE_DESENTRANHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Desentranhamento Failed
 */
export class SaveDesentranhamentoFailed implements Action
{
    readonly type = SAVE_DESENTRANHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type JuntadaActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | UnloadJuntadas
    | ReloadJuntadas
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed
    | SaveDesentranhamento
    | SaveDesentranhamentoSuccess
    | SaveDesentranhamentoFailed;
