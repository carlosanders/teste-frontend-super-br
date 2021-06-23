import {Action} from '@ngrx/store';

export const UNLOAD_DOCUMENTO = '[DOCUMENTO] UNLOAD DOCUMENTO';

/**
 * Unload Documento
 */
export class UnloadDocumento implements Action
{
    readonly type = UNLOAD_DOCUMENTO;

    constructor()
    {
    }
}

export type DocumentoActionsAll
    = UnloadDocumento;
