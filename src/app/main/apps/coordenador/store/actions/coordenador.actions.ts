import {Action} from '@ngrx/store';

export const GET_SETOR = '[COORDENADOR] GET SETOR';
export const GET_SETOR_SUCCESS = '[COORDENADOR] GET SETOR SUCCESS';
export const GET_SETOR_FAILED = '[COORDENADOR] GET SETOR FAILED';

export const GET_UNIDADE = '[COORDENADOR] GET UNIDADE';
export const GET_UNIDADE_SUCCESS = '[COORDENADOR] GET UNIDADE SUCCESS';
export const GET_UNIDADE_FAILED = '[COORDENADOR] GET UNIDADE FAILED';

export const GET_ORGAO_CENTRAL = '[COORDENADOR] GET ORGAO CENTRAL';
export const GET_ORGAO_CENTRAL_SUCCESS = '[COORDENADOR] GET ORGAO CENTRAL SUCCESS';
export const GET_ORGAO_CENTRAL_FAILED = '[COORDENADOR] GET ORGAO CENTRAL FAILED';

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
 * Get Setor
 */
export class GetUnidade implements Action
{
    readonly type = GET_UNIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setor Success
 */
export class GetUnidadeSuccess implements Action
{
    readonly type = GET_UNIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setor Failed
 */
export class GetUnidadeFailed implements Action
{
    readonly type = GET_UNIDADE_FAILED;

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

export type CoordenadorActionsAll
    = GetSetor
    | GetSetorSuccess
    | GetSetorFailed
    | GetUnidade
    | GetUnidadeSuccess
    | GetUnidadeFailed
    | GetOrgaoCentral
    | GetOrgaoCentralSuccess
    | GetOrgaoCentralFailed;
