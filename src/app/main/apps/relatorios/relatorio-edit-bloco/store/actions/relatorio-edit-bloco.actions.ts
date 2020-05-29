import { Action } from '@ngrx/store';

export const EDIT_RELATORIO = '[RELATORIO EDIT] EDIT RELATORIO';
export const EDIT_RELATORIO_SUCCESS = '[RELATORIO EDIT] EDIT RELATORIO SUCCESS';

export const SAVE_RELATORIO = '[RELATORIO EDIT] SAVE RELATORIO';
export const SAVE_RELATORIO_SUCCESS = '[RELATORIO EDIT] SAVE RELATORIO SUCCESS';
export const SAVE_RELATORIO_FAILED = '[RELATORIO EDIT] SAVE RELATORIO FAILED';

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

    constructor(public payload: any)
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
 * Edit Relatorio
 */
export class EditRelatorio implements Action
{
    readonly type = EDIT_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Edit Relatorio Success
 */
export class EditRelatorioSuccess implements Action
{
    readonly type = EDIT_RELATORIO_SUCCESS;

    constructor()
    {
    }
}

export type RelatorioEditBlocoActionsAll
    = EditRelatorio
    | EditRelatorioSuccess
    | SaveRelatorio
    | SaveRelatorioSuccess
    | SaveRelatorioFailed;
