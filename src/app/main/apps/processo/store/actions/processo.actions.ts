import { Action } from '@ngrx/store';

export const CREATE_PROCESSO = '[PROCESSO] CREATE PROCESSO';
export const UNLOAD_PROCESSO = '[PROCESSO] UNLOAD PROCESSO';

export const GET_PROCESSO = '[PROCESSO] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[PROCESSO] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[PROCESSO] GET PROCESSO FAILED';

export const AUTUAR_PROCESSO = '[PROCESSO] AUTUAR PROCESSO';
export const AUTUAR_PROCESSO_SUCCESS = '[PROCESSO] AUTUAR PROCESSO SUCCESS';
export const AUTUAR_PROCESSO_FAILED = '[PROCESSO] AUTUAR PROCESSO FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[PROCESSO] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[PROCESSO] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[PROCESSO] VINCULACAO ETIQUETA FAILED';

export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA = '[PROCESSO] SAVE CONTEUDO VINCULACAO ETIQUETA';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS = '[PROCESSO] SAVE CONTEUDO VINCULACAO ETIQUETA SUCCESS';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED = '[PROCESSO] SAVE CONTEUDO VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[PROCESSO] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[PROCESSO] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[PROCESSO] DELETE VINCULACAO_ETIQUETA FAILED';

export const ARQUIVAR_PROCESSO = '[PROCESSO] ARQUIVAR PROCESSO';
export const ARQUIVAR_PROCESSO_SUCCESS = '[PROCESSO] ARQUIVAR PROCESSO SUCCESS';
export const ARQUIVAR_PROCESSO_FAILED = '[PROCESSO] ARQUIVAR PROCESSO FAILED';

export const SET_STEPS = '[PROCESSO] SET STEPS';

export const EXPANDIR_PROCESSO = '[PROCESSO VIEW] EXPANDIR PROCESSO';


export const GET_ACOMPANHAMENTO = '[PROCESSO] GET ACOMPANHAMENTO';
export const GET_ACOMPANHAMENTO_SUCCESS = '[PROCESSO] GET ACOMPANHAMENTO SUCCESS';
export const GET_ACOMPANHAMENTO_FAILED = '[PROCESSO] GET ACOMPANHAMENTO FAILED';

export const UNLOAD_ACOMPANHAMENTO = '[PROCESSO] UNLOAD ACOMPANHAMENTO';

export const SAVE_ACOMPANHAMENTO = '[PROCESSO] SAVE ACOMPANHAMENTO PROCESSO';
export const SAVE_ACOMPANHAMENTO_FAILED = '[PROCESSO] SAVE ACOMPANHAMENTO PROCESSO FAILED';
export const SAVE_ACOMPANHAMENTO_SUCCESS = '[PROCESSO] SAVE ACOMPANHAMENTO PROCESSO SUCCESS';

export const CREATE_ACOMPANHAMENTO = '[PROCESSO] CREATE ACOMPANHAMENTO PROCESSO SUCCESS';
export const CREATE_ACOMPANHAMENTO_SUCCESS = '[PROCESSO] CREATE ACOMPANHAMENTO PROCESSO SUCCESS';

export const DELETE_ACOMPANHAMENTO = '[PROCESSO] DELETE ACOMPANHAMENTO PROCESSO';
export const DELETE_ACOMPANHAMENTO_SUCCESS = '[PROCESSO] DELETE ACOMPANHAMENTO PROCESSO SUCCESS';
export const DELETE_ACOMPANHAMENTO_FAILED = '[PROCESSO] DELETE ACOMPANHAMENTO PROCESSO FAILED';

export const SET_TOGGLE_ACOMPANHAMENTO = '[PROCESSO] SET TOGGLE ACOMPANHAMENTO PROCESSO';
export const SET_TOGGLE_ACOMPANHAMENTO_SUCCESS = '[PROCESSO] SET TOGGLE ACOMPANHAMENTO PROCESSO SUCCESS';


/**
 * Expandir Processo
 */
export class ExpandirProcesso implements Action
{
    readonly type = EXPANDIR_PROCESSO;

    constructor(public payload: boolean)
    {
    }
}


/**
 * Create Processo
 */
export class CreateProcesso implements Action
{
    readonly type = CREATE_PROCESSO;

    constructor()
    {
    }
}

/**
 * Create Processo
 */
export class UnloadProcesso implements Action
{
    readonly type = UNLOAD_PROCESSO;

    constructor()
    {
    }
}

/**
 * Get Processo
 */
