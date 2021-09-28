import {Action} from '@ngrx/store';

export const GET_MESSAGES = '[CAIXA EMAIL] GET MESSAGES';
export const GET_MESSAGES_SUCCESS = '[CAIXA EMAIL] GET MESSAGES SUCCESS';
export const GET_MESSAGES_FAILED = '[CAIXA EMAIL] GET MESSAGES FAILED';

export const SET_MESSAGE = '[CAIXA EMAIL] SET MESSAGE';
export const UNLOAD_MESSAGE = '[CAIXA EMAIL] UNLOAD MESSAGE';
export const DOWNLOAD_ATTACHMENT = '[CAIXA EMAIL] DOWNLOAD ATTACHMENT';
export const DOWNLOAD_ATTACHMENT_SUCCESS = '[CAIXA EMAIL] DOWNLOAD ATTACHMENT SUCCESS';
export const DOWNLOAD_ATTACHMENT_FAILED = '[CAIXA EMAIL] DOWNLOAD ATTACHMENT FAILED';

export const GET_MESSAGE = '[CAIXA EMAIL] GET MESSAGE';
export const GET_MESSAGE_SUCCESS = '[CAIXA EMAIL] GET MESSAGE SUCCES';
export const GET_MESSAGE_FAILED = '[CAIXA EMAIL] GET MESSAGE FAILED';

export class GetMessages implements Action {
    readonly type = GET_MESSAGES;

    constructor(public payload: any) {
    }
}

export class GetMessagesSuccess implements Action {
    readonly type = GET_MESSAGES_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetMessagesFailed implements Action {
    readonly type = GET_MESSAGES_FAILED;

    constructor(public payload: any) {
    }
}

export class UnloadMessage implements Action {
    readonly type = UNLOAD_MESSAGE;
}

export class GetMessage implements Action {
    readonly type = GET_MESSAGE;

    constructor(public payload: any) {
    }
}

export class GetMessageSuccess implements Action {
    readonly type = GET_MESSAGE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetMessageFailed implements Action {
    readonly type = GET_MESSAGE_FAILED;

    constructor(public payload: any) {
    }
}

export class SetMessage implements Action {
    readonly type = SET_MESSAGE;

    constructor(public payload: any) {
    }
}

export class DownloadAttachment implements Action {
    readonly type = DOWNLOAD_ATTACHMENT;

    constructor(public payload: any) {
    }
}

export class DownloadAttachmentSuccess implements Action {
    readonly type = DOWNLOAD_ATTACHMENT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DownloadAttachmentFailed implements Action {
    readonly type = DOWNLOAD_ATTACHMENT_FAILED;

    constructor(public payload: any) {
    }
}

export type MessageActionsAll
    = GetMessages
    | GetMessagesSuccess
    | GetMessagesFailed
    | SetMessage
    | UnloadMessage
    | GetMessage
    | GetMessageSuccess
    | GetMessageFailed
    | DownloadAttachment
    | DownloadAttachmentSuccess
    | DownloadAttachmentFailed
    ;
