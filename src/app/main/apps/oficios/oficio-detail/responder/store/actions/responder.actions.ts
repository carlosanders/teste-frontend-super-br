import {Action} from '@ngrx/store';

export const SAVE_RESPOSTA = '[RESPOSTA CREATE] SAVE RESPOSTA';
export const SAVE_RESPOSTA_SUCCESS = '[RESPOSTA CREATE] SAVE RESPOSTA SUCCESS';
export const SAVE_RESPOSTA_FAILED = '[RESPOSTA CREATE] SAVE RESPOSTA FAILED';

export class SaveResposta implements Action {
    readonly type = SAVE_RESPOSTA;
    constructor(public payload: any) {
    }
}

export class SaveRespostaSuccess implements Action {
    readonly type = SAVE_RESPOSTA_SUCCESS;

    constructor(public payload: any) {
    }
}


export class SaveRespostaFailed implements Action {
    readonly type = SAVE_RESPOSTA_FAILED;
    constructor(public payload: any) {
    }
}

export type ResponderActionsAll
    = SaveResposta
    | SaveRespostaSuccess
    | SaveRespostaFailed;


