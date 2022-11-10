import {Action} from '@ngrx/store';
import * as ModeloComponenteDigitalActions from '../../../modelos/modelo/store/actions/componentes-digitais.actions';
import * as ModeloComponenteDigitalBlocoActions
    from '../../modelo-bloco/modelo/store/actions/componentes-digitais.actions';
import * as AcervoComponenteDigitalActions
    from '../../../modelos/componentes-digitais/store/actions/componentes-digitais.actions';
import * as AcervoComponenteDigitalBlocoActions
    from '../../modelo-bloco/componentes-digitais/store/actions/componentes-digitais.actions';
import * as AtividadeComponenteDigitalActions
    from '../../tarefa-detail/atividades/atividade-create/store/actions/componentes-digitais.actions';

export const CREATE_COMPONENTE_DIGITAL = '[TAREFAS] CREATE COMPONENTE DIGITAL';
export const CREATE_COMPONENTE_DIGITAL_SUCCESS = '[TAREFAS] CREATE COMPONENTE DIGITAL SUCCESS';

export const SAVE_COMPONENTE_DIGITAL = '[TAREFAS] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[TAREFAS] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[TAREFAS] SAVE COMPONENTE DIGITAL FAILED';

export const MODELO_SAVE_COMPONENTE_DIGITAL = ModeloComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL;
export const MODELO_SAVE_COMPONENTE_DIGITAL_SUCCESS = ModeloComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS;
export const MODELO_SAVE_COMPONENTE_DIGITAL_FAILED = ModeloComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_FAILED;

export const MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL = ModeloComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL;
export const MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL_SUCCESS = ModeloComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL_SUCCESS;
export const MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL_FAILED = ModeloComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL_FAILED;

export const ACERVO_SAVE_COMPONENTE_DIGITAL = AcervoComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL;
export const ACERVO_SAVE_COMPONENTE_DIGITAL_SUCCESS = AcervoComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS;
export const ACERVO_SAVE_COMPONENTE_DIGITAL_FAILED = AcervoComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_FAILED;

export const ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL = AcervoComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL;
export const ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL_SUCCESS = AcervoComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL_SUCCESS;
export const ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL_FAILED = AcervoComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL_FAILED;

export const ATIVIDADE_SAVE_COMPONENTE_DIGITAL = AtividadeComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL;
export const ATIVIDADE_SAVE_COMPONENTE_DIGITAL_SUCCESS = AtividadeComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS;
export const ATIVIDADE_SAVE_COMPONENTE_DIGITAL_FAILED = AtividadeComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_FAILED;

export const SAVE_DOCUMENTO_AVULSO_BLOCO = '[DOCUMENTO AVULSO CREATE BLOCO] SAVE DOCUMENTO AVULSO';
export const SAVE_DOCUMENTO_AVULSO_BLOCO_SUCCESS = '[DOCUMENTO AVULSO CREATE BLOCO] SAVE DOCUMENTO AVULSO SUCCESS';
export const SAVE_DOCUMENTO_AVULSO_BLOCO_FAILED = '[DOCUMENTO AVULSO CREATE BLOCO] SAVE DOCUMENTO AVULSO FAILED';

export const SAVE_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO] SAVE DOCUMENTO AVULSO';
export const SAVE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO] SAVE DOCUMENTO AVULSO SUCCESS';
export const SAVE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO] SAVE DOCUMENTO AVULSO FAILED';

export const DOWNLOAD_COMPONENTE_DIGITAL = '[TAREFAS] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[TAREFAS] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[TAREFAS] DOWNLOAD COMPONENTE DIGITAL FAILED';

export const GET_DOCUMENTO = '[TAREFAS] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[TAREFAS] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[TAREFAS] GET DOCUMENTO FAILED';

export const VISUALIZAR_MODELO = '[TAREFAS] VISUALIZAR MODELO';
export const VISUALIZAR_MODELO_FAILED = '[TAREFAS] VISUALIZAR MODELO FAILED';

export const APROVAR_DOCUMENTO = '[TAREFAS] APROVAR DOCUMENTO';
export const APROVAR_DOCUMENTO_SUCCESS = '[TAREFAS] APROVAR DOCUMENTO SUCCESS';
export const APROVAR_DOCUMENTO_FAILED = '[TAREFAS] APROVAR DOCUMENTO FAILED';

/**
 * Save Componente Digital
 */
export class SaveComponenteDigital implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Success
 */
export class SaveComponenteDigitalSuccess implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Failed
 */
export class SaveComponenteDigitalFailed implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Modelo
 */
