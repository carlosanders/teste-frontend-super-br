import {Action} from '@ngrx/store';

export const SAVE_PERFIL = '[PERFIL] SAVE PERFIL';
export const SAVE_PERFIL_SUCCESS = '[PERFIL] SAVE PERFIL SUCCESS';
export const SAVE_PERFIL_FAILED = '[PERFIL] SAVE PERFIL FAILED';
export const UPLOAD_IMAGEM_PERFIL = '[PERFIL] UPLOAD IMAGEM PERFIL';
export const UPLOAD_IMAGEM_PERFIL_SUCCESS = '[PERFIL] UPLOAD IMAGEM PERFIL SUCCESS';
export const UPLOAD_IMAGEM_PERFIL_FAILED = '[PERFIL] UPLOAD IMAGEM PERFIL FAILED';
export const UPLOAD_IMAGEM_CHANCELA = '[PERFIL] UPLOAD IMAGEM CHANCELA';
export const UPLOAD_IMAGEM_CHANCELA_SUCCESS = '[PERFIL] UPLOAD IMAGEM CHANCELA SUCCESS';
export const UPLOAD_IMAGEM_CHANCELA_FAILED = '[PERFIL] UPLOAD IMAGEM CHANCELA FAILED';

/**
 * Save Profile
 */
export class SaveProfile implements Action
{
    readonly type = SAVE_PERFIL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Profile Success
 */
export class SaveProfileSuccess implements Action
{
    readonly type = SAVE_PERFIL_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Profile Failed
 */
export class SaveProfileFailed implements Action
{
    readonly type = SAVE_PERFIL_FAILED;

    constructor(public payload: any)
    {
    }
}

export class UploadImagemPerfil implements Action
{
    readonly type = UPLOAD_IMAGEM_PERFIL;

    constructor(public payload: any)
    {
    }
}

export class UploadImagemPerfilSuccess implements Action
{
    readonly type = UPLOAD_IMAGEM_PERFIL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class UploadImagemPerfilFailed implements Action
{
    readonly type = UPLOAD_IMAGEM_PERFIL_FAILED;

    constructor(public payload: any)
    {
    }
}

export class UploadImagemChancela implements Action
{
    readonly type = UPLOAD_IMAGEM_CHANCELA;

    constructor(public payload: any)
    {
    }
}

export class UploadImagemChancelaSuccess implements Action
{
    readonly type = UPLOAD_IMAGEM_CHANCELA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class UploadImagemChancelaFailed implements Action
{
    readonly type = UPLOAD_IMAGEM_CHANCELA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ProfileActionsAll
    = SaveProfile
    | SaveProfileSuccess
    | SaveProfileFailed
    | UploadImagemPerfil
    | UploadImagemPerfilSuccess
    | UploadImagemPerfilFailed
    | UploadImagemChancela
    | UploadImagemChancelaSuccess
    | UploadImagemChancelaFailed;
