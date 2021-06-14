import {Action} from '@ngrx/store';

export const CREATE_RESPONDER_COMPLEMENTAR_BLOCO = '[OFICIO RESPONDER COMPLEMENTA CREATE BLOCO] CREATE OFICIO';
export const CREATE_RESPONDER_COMPLEMENTAR_BLOCO_SUCCESS = '[OFICIO RESPONDER COMPLEMENTA CREATE BLOCO] CREATE OFICIO SUCCESS';

/**
 * Create Atividade
 */
export class CreateResponderComplementarCreateBloco implements Action
{
    readonly type = CREATE_RESPONDER_COMPLEMENTAR_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Atividade Success
 */
export class CreateResponderComplementarCreateBlocoSuccess implements Action
{
    readonly type = CREATE_RESPONDER_COMPLEMENTAR_BLOCO_SUCCESS;

    constructor()
    {
    }
}

export type CreateResponderComplementarCreateBlocoBlocoActionsAll
    = CreateResponderComplementarCreateBloco
    | CreateResponderComplementarCreateBlocoSuccess;
