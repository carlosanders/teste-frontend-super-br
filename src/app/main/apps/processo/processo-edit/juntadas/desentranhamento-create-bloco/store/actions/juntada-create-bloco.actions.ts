import {Action} from '@ngrx/store';

export const GET_JUNTADAS = '[JUNTADA DESENTRANHAMENTO LIST] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[JUNTADA DESENTRANHAMENTO LIST] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[JUNTADA DESENTRANHAMENTO LIST] GET JUNTADAS FAILED';
export const RELOAD_JUNTADAS = '[JUNTADA DESENTRANHAMENTO LIST] RELOAD JUNTADAS';
export const SET_SELECTED_JUNTADAS = '[JUNTADA DESENTRANHAMENTO LIST] SET SELECTED JUNTADAS';

export const CREATE_DESENTRANHAMENTO = '[DESENTRANHAMENTO CREATE BLOCO] CREATE DESENTRANHAMENTO';
export const CREATE_DESENTRANHAMENTO_SUCCESS = '[DESENTRANHAMENTO CREATE BLOCO] CREATE DESENTRANHAMENTO SUCCESS';

export const SAVE_DESENTRANHAMENTO = '[DESENTRANHAMENTO CREATE BLOCO] SAVE DESENTRANHAMENTO';
export const SAVE_DESENTRANHAMENTO_SUCCESS = '[DESENTRANHAMENTO CREATE BLOCO] SAVE DESENTRANHAMENTO SUCCESS';
export const SAVE_DESENTRANHAMENTO_FAILED = '[DESENTRANHAMENTO CREATE BLOCO] SAVE DESENTRANHAMENTO FAILED';
export const SAVE_DESENTRANHAMENTO_CANCEL = '[DESENTRANHAMENTO CREATE BLOCO] SAVE DESENTRANHAMENTO CANCEL';
export const SAVE_DESENTRANHAMENTO_CANCEL_SUCCESS = '[DESENTRANHAMENTO CREATE BLOCO] SAVE DESENTRANHAMENTO CANCEL SUCCESS';
export const SAVE_DESENTRANHAMENTO_FLUSH = '[DESENTRANHAMENTO CREATE BLOCO] SAVE DESENTRANHAMENTO FLUSH';

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

/**
 * Save Desentranhamento Cancel
 */
export class SaveDesentranhamentoCancel implements Action
{
    readonly type = SAVE_DESENTRANHAMENTO_CANCEL;

    constructor()
    {
    }
}

/**
 * Save Desentranhamento Cancel Success
 */
export class SaveDesentranhamentoCancelSuccess implements Action
{
    readonly type = SAVE_DESENTRANHAMENTO_CANCEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Desentranhamento Flush
 */
export class SaveDesentranhamentoFlush implements Action
{
    readonly type = SAVE_DESENTRANHAMENTO_FLUSH;

    constructor()
    {
    }
}

/**
 * Create Desentranhamento
 */
export class CreateDesentranhamento implements Action
{
    readonly type = CREATE_DESENTRANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Desentranhamento Success
 */
export class CreateDesentranhamentoSuccess implements Action
{
    readonly type = CREATE_DESENTRANHAMENTO_SUCCESS;

    constructor()
    {
    }
}

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
 * Set Selected Juntadas
 */
export class SetSelectedJuntadas implements Action
{
    readonly type = SET_SELECTED_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

export type JuntadaCreateBlocoActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | ReloadJuntadas
    | SetSelectedJuntadas
    | CreateDesentranhamento
    | CreateDesentranhamentoSuccess
    | SaveDesentranhamento
    | SaveDesentranhamentoSuccess
    | SaveDesentranhamentoFailed
    | SaveDesentranhamentoCancel
    | SaveDesentranhamentoCancelSuccess
    | SaveDesentranhamentoFlush;

