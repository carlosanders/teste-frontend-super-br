import {Action} from '@ngrx/store';

export const CREATE_REPOSITORIO_ESPECIE_SETOR = '[COORDENADOR REPOSITORIOS ESPECIE SETOR EDIT] CREATE VINCULACAO REPOSITORIO';
export const CREATE_REPOSITORIO_ESPECIE_SETOR_SUCCESS = '[COORDENADOR REPOSITORIOS ESPECIE SETOR EDIT] CREATE VINCULACAO REPOSITORIO SUCCESS';

export const SAVE_REPOSITORIO_ESPECIE_SETOR = '[COORDENADOR REPOSITORIOS ESPECIE SETOR EDIT] SAVE VINCULACAO REPOSITORIO';
export const SAVE_REPOSITORIO_ESPECIE_SETOR_SUCCESS = '[COORDENADOR REPOSITORIOS ESPECIE SETOR EDIT] SAVE VINCULACAO REPOSITORIO SUCCESS';
export const SAVE_REPOSITORIO_ESPECIE_SETOR_FAILED = '[COORDENADOR REPOSITORIOS ESPECIE SETOR EDIT] SAVE VINCULACAO REPOSITORIO FAILED';

export const GET_REPOSITORIO_ESPECIE_SETOR = '[COORDENADOR REPOSITORIOS ESPECIE SETOR EDIT] GET VINCULACAO REPOSITORIO';
export const GET_REPOSITORIO_ESPECIE_SETOR_SUCCESS = '[COORDENADOR REPOSITORIOS ESPECIE SETOR EDIT] GET VINCULACAO REPOSITORIO SUCCESS';
export const GET_REPOSITORIO_ESPECIE_SETOR_FAILED = '[COORDENADOR REPOSITORIOS ESPECIE SETOR EDIT] GET VINCULACAO REPOSITORIO FAILED';

/**
 * Get VinculacaoRepositorio
 */
export class GetRepositorioEspecieSetor implements Action
{
    readonly type = GET_REPOSITORIO_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoRepositorio Success
 */
export class GetRepositorioEspecieSetorSuccess implements Action
{
    readonly type = GET_REPOSITORIO_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoRepositorio Failed
 */
export class GetRepositorioEspecieSetorFailed implements Action
{
    readonly type = GET_REPOSITORIO_ESPECIE_SETOR_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save VinculacaoRepositorio
 */
export class SaveRepositorioEspecieSetor implements Action
{
    readonly type = SAVE_REPOSITORIO_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save VinculacaoRepositorio Success
 */
export class SaveRepositorioEspecieSetorSuccess implements Action
{
    readonly type = SAVE_REPOSITORIO_ESPECIE_SETOR_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save VinculacaoRepositorio Failed
 */
export class SaveRepositorioEspecieSetorFailed implements Action
{
    readonly type = SAVE_REPOSITORIO_ESPECIE_SETOR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create VinculacaoRepositorio
 */
export class CreateRepositorioEspecieSetor implements Action
{
    readonly type = CREATE_REPOSITORIO_ESPECIE_SETOR;

    constructor()
    {
    }
}

/**
 * Create VinculacaoRepositorio Success
 */
export class CreateRepositorioEspecieSetorSuccess implements Action
{
    readonly type = CREATE_REPOSITORIO_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type RepositoriosEspecieSetorEditActionsAll
    = CreateRepositorioEspecieSetor
    | CreateRepositorioEspecieSetorSuccess
    | GetRepositorioEspecieSetor
    | GetRepositorioEspecieSetorSuccess
    | GetRepositorioEspecieSetorFailed
    | SaveRepositorioEspecieSetor
    | SaveRepositorioEspecieSetorSuccess
    | SaveRepositorioEspecieSetorFailed;
