import {Action} from '@ngrx/store';

export const GET_MODELOS_ESPECIE_SETOR = '[COORDENADOR MODELOS ESPECIE SETOR LIST] GET VINCULACOES MODELO';
export const GET_MODELOS_ESPECIE_SETOR_SUCCESS = '[COORDENADOR MODELOS ESPECIE SETOR LIST] GET VINCULACOES MODELO SUCCESS';
export const GET_MODELOS_ESPECIE_SETOR_FAILED = '[COORDENADOR MODELOS ESPECIE SETOR LIST] GET VINCULACOES MODELO FAILED';

export const RELOAD_MODELOS_ESPECIE_SETOR = '[COORDENADOR MODELOS ESPECIE SETOR LIST] RELOAD VINCULACOES MODELO';
export const UNLOAD_MODELOS_ESPECIE_SETOR = '[COORDENADOR MODELOS ESPECIE SETOR LIST] UNLOAD VINCULACOES MODELO';


export const DELETE_MODELO_ESPECIE_SETOR = '[COORDENADOR MODELOS ESPECIE SETOR LIST] DELETE VINCULACAO MODELO';
export const DELETE_MODELO_ESPECIE_SETOR_SUCCESS = '[COORDENADOR MODELOS ESPECIE SETOR LIST] DELETE VINCULACAO MODELO SUCCESS';
export const DELETE_MODELO_ESPECIE_SETOR_FAILED = '[COORDENADOR MODELOS ESPECIE SETOR LIST] DELETE VINCULACAO MODELO FAILED';


/**
 * Get VinculacaoModelo[]
 */
export class GetModelosEspecieSetor implements Action
{
    readonly type = GET_MODELOS_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoModelo[] Success
 */
export class GetModelosEspecieSetorSuccess implements Action
{
    readonly type = GET_MODELOS_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoModelo[] Failed
 */
export class GetModelosEspecieSetorFailed implements Action
{
    readonly type = GET_MODELOS_ESPECIE_SETOR_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload ModelosEspeciesSetor
 */
 export class UnloadModelosEspecieSetor implements Action
 {
     readonly type = UNLOAD_MODELOS_ESPECIE_SETOR;

     constructor()
     {
     }
 }

/**
 * Reload ModelosEspeciesSetor
 */
export class ReloadModelosEspecieSetor implements Action
{
    readonly type = RELOAD_MODELOS_ESPECIE_SETOR;

    constructor()
    {
    }
}


/**
 * Delete VinculacaoModelo
 */
export class DeleteModeloEspecieSetor implements Action
{
    readonly type = DELETE_MODELO_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoModelo Success
 */
export class DeleteModeloEspecieSetorSuccess implements Action
{
    readonly type = DELETE_MODELO_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoModelo Failed
 */
export class DeleteModeloEspecieSetorFailed implements Action
{
    readonly type = DELETE_MODELO_ESPECIE_SETOR_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ModelosEspecieSetorActionsAll
    = GetModelosEspecieSetor
    | GetModelosEspecieSetorSuccess
    | GetModelosEspecieSetorFailed
    | UnloadModelosEspecieSetor
    | ReloadModelosEspecieSetor
    | DeleteModeloEspecieSetor
    | DeleteModeloEspecieSetorSuccess
    | DeleteModeloEspecieSetorFailed;
