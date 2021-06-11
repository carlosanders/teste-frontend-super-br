import {Action} from '@ngrx/store';

export const CREATE_RELATORIO = '[RELATORIO CREATE] CREATE RELATORIO';
export const CREATE_RELATORIO_SUCCESS = '[RELATORIO CREATE] CREATE RELATORIO SUCCESS';

export const SAVE_RELATORIO = '[RELATORIO CREATE] SAVE RELATORIO';
export const SAVE_RELATORIO_SUCCESS = '[RELATORIO CREATE] SAVE RELATORIO SUCCESS';
export const SAVE_RELATORIO_FAILED = '[RELATORIO CREATE] SAVE RELATORIO FAILED';

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
 * Create Relatorio
 */
export class CreateRelatorio implements Action
{
    readonly type = CREATE_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Relatorio Success
 */
export class CreateRelatorioSuccess implements Action
{
    readonly type = CREATE_RELATORIO_SUCCESS;

    constructor()
    {
    }
}

export type RelatorioCreateActionsAll
    = CreateRelatorio
    | CreateRelatorioSuccess

    | SaveRelatorio
    | SaveRelatorioSuccess
    | SaveRelatorioFailed;
