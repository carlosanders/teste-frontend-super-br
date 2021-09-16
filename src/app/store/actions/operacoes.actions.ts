import {Action} from '@ngrx/store';

export const RESULTADO = '[OPERACOES] RESULTADO';
export const OPERACAO = '[OPERACOES] OPERACAO';
export const UNLOAD_OPERACAO = '[OPERACOES] UNLOAD OPERACAO';
export const SET_CURRENT_LOTE = '[OPERACOES] SET CURRENT LOTE';

/**
 * Resultado
 *
 * @deprecated
 */
export class Resultado implements Action
{
    readonly type = RESULTADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Operacao
 */
export class Operacao implements Action
{
    readonly type = OPERACAO;

    constructor(public payload: any)
    {
    }
}

export class UnloadOperacao implements Action
{
    readonly type = UNLOAD_OPERACAO;

    constructor()
    {
    }
}

export class SetCurrentLote implements Action
{
    readonly type = SET_CURRENT_LOTE;

    constructor(public payload: any)
    {
    }
}

export type OperacoesActionsAll
    = Resultado
    | Operacao
    | UnloadOperacao
    | SetCurrentLote;