export class ModeloSaveComponenteDigital implements Action
{
    readonly type = MODELO_SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Success Modelo
 */
export class ModeloSaveComponenteDigitalSuccess implements Action
{
    readonly type = MODELO_SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Failed Modelo
 */
export class ModeloSaveComponenteDigitalFailed implements Action
{
    readonly type = MODELO_SAVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Modelo Bloco
 */
export class ModeloBlocoSaveComponenteDigital implements Action
{
    readonly type = MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Success Modelo Bloco
 */
export class ModeloBlocoSaveComponenteDigitalSuccess implements Action
{
    readonly type = MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Failed Modelo Bloco
 */
export class ModeloBlocoSaveComponenteDigitalFailed implements Action
{
    readonly type = MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Acervo
 */
export class AcervoSaveComponenteDigital implements Action
{
    readonly type = ACERVO_SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Success Acervo
 */
export class AcervoSaveComponenteDigitalSuccess implements Action
{
    readonly type = ACERVO_SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Failed Acervo
 */
export class AcervoSaveComponenteDigitalFailed implements Action
{
    readonly type = ACERVO_SAVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Acervo Bloco
 */
export class AcervoBlocoSaveComponenteDigital implements Action
{
    readonly type = ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Success Acervo Bloco
 */
export class AcervoBlocoSaveComponenteDigitalSuccess implements Action
{
    readonly type = ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Failed Acervo Bloco
 */
export class AcervoBlocoSaveComponenteDigitalFailed implements Action
{
    readonly type = ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Atividade
 */
export class AtividadeSaveComponenteDigital implements Action
{
    readonly type = ATIVIDADE_SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Success Atividade
 */
export class AtividadeSaveComponenteDigitalSuccess implements Action
{
    readonly type = ATIVIDADE_SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Failed Atividade
 */
export class AtividadeSaveComponenteDigitalFailed implements Action
{
    readonly type = ATIVIDADE_SAVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Componente Digital
 */
export class CreateComponenteDigital implements Action
{
    readonly type = CREATE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Componente Digital Success
 */
export class CreateComponenteDigitalSuccess implements Action
{
    readonly type = CREATE_COMPONENTE_DIGITAL_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save DocumentoAvulso
 */
export class SaveDocumentoAvulso implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoAvulso Success
 */
export class SaveDocumentoAvulsoSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoAvulso Failed
 */
export class SaveDocumentoAvulsoFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoAvulsoBloco
 */
export class SaveDocumentoAvulsoBloco implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoAvulsoBloco Success
 */
export class SaveDocumentoAvulsoBlocoSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoAvulsoBloco Failed
 */
export class SaveDocumentoAvulsoBlocoFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_BLOCO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento
 */
export class GetDocumento implements Action
{
    readonly type = GET_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento Success
 */
export class GetDocumentoSuccess implements Action
{
    readonly type = GET_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento Failed
 */
export class GetDocumentoFailed implements Action
{
    readonly type = GET_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Visualizar Modelo
 */
export class VisualizarModelo implements Action
{
    readonly type = VISUALIZAR_MODELO;

    constructor(public payload: string)
    {
    }
}

/**
 * Visualizar Modelo Failed
 */
export class VisualizarModeloFailed implements Action
{
    readonly type = VISUALIZAR_MODELO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Download ComponenteDigital
 */
export class DownloadComponenteDigital implements Action {
    readonly type = DOWNLOAD_COMPONENTE_DIGITAL;

    constructor(public payload: any) {
    }
}

/**
 * Download ComponenteDigital Success
 */
export class DownloadComponenteDigitalSuccess implements Action {
    readonly type = DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Download ComponenteDigital Failed
 */
export class DownloadComponenteDigitalFailed implements Action {
    readonly type = DOWNLOAD_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Aprovar Documento
 */

export class AprovarDocumento implements Action
{
    readonly type = APROVAR_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

export class AprovarDocumentoSuccess implements Action
{
    readonly type = APROVAR_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class AprovarDocumentoFailed implements Action
{
    readonly type = APROVAR_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ComponenteDigitalActionsAll
    = CreateComponenteDigital
    | CreateComponenteDigitalSuccess
    | SaveComponenteDigital
    | SaveComponenteDigitalSuccess
    | SaveComponenteDigitalFailed
    | ModeloSaveComponenteDigital
    | ModeloSaveComponenteDigitalSuccess
    | ModeloSaveComponenteDigitalFailed
    | ModeloBlocoSaveComponenteDigital
    | ModeloBlocoSaveComponenteDigitalSuccess
    | ModeloBlocoSaveComponenteDigitalFailed
    | AcervoSaveComponenteDigital
    | AcervoSaveComponenteDigitalSuccess
    | AcervoSaveComponenteDigitalFailed
    | AcervoBlocoSaveComponenteDigital
    | AcervoBlocoSaveComponenteDigitalSuccess
    | AcervoBlocoSaveComponenteDigitalFailed
    | AtividadeSaveComponenteDigital
    | AtividadeSaveComponenteDigitalSuccess
    | AtividadeSaveComponenteDigitalFailed
    | GetDocumento
    | GetDocumentoSuccess
    | GetDocumentoFailed
    | VisualizarModelo
    | VisualizarModeloFailed
    | DownloadComponenteDigital
    | DownloadComponenteDigitalSuccess
    | DownloadComponenteDigitalFailed
    | AprovarDocumento
    | AprovarDocumentoSuccess
    | AprovarDocumentoFailed
    | SaveDocumentoAvulso
    | SaveDocumentoAvulsoSuccess
    | SaveDocumentoAvulsoFailed
    | SaveDocumentoAvulsoBloco
    | SaveDocumentoAvulsoBlocoSuccess
    | SaveDocumentoAvulsoBlocoFailed;
