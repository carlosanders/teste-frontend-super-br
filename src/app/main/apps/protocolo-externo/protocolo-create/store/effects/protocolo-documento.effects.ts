import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';


import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {documento as documentoSchema, componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import * as ProtocoloDocumentoActions from '../actions';
import {Router} from '@angular/router';
import {getDocumentos} from '../selectors';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {environment} from '../../../../../../../environments/environment';
import {assinatura as assinaturaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../store/actions/operacoes.actions';
import * as AtividadeCreateDocumentosActions
    from '../../../../tarefas/tarefa-detail/atividades/atividade-create/store/actions/documentos.actions';
import {ComponenteDigitalService} from "@cdk/services/componente-digital.service";

@Injectable()
export class ProtocoloDocumentoEffects {
    routerState: any;
    documentos: Documento[];

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _assinaturaService: AssinaturaService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _router: Router,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._store
            .pipe(select(getDocumentos))
            .subscribe(documentos => {
                this.documentos = documentos;
            });
    }

    /**
     * Get Documentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.GetDocumentos>(ProtocoloDocumentoActions.GET_DOCUMENTOS),
                switchMap((action) => {
                    return this._documentoService.query(
                        JSON.stringify(action.payload),
                        100,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new ProtocoloDocumentoActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'documentoAvulsoHandle',
                            value: this.routerState.params.documentoAvulsoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    }),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProtocoloDocumentoActions.GetDocumentosFailed(err));
                    return caught;
                })
            );

    /**
     * Clicked Documento
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    clickedDocumento: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.ClickedDocumento>(ProtocoloDocumentoActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace(`detalhe/${this.routerState.params.documentoAvulsoHandle}/reponder/${this.routerState.params.chaveAcessoHandle}`, 'documento/')
                    + action.payload.componentesDigitais[0].id + '/visualizar/' + this.routerState.params.chaveAcessoHandle]);
                })
            );

    /**
     * Assina Documento
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.AssinaDocumento>(ProtocoloDocumentoActions.ASSINA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new ProtocoloDocumentoActions.AssinaDocumentoSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProtocoloDocumentoActions.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.RemoveAssinaturaDocumento>(ProtocoloDocumentoActions.REMOVE_ASSINATURA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.removeAssinatura(action.payload)
                            .pipe(
                                mergeMap((response) => [
                                    new ProtocoloDocumentoActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                                    new ProtocoloDocumentoActions.GetDocumentos({'processoOrigem.id': `eq:${action.payload.processoId}`}),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProtocoloDocumentoActions.RemoveAssinaturaDocumentoFailed(action.payload));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Assina Documento Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.AssinaDocumentoSuccess>(ProtocoloDocumentoActions.ASSINA_DOCUMENTO_SUCCESS),
                tap((action) => {

                    const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                    const ifrm = document.createElement('iframe');
                    ifrm.setAttribute('src', url);
                    ifrm.style.width = '0';
                    ifrm.style.height = '0';
                    ifrm.style.border = '0';
                    document.body.appendChild(ifrm);
                    setTimeout(() => document.body.removeChild(ifrm), 20000);
                }));

    /**
     * Save Documento Assinatura Eletronica
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoEletronicamente: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.AssinaDocumentoEletronicamente>(ProtocoloDocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap((action) => {
                    return this._assinaturaService.save(action.payload.assinatura, JSON.stringify({plainPassword: action.payload.plainPassword})).pipe(
                        mergeMap((response: Assinatura) => [
                            new ProtocoloDocumentoActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new ProtocoloDocumentoActions.GetDocumentos({'processoOrigem.id': `eq:${action.payload.processoId}`}),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProtocoloDocumentoActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    );
                })
            );

    /**
     * Converte Documento
     * @type {Observable<any>}
     */
    @Effect()
    converteDocumento: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.ConverteToPdf>(ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_ATIVIDADE),
                mergeMap((action) => {
                        return this._componenteDigitalService.preparaConverter(action.payload, {hash: action.payload.hash})
                            .pipe(
                                mergeMap((response) => [
                                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                                    new ProtocoloDocumentoActions.ConverteToPdfSucess(action.payload)
                                ]),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new ProtocoloDocumentoActions.ConverteToPdfFailed(action.payload));
                                })
                            );
                    }
                )
            );

    /**
     * Converte Documento HTML
     * @type {Observable<any>}
     */
    @Effect()
    converteDocumentoHtml: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.ConverteToHtml>(ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML),
                mergeMap((action) => {
                        return this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
                            .pipe(
                                mergeMap((response) => [
                                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                                    new ProtocoloDocumentoActions.ConverteToHtmlSucess(action.payload)
                                ]),
                                catchError((err) => {
                                    return of(new ProtocoloDocumentoActions.ConverteToHtmlFailed(action.payload));
                                })
                            );
                    }
                )
            );

}
