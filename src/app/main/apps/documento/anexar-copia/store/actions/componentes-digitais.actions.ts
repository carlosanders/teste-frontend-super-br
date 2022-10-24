import {Action} from '@ngrx/store';

export const VISUALIZAR_JUNTADA = '[ANEXAR COPIA] VISUALIZAR JUNTADA';
export const VISUALIZAR_JUNTADA_FAILED = '[ANEXAR COPIA] VISUALIZAR JUNTADA FAILED';

/**
 * Visualizar Juntada
 */
 export class VisualizarJuntada implements Action
 {
     readonly type = VISUALIZAR_JUNTADA;

     constructor(public payload: any)
     {
     }
 }

 /**
  * Visualizar Juntada Failed
  */
 export class VisualizarJuntadaFailed implements Action
 {
     readonly type = VISUALIZAR_JUNTADA_FAILED;

     constructor(public payload: any)
     {
     }
 }

export type ComponenteDigitalActionsAll
    = VisualizarJuntada
    | VisualizarJuntadaFailed;
