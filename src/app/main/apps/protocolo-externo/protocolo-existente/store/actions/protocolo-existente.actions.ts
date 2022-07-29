import {Action} from '@ngrx/store';

export const CREATE_JUNTADA = '[JUNTADA CREATE] CREATE JUNTADA';
export const CREATE_JUNTADA_SUCCESS = '[JUNTADA CREATE] CREATE JUNTADA SUCCESS';

export const SAVE_JUNTADA = '[JUNTADA CREATE] SAVE JUNTADA';
export const SAVE_JUNTADA_SUCCESS = '[JUNTADA CREATE] SAVE JUNTADA SUCCESS';
export const SAVE_JUNTADA_FAILED = '[JUNTADA CREATE] SAVE JUNTADA FAILED';

export const CONCLUIR_JUNTADA = '[JUNTADA CREATE] CONCLUIR JUNTADA';

/**
 * Save Juntada
 */
export class SaveJuntada implements Action
{
    readonly type = SAVE_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Juntada Success
 */
export class SaveJuntadaSuccess implements Action
{
    readonly type = SAVE_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Juntada Failed
 */
export class SaveJuntadaFailed implements Action
{
    readonly type = SAVE_JUNTADA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Juntada
 */
export class CreateJuntada implements Action
{
    readonly type = CREATE_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Juntada Success
 */
export class CreateJuntadaSuccess implements Action
{
    readonly type = CREATE_JUNTADA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Concluir Juntada
 */
export class ConcluirJuntada implements Action
{
    readonly type = CONCLUIR_JUNTADA;

    constructor()
    {
    }
}

export type ProtocoloExistenteActionsAll
    = CreateJuntada
    | CreateJuntadaSuccess
    | SaveJuntada
    | SaveJuntadaSuccess
    | SaveJuntadaFailed
    | ConcluirJuntada;
