import {Action} from '@ngrx/store';

export const GET_REPOSITORIOS_ESPECIE_SETOR = '[COORDENADOR REPOSITORIOS ESPECIE SETOR LIST] GET VINCULACOES REPOSITORIO';
export const GET_REPOSITORIOS_ESPECIE_SETOR_SUCCESS = '[COORDENADOR REPOSITORIOS ESPECIE SETOR LIST] GET VINCULACOES REPOSITORIO SUCCESS';
export const GET_REPOSITORIOS_ESPECIE_SETOR_FAILED = '[COORDENADOR REPOSITORIOS ESPECIE SETOR LIST] GET VINCULACOES REPOSITORIO FAILED';

export const RELOAD_REPOSITORIOS_ESPECIE_SETOR = '[COORDENADOR REPOSITORIOS ESPECIE SETOR LIST] RELOAD VINCULACOES REPOSITORIO';
export const UNLOAD_REPOSITORIOS_ESPECIE_SETOR = '[COORDENADOR REPOSITORIOS ESPECIE SETOR LIST] UNLOAD VINCULACOES REPOSITORIO';


export const DELETE_REPOSITORIO_ESPECIE_SETOR = '[COORDENADOR REPOSITORIOS ESPECIE SETOR LIST] DELETE VINCULACAO REPOSITORIO';
export const DELETE_REPOSITORIO_ESPECIE_SETOR_SUCCESS = '[COORDENADOR REPOSITORIOS ESPECIE SETOR LIST] DELETE VINCULACAO REPOSITORIO SUCCESS';
export const DELETE_REPOSITORIO_ESPECIE_SETOR_FAILED = '[COORDENADOR REPOSITORIOS ESPECIE SETOR LIST] DELETE VINCULACAO REPOSITORIO FAILED';


/**
 * Get VinculacaoRepositorio[]
 */
export class GetRepositoriosEspecieSetor implements Action
{
    readonly type = GET_REPOSITORIOS_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoRepositorio[] Success
 */
export class GetRepositoriosEspecieSetorSuccess implements Action
{
    readonly type = GET_REPOSITORIOS_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoRepositorio[] Failed
 */
export class GetRepositoriosEspecieSetorFailed implements Action
{
    readonly type = GET_REPOSITORIOS_ESPECIE_SETOR_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload RepositoriosEspecieSetor
 */
 export class UnloadRepositoriosEspecieSetor implements Action
 {
     readonly type = UNLOAD_REPOSITORIOS_ESPECIE_SETOR;

     constructor()
     {
     }
 }

/**
 * Reload RepositoriosEspecieSetor
 */
export class ReloadRepositoriosEspecieSetor implements Action
{
    readonly type = RELOAD_REPOSITORIOS_ESPECIE_SETOR;

    constructor()
    {
    }
}


/**
 * Delete VinculacaoRepositorio
 */
export class DeleteRepositorioEspecieSetor implements Action
{
    readonly type = DELETE_REPOSITORIO_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoRepositorio Success
 */
export class DeleteRepositorioEspecieSetorSuccess implements Action
{
    readonly type = DELETE_REPOSITORIO_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoRepositorio Failed
 */
export class DeleteRepositorioEspecieSetorFailed implements Action
{
    readonly type = DELETE_REPOSITORIO_ESPECIE_SETOR_FAILED;

    constructor(public payload: any)
    {
    }
}

export type RepositoriosEspecieSetorActionsAll
    = GetRepositoriosEspecieSetor
    | GetRepositoriosEspecieSetorSuccess
    | GetRepositoriosEspecieSetorFailed
    | UnloadRepositoriosEspecieSetor
    | ReloadRepositoriosEspecieSetor
    | DeleteRepositorioEspecieSetor
    | DeleteRepositorioEspecieSetorSuccess
    | DeleteRepositorioEspecieSetorFailed;
