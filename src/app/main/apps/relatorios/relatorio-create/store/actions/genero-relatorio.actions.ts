import {Action} from '@ngrx/store';

export const GET_GENERO_RELATORIOS = '[GENERO-RELATORIO] GET GENERO_RELATORIOS';
export const GET_GENERO_RELATORIOS_SUCCESS = '[GENERO-RELATORIO] GET GENERO_RELATORIOS SUCCESS';
export const GET_GENERO_RELATORIOS_FAILED = '[GENERO-RELATORIO] GET GENERO_RELATORIOS FAILED';

/**
 * Get GeneroRelatorios
 */
export class GetGeneroRelatorios implements Action
{
    readonly type = GET_GENERO_RELATORIOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get GeneroRelatorios Success
 */
export class GetGeneroRelatoriosSuccess implements Action
{
    readonly type = GET_GENERO_RELATORIOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get GeneroRelatorios Failed
 */
export class GetGeneroRelatoriosFailed implements Action
{
    readonly type = GET_GENERO_RELATORIOS_FAILED;

    constructor(public payload: string)
    {
    }
}


export type GeneroRelatorioActionsAll
    = GetGeneroRelatorios
    | GetGeneroRelatoriosSuccess
    | GetGeneroRelatoriosFailed;
