import {Action} from '@ngrx/store';

export const GET_CONFIGURACOES_NUP = '[DADOS BASICOS STEPS] GET CONFIGURACOES NUP';
export const GET_CONFIGURACOES_NUP_SUCCESS = '[DADOS BASICOS STEPS] GET CONFIGURACOES NUP SUCCESS';
export const GET_CONFIGURACOES_NUP_FAILED = '[DADOS BASICOS STEPS] GET CONFIGURACOES NUP FAILED';

export const RELOAD_CONFIGURACOES_NUP = '[DADOS BASICOS STEPS] RELOAD CONFIGURACOES NUP';
export const UNLOAD_CONFIGURACOES_NUP = '[DADOS BASICOS STEPS] UNLOAD CONFIGURACOES NUP';

/**
 * Get ConfiguracoesNup
 */
export class GetConfiguracoesNup implements Action {
    readonly type = GET_CONFIGURACOES_NUP;

    constructor(public payload: any) {
    }
}

export class GetConfiguracoesNupSuccess implements Action {
    readonly type = GET_CONFIGURACOES_NUP_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetConfiguracoesNupFailed implements Action {
    readonly type = GET_CONFIGURACOES_NUP_FAILED;

    constructor(public payload: any) {
    }
}

export class ReloadConfiguracoesNup implements Action
{
    readonly type = RELOAD_CONFIGURACOES_NUP;

    constructor()
    {
    }
}

export class UnloadConfiguracoesNup implements Action
{
    readonly type = UNLOAD_CONFIGURACOES_NUP;

    constructor(public payload: any)
    {
    }
}

export type ConfiguracaoNupActionsAll
    = GetConfiguracoesNup
    | GetConfiguracoesNupFailed
    | GetConfiguracoesNupSuccess
    | ReloadConfiguracoesNup
    | UnloadConfiguracoesNup;
