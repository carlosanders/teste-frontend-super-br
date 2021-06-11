import {Action} from '@ngrx/store';

export const CREATE_MODELO_ESPECIE_SETOR = '[COORDENADOR MODELOS ESPECIE SETOR EDIT] CREATE VINCULACAO MODELO';
export const CREATE_MODELO_ESPECIE_SETOR_SUCCESS = '[COORDENADOR MODELOS ESPECIE SETOR EDIT] CREATE VINCULACAO MODELO SUCCESS';

export const SAVE_MODELO_ESPECIE_SETOR = '[COORDENADOR MODELOS ESPECIE SETOR EDIT] SAVE VINCULACAO MODELO';
export const SAVE_MODELO_ESPECIE_SETOR_SUCCESS = '[COORDENADOR MODELOS ESPECIE SETOR EDIT] SAVE VINCULACAO MODELO SUCCESS';
export const SAVE_MODELO_ESPECIE_SETOR_FAILED = '[COORDENADOR MODELOS ESPECIE SETOR EDIT] SAVE VINCULACAO MODELO FAILED';

export const GET_MODELO_ESPECIE_SETOR = '[COORDENADOR MODELOS ESPECIE SETOR EDIT] GET VINCULACAO MODELO';
export const GET_MODELO_ESPECIE_SETOR_SUCCESS = '[COORDENADOR MODELOS ESPECIE SETOR EDIT] GET VINCULACAO MODELO SUCCESS';
export const GET_MODELO_ESPECIE_SETOR_FAILED = '[COORDENADOR MODELOS ESPECIE SETOR EDIT] GET VINCULACAO MODELO FAILED';

/**
 * Get VinculacaoModelo
 */
export class GetModeloEspecieSetor implements Action
{
    readonly type = GET_MODELO_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoModelo Success
 */
export class GetModeloEspecieSetorSuccess implements Action
{
    readonly type = GET_MODELO_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoModelo Failed
 */
export class GetModeloEspecieSetorFailed implements Action
{
    readonly type = GET_MODELO_ESPECIE_SETOR_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save VinculacaoModelo
 */
export class SaveModeloEspecieSetor implements Action
{
    readonly type = SAVE_MODELO_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save VinculacaoModelo Success
 */
export class SaveModeloEspecieSetorSuccess implements Action
{
    readonly type = SAVE_MODELO_ESPECIE_SETOR_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save VinculacaoModelo Failed
 */
export class SaveModeloEspecieSetorFailed implements Action
{
    readonly type = SAVE_MODELO_ESPECIE_SETOR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create VinculacaoModelo
 */
export class CreateModeloEspecieSetor implements Action
{
    readonly type = CREATE_MODELO_ESPECIE_SETOR;

    constructor()
    {
    }
}

/**
 * Create VinculacaoModelo Success
 */
export class CreateModeloEspecieSetorSuccess implements Action
{
    readonly type = CREATE_MODELO_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type ModelosEspecieSetorEditActionsAll
    = CreateModeloEspecieSetor
    | CreateModeloEspecieSetorSuccess
    | GetModeloEspecieSetor
    | GetModeloEspecieSetorSuccess
    | GetModeloEspecieSetorFailed
    | SaveModeloEspecieSetor
    | SaveModeloEspecieSetorSuccess
    | SaveModeloEspecieSetorFailed;