export class GetProcesso implements Action
{
    readonly type = GET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action
{
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action
{
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Autuar Processo
 */
export class AutuarProcesso implements Action
{
    readonly type = AUTUAR_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Autuar Processo Success
 */
export class AutuarProcessoSuccess implements Action
{
    readonly type = AUTUAR_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Autuar Processo Failed
 */
export class AutuarProcessoFailed implements Action
{
    readonly type = AUTUAR_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta
 */
export class SaveConteudoVinculacaoEtiqueta implements Action
{
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta Success
 */
export class SaveConteudoVinculacaoEtiquetaSuccess implements Action
{
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta Failed
 */
export class SaveConteudoVinculacaoEtiquetaFailed implements Action
{
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Delete Vinculacao Etiqueta
 */
export class DeleteVinculacaoEtiqueta implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Success
 */
export class DeleteVinculacaoEtiquetaSuccess implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Failed
 */
export class DeleteVinculacaoEtiquetaFailed implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Success
 */
export class CreateVinculacaoEtiquetaSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Failed
 */
export class CreateVinculacaoEtiquetaFailed implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export class SetSteps implements Action{
    readonly type = SET_STEPS;

    constructor(public payload: any)
    {
    }
}


/**
 * Arquivar Processo
 */
export class ArquivarProcesso implements Action
{
    readonly type = ARQUIVAR_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Arquivar Processo Success
 */
export class ArquivarProcessoSuccess implements Action
{
    readonly type = ARQUIVAR_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Arquivar Processo Failed
 */
export class ArquivarProcessoFailed implements Action
{
    readonly type = ARQUIVAR_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Get Acompanhamento Processo
 */
export class GetAcompanhamento implements Action {
    readonly type = GET_ACOMPANHAMENTO;

    constructor(public payload: any) {

    }
}

/**
 * Get Acompanhamento Processo
 */
export class GetAcompanhamentoSuccess implements Action {
    readonly type = GET_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Acompanhamento Processo
 */
export class GetAcompanhamentoFailed implements Action {
    readonly type = GET_ACOMPANHAMENTO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload Acompanhamento
 */
export class UnloadAcompanhamento implements Action
{
    readonly type = UNLOAD_ACOMPANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Acompanhamento
 */
export class SaveAcompanhamento implements Action
{
    readonly type = SAVE_ACOMPANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Acompanhamento Success
 */
export class SaveAcompanhamentoSuccess implements Action
{
    readonly type = SAVE_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Acompanhamento Failed
 */
export class SaveAcompanhamentoFailed implements Action
{
    readonly type = SAVE_ACOMPANHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Create Acompanhamento
 */
export class CreateAcompanhamento implements Action
{
    readonly type = CREATE_ACOMPANHAMENTO;

    constructor()
    {
    }
}

/**
 * Create Acompanhamento Success
 */
export class CreateAcompanhamentoSuccess implements Action {
    readonly type = CREATE_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}


/**
 * Delete Acompanhamento
 */
export class DeleteAcompanhamento implements Action
{
    readonly type = DELETE_ACOMPANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Acompanhamento Success
 */
export class DeleteAcompanhamentoSuccess implements Action
{
    readonly type = DELETE_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Acompanhamento Failed
 */
export class DeleteAcompanhamentoFailed implements Action
{
    readonly type = DELETE_ACOMPANHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class SetToggleAcompanhamento implements Action {
    readonly type = SET_TOGGLE_ACOMPANHAMENTO;

    constructor(public payload: any) {
    }
}

export class SetToggleAcompanhamentoSuccess implements Action {
    readonly type = SET_TOGGLE_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

export type ProcessoActionsAll
    = CreateProcesso
    | UnloadProcesso
    | AutuarProcesso
    | AutuarProcessoSuccess
    | AutuarProcessoFailed
    | GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | SaveConteudoVinculacaoEtiqueta
    | SaveConteudoVinculacaoEtiquetaSuccess
    | SaveConteudoVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | SetSteps
    | ArquivarProcesso
    | ArquivarProcessoSuccess
    | ArquivarProcessoFailed
    | ExpandirProcesso
    | GetAcompanhamento
    | GetAcompanhamentoSuccess
    | GetAcompanhamentoFailed
    | UnloadAcompanhamento
    | CreateAcompanhamento
    | CreateAcompanhamentoSuccess
    | SaveAcompanhamento
    | SaveAcompanhamentoSuccess
    | SaveAcompanhamentoFailed
    | DeleteAcompanhamento
    | DeleteAcompanhamentoSuccess
    | DeleteAcompanhamentoFailed
    | SetToggleAcompanhamento
    | SetToggleAcompanhamentoSuccess;
