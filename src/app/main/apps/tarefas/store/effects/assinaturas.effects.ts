import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AssinaturaActions from '../actions/assinaturas.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Assinatura, Documento} from '@cdk/models';
import {assinatura as assinaturaSchema, documento as documentoSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {environment} from '../../../../../../environments/environment';
import {getDocumentos} from '../selectors';
import {CdkUtils} from '@cdk/utils';

@Injectable()
export class AssinaturasEffects {
    routerState: any;
    tarefaId: number;
    certificadoDigital: boolean;
    assinatura: any;

    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.GetDocumentos>(AssinaturaActions.GET_DOCUMENTOS),
        tap((action) => {
            this.tarefaId = action.payload.tarefaId;
            this.certificadoDigital = !!action.payload.certificadoDigital;
            this.assinatura = action.payload.assinatura;
        }),
        switchMap((action) => {

            const tarefaId = action.payload.tarefaId;

            const params = {
                filter: {
                    'tarefaOrigem.id': 'eq:' + tarefaId,
                    'juntadaAtual': 'isNull'
                },
                limit: 25,
                offset: 0,
                sort: {
                    criadoEm: 'DESC'
                },
                populate: [
                    'tipoDocumento',
                    'documentoAvulsoRemessa',
                    'documentoAvulsoRemessa.documentoResposta',
                    'componentesDigitais',
                ]
            };

            return this._documentoService.query(
                JSON.stringify({
                    ...params.filter
                }),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate));
        }),
        mergeMap(response => [
            new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
            new AssinaturaActions.GetDocumentosSuccess({
                tarefaId: this.tarefaId,
                entitiesId: response['entities'].map(documento => documento.id),
                certificadoDigital: this.certificadoDigital,
                assinatura: this.assinatura
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new AssinaturaActions.GetDocumentosFailed(err));
        })
    ));
    /**
     * Undelete Tarefa Success
     */
    getDocumentosSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.GetDocumentosSuccess>(AssinaturaActions.GET_DOCUMENTOS_SUCCESS),
        withLatestFrom(this._store.pipe(select(getDocumentos))),
        tap(([action, documentos]) => {
            if (action.payload.certificadoDigital) {
                // Assinatura por certificado digital
                this._store.dispatch(new AssinaturaActions.AssinaDocumento({
                    documentosIds: action.payload.entitiesId,
                    tarefaId: action.payload.tarefaId
                }));
            } else {
                // Assinatura por plain password
                const loteId = CdkUtils.makeId();
                documentos.forEach((documento) => {
                    documento.componentesDigitais.forEach((componenteDigital) => {
                        const assinatura = new Assinatura();
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = action.payload.assinatura.plainPassword;

                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaActions.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: documento,
                            tarefaId: this.tarefaId,
                            operacaoId: operacaoId,
                            loteId: loteId
                        }));
                    });
                });
            }
        })
    ), {dispatch: false});
    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    assinaDocumento: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumento>(AssinaturaActions.ASSINA_DOCUMENTO),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify(action.payload.documentosIds))
            .pipe(
                map(response => new AssinaturaActions.PreparaAssinaturaSuccess(response)),
                catchError((err) => {
                    const payload = {
                        ids: action.payload,
                        error: err
                    };
                    console.log(err);
                    return of(new AssinaturaActions.PreparaAssinaturaFailed(payload));
                })
            )
        )
    ));
    /**
     * Prepara Assinatura Success
     *
     * @type {Observable<any>}
     */
    preparaAssinaturaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.PreparaAssinaturaSuccess>(AssinaturaActions.PREPARA_ASSINATURA_SUCCESS),
        tap((action) => {
            if (action.payload.secret) {
                const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                const ifrm = document.createElement('iframe');
                ifrm.setAttribute('src', url);
                ifrm.style.width = '0';
                ifrm.style.height = '0';
                ifrm.style.border = '0';
                document.body.appendChild(ifrm);
                setTimeout(() => document.body.removeChild(ifrm), 20000);
            }
        })
    ), {dispatch: false});
    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    assinaDocumentoEletronicamente: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoEletronicamente>(AssinaturaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Assinando documento id ' + action.payload.documento.id + ' ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Assinatura id ' + response.id + ' criada com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Assinatura) => [
                new AssinaturaActions.AssinaDocumentoEletronicamenteSuccess({
                    documentoId: action.payload.documento.id,
                    tarefaId: action.payload.tarefaId
                }),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                new UpdateData<Documento>({
                    id: action.payload.documento.id,
                    schema: documentoSchema,
                    changes: {assinado: true}
                })
            ]),
            catchError((err) => {
                const payload = {
                    documentoId: action.payload.documento.id,
                    tarefaId: action.payload.tarefaId,
                    error: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Ocorreu um erro na assinatura do documento id ' + action.payload.documento.id + '.',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new AssinaturaActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
