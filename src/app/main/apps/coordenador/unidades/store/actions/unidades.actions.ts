import {Action} from '@ngrx/store';

export const GET_SETOR = '[UNIDADES-ORGAO-CENTRAL] GET SETOR';
export const GET_SETOR_SUCCESS = '[UNIDADES-ORGAO-CENTRAL] GET SETOR SUCCESS';
export const GET_SETOR_FAILED = '[UNIDADES-ORGAO-CENTRAL] GET SETOR FAILED';

export const GET_ORGAO_CENTRAL = '[UNIDADES-ORGAO-CENTRAL] GET ORGAO CENTRAL';
export const GET_ORGAO_CENTRAL_SUCCESS = '[UNIDADES-ORGAO-CENTRAL] GET ORGAO CENTRAL SUCCESS';
export const GET_ORGAO_CENTRAL_FAILED = '[UNIDADES-ORGAO-CENTRAL] GET ORGAO CENTRAL FAILED';

/**
 * Get Setor
 */
export class GetSetor implements Action
{
    readonly type = GET_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setor Success
 */
export class GetSetorSuccess implements Action
{
    readonly type = GET_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setor Failed
 */
export class GetSetorFailed implements Action
{
    readonly type = GET_SETOR_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Get ModalidadeOrgaoCentral
 */
export class GetOrgaoCentral implements Action
{
    readonly type = GET_ORGAO_CENTRAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ModalidadeOrgaoCentral Success
 */
export class GetOrgaoCentralSuccess implements Action
{
    readonly type = GET_ORGAO_CENTRAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ModalidadeOrgaoCentral Failed
 */
export class GetOrgaoCentralFailed implements Action
{
    readonly type = GET_ORGAO_CENTRAL_FAILED;

    constructor(public payload: string)
    {
    }
}

export type UnidadesOrgaoCentralActionsAll
    = GetSetor
    | GetSetorSuccess
    | GetSetorFailed
    | GetOrgaoCentral
    | GetOrgaoCentralSuccess
    | GetOrgaoCentralFailed;
