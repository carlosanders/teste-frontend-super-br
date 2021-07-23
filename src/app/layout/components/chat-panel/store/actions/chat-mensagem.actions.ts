import {Action} from '@ngrx/store';

export const ENVIAR_MENSAGEM = '[CHAT PANEL MENSAGEM] ENVIAR MENSAGEM';
export const ENVIAR_MENSAGEM_SUCCESS = '[CHAT PANEL MENSAGEM] ENVIAR MENSAGEM SUCCESS';
export const ENVIAR_MENSAGEM_FAILED = '[CHAT PANEL MENSAGEM] ENVIAR MENSAGEM FAILED';
export const APAGAR_MENSAGEM = '[CHAT PANEL MENSAGEM] APAGAR MENSAGEM';
export const APAGAR_MENSAGEM_SUCCESS = '[CHAT PANEL MENSAGEM] APAGAR MENSAGEM SUCCESS';
export const APAGAR_MENSAGEM_FAILED = '[CHAT PANEL MENSAGEM] APAGAR MENSAGEM FAILED';
export const GET_MENSAGENS = '[CHAT PANEL MENSAGEM] GET MENSAGENS';
export const GET_MENSAGENS_SUCCESS = '[CHAT PANEL MENSAGEM] GET MENSAGENS SUCCESS';
export const GET_MENSAGENS_FAILED = '[CHAT PANEL MENSAGEM] GET MENSAGENS FAILED';
export const GET_MENSAGENS_INCREMENT = '[CHAT PANEL MENSAGEM] GET MENSAGENS INCREMENT';
export const GET_MENSAGENS_INCREMENT_SUCCESS = '[CHAT PANEL MENSAGEM] GET MENSAGENS INCREMENT SUCCESS';
export const GET_MENSAGENS_INCREMENT_FAILED = '[CHAT PANEL MENSAGEM] GET MENSAGENS INCREMENT FAILED';
export const MENSAGEM_RECEBIDA = '[CHAT PANEL MENSAGEM] MENSAGEM RECEBIDA';
export const UNLOAD_CHAT_MENSAGENS = '[CHAT PANEL MENSAGEM] UNLOAD CHAT MENSAGEMS';

export const CHAT_MENSAGENS_LIMPAR_ERROS = '[CHAT PANEL MENSAGEM] LIMPAR ERROS';

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

export class GetMensagensIncrement implements Action
{
    readonly type = GET_MENSAGENS_INCREMENT;

    constructor(public payload: any) { }
}

export class GetMensagensIncrementSuccess implements Action
{
    readonly type = GET_MENSAGENS_INCREMENT_SUCCESS;

    constructor(public payload: any) { }
}

export class GetMensagensIncrementFailed implements Action
{
    readonly type = GET_MENSAGENS_INCREMENT_FAILED;

    constructor(public payload: any) { }
}

export class MensagemRecebida implements Action
{
    readonly type = MENSAGEM_RECEBIDA;

    constructor(public payload: any) { }
}

export class UnloadChatMensagens implements Action
{
    readonly type = UNLOAD_CHAT_MENSAGENS;

    constructor() { }
}

export class ChatMensagensLimparErros implements Action
{
    readonly type = CHAT_MENSAGENS_LIMPAR_ERROS;

    constructor() { }
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
    | GetMensagensIncrement
    | GetMensagensIncrementSuccess
    | GetMensagensIncrementFailed
    | MensagemRecebida
    | UnloadChatMensagens
    | ChatMensagensLimparErros
    ;

