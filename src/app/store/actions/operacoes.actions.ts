import { Action } from '@ngrx/store';

export const RESULTADO = '[OPERACOES] RESULTADO';
export const OPERACAO = '[OPERACOES] OPERACAO';

/**
 * Resultado
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

export type OperacoesActionsAll
    = Resultado
    | Operacao;
