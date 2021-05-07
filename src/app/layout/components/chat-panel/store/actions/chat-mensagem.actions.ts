import {Action} from '@ngrx/store';
import {ChatMensagem} from "../../../../../../@cdk/models";

export const ENVIAR_MENSAGEM = '[CHAT PANEL MENSAGEM] ENVIAR MENSAGEM';
export const ENVIAR_MENSAGEM_SUCCESS = '[CHAT PANEL MENSAGEM] ENVIAR MENSAGEM SUCCESS';
export const ENVIAR_MENSAGEM_FAILED = '[CHAT PANEL MENSAGEM] ENVIAR MENSAGEM FAILED';
export const APAGAR_MENSAGEM = '[CHAT PANEL MENSAGEM] APAGAR MENSAGEM';
export const APAGAR_MENSAGEM_SUCCESS = '[CHAT PANEL MENSAGEM] APAGAR MENSAGEM SUCCESS';
export const APAGAR_MENSAGEM_FAILED = '[CHAT PANEL MENSAGEM] APAGAR MENSAGEM FAILED';
export const GET_MENSAGENS = '[CHAT PANEL MENSAGEM] GET MENSAGENS';
export const GET_MENSAGENS_SUCCESS = '[CHAT PANEL MENSAGEM] GET MENSAGENS SUCCESS';
export const GET_MENSAGENS_FAILED = '[CHAT PANEL MENSAGEM] GET MENSAGENS FAILED';
export const MENSAGEM_RECEBIDA = '[CHAT PANEL MENSAGEM] MENSAGEM RECEBIDA';
export const VERIFICA_MEMORIA_REDUX = '[CHAT PANEL MENSAGEM] VERIFICA MEMORIA REDUX';

export class EnviarMensagem implements Action
{
    readonly type = ENVIAR_MENSAGEM;

    constructor(public payload: any) { }
}

export class EnviarMensagemSuccess implements Action
{
    readonly type = ENVIAR_MENSAGEM_SUCCESS;

    constructor(public payload: any) { }
}

export class EnviarMensagemFailed implements Action
{
    readonly type = ENVIAR_MENSAGEM_FAILED;

    constructor(public payload: any) { }
}

export class ApagarMensagem implements Action
{
    readonly type = APAGAR_MENSAGEM;

    constructor(public payload: any) { }
}

export class ApagarMensagemSuccess implements Action
{
    readonly type = APAGAR_MENSAGEM_SUCCESS;

    constructor(public payload: any) { }
}

export class ApagarMensagemFailed implements Action
{
    readonly type = APAGAR_MENSAGEM_FAILED;

    constructor(public payload: any) { }
}

export class GetMensagens implements Action
{
    readonly type = GET_MENSAGENS;

    constructor(public payload: any) { }
}

export class GetMensagensSuccess implements Action
{
    readonly type = GET_MENSAGENS_SUCCESS;

    constructor(public payload: any) { }
}

export class GetMensagensFailed implements Action
{
    readonly type = GET_MENSAGENS_FAILED;

    constructor(public payload: any) { }
}

export class MensagemRecebida implements Action
{
    readonly type = MENSAGEM_RECEBIDA;

    constructor(public payload: any) { }
}

export class VerificaMemoriaRedux implements Action
{
    readonly type = VERIFICA_MEMORIA_REDUX;

    constructor(public payload: any) { }
}

export type ChatMensagemActionsAll
    = EnviarMensagem
    | EnviarMensagemSuccess
    | EnviarMensagemFailed
    | ApagarMensagem
    | ApagarMensagemSuccess
    | ApagarMensagemFailed
    | GetMensagens
    | GetMensagensSuccess
    | GetMensagensFailed
    | MensagemRecebida
    | VerificaMemoriaRedux
    ;

