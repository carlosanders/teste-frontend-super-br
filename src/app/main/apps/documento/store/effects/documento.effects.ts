import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoActions from '../actions/documento.actions';
import * as DocumentoSelectors from '../selectors/documento.selectors';

import {DocumentoService} from '@cdk/services/documento.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {modelo as modeloSchema} from '@cdk/normalizr/modelo.schema';
import {repositorio as repositorioSchema} from '@cdk/normalizr/repositorio.schema';
import {Documento} from '@cdk/models';
import {Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {Modelo} from '@cdk/models';
import {ModeloService} from '@cdk/services/modelo.service';
import {Repositorio} from '@cdk/models';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {environment} from 'environments/environment';
import {UnloadDocumento} from '../actions';
import * as AssinaturaActions from '../actions/assinaturas.actions';

@Injectable()
export class DocumentoEffect {
    routerState: any;
    private _profile: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _modeloService: ModeloService,
        private _repositorioService: RepositorioService,
        public _loginService: LoginService,
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

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Get Documento with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.GetDocumento>(DocumentoActions.GET_DOCUMENTO),
                switchMap(() => {
                    let handle = {
                        id: '',
                        value: ''
                    };
                    const routeParams = of('documentoHandle');
                    routeParams.subscribe(param => {
                        if (this.routerState.params[param]) {
                            handle = {
                                id: param,
                                value: this.routerState.params[param]
                            };
                        }
                    });
                    return this._documentoService.query(
                        `{"id": "eq:${handle.value}"}`,
                        1,
                        0,
                        '{"componentesDigitais.numeracaoSequencial": "ASC"}',
                        JSON.stringify([
                            'procedencia',
                            'setorOrigem',
                            'tipoDocumento',
                            'componentesDigitais',
                            'componentesDigitais.assinaturas',
                            'modelo',
                            'modelo.template',
                            'processoOrigem',
                            'tarefaOrigem',
                            'tarefaOrigem.processo',
                            'tarefaOrigem.processo.especieProcesso',
                            'tarefaOrigem.processo.modalidadeMeio',
                            'tarefaOrigem.especieTarefa',
                            'tarefaOrigem.especieTarefa.generoTarefa',                            
                            'tarefaOrigem.setorOrigem',
                            'tarefaOrigem.setorOrigem.unidade',
                            'tarefaOrigem.setorResponsavel',
                            'tarefaOrigem.setorResponsavel.unidade',
                            'tarefaOrigem.usuarioResponsavel',
                            'tarefaOrigem.vinculacoesEtiquetas',
                            'tarefaOrigem.vinculacoesEtiquetas.etiqueta',                            
                            'repositorio',
                            'juntadaAtual',
                            'repositorio.modalidadeRepositorio',
                            'documentoAvulsoRemessa',
                            'documentoAvulsoRemessa.processo',
                            'documentoAvulsoRemessa.especieDocumentoAvulso',
                            'documentoAvulsoRemessa.modelo',
                            'documentoAvulsoRemessa.setorDestino',
                            'documentoAvulsoRemessa.pessoaDestino',
                            'documentoAvulsoRemessa.usuarioRemessa',
                            'vinculacaoDocumentoPrincipal',
                            'vinculacaoDocumentoPrincipal.documento',
                            'vinculacaoDocumentoPrincipal.documento.documentoAvulsoRemessa',
                            'vinculacoesDocumentos',
                            'vinculacoesDocumentos.documentoVinculado',
                            'vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                            'sigilos',
                            'sigilos.tipoSigilo'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentoActions.GetDocumentoSuccess({
                        loaded: {
                            id: 'documentoHandle',
                            value: this.routerState.params.documentoHandle
                        },
                        documentoId: response['entities'][0].id,
                        // tslint:disable-next-line:max-line-length
                        editavel: (response['entities'][0].documentoAvulsoRemessa && !response['entities'][0].documentoAvulsoRemessa.dataHoraRemessa) || response['entities'][0].minuta,
                        currentComponenteDigitalId: response['entities'][0].componentesDigitais[0] ? response['entities'][0].componentesDigitais[0].id : null
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoActions.GetDocumentoFailed(err));
                    return caught;
                })
            );

    /**
     * Get Documento with router parameters
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    getDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.GetDocumentoSuccess>(DocumentoActions.GET_DOCUMENTO_SUCCESS),
                tap((action) => {
                    if (this.routerState.url.indexOf('anexar-copia') === -1) {
                        if (action.payload.currentComponenteDigitalId) {
                            this._store.dispatch(new DocumentoActions.SetCurrentStep({id: action.payload.currentComponenteDigitalId, editavel: action.payload.editavel}));
                            this._store.dispatch(new AssinaturaActions.GetAssinaturas({
                                filter: {
                                    'componenteDigital.id': 'eq:' + action.payload.currentComponenteDigitalId
                                },
                                limit: 5,
                                offset: 0,
                                sort: {criadoEm: 'DESC'}
                            }));
                        } else {
                            this._router.navigate([
                                    this.routerState.url.split('/componente-digital/')[0] + '/componente-digital/0/empty'
                                ]
                            ).then();
                        }
                    }
                })
            );

    /**
     * Save Documento
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.SaveDocumento>(DocumentoActions.SAVE_DOCUMENTO),
                switchMap((action) => {
                    return this._documentoService.save(action.payload).pipe(
                        mergeMap((response: Documento) => [
                            new DocumentoActions.SaveDocumentoSuccess(),
                            new AddData<Documento>({data: [response], schema: documentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documento',
                                content: `Documento id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoActions.SaveDocumentoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Documento
     * @type {Observable<any>}
     */
    @Effect()
    saveModelo: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.SaveModelo>(DocumentoActions.SAVE_MODELO),
                switchMap((action) => {
                    return this._modeloService.save(action.payload).pipe(
                        mergeMap((response: Modelo) => [
                            new DocumentoActions.SaveModeloSuccess(),
                            new AddData<Modelo>({data: [response], schema: modeloSchema}),
                            new OperacoesActions.Resultado({
                                type: 'modelo',
                                content: `Modelo id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoActions.SaveModeloFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Documento
     * @type {Observable<any>}
     */
    @Effect()
    saveRepositorio: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.SaveRepositorio>(DocumentoActions.SAVE_REPOSITORIO),
                switchMap((action) => {
                    return this._repositorioService.save(action.payload).pipe(
                        mergeMap((response: Repositorio) => [
                            new DocumentoActions.SaveRepositorioSuccess(),
                            new AddData<Repositorio>({data: [response], schema: repositorioSchema}),
                            new OperacoesActions.Resultado({
                                type: 'modelo',
                                content: `Repositório id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoActions.SaveRepositorioFailed(err));
                        })
                    );
                })
            );

    /**
     * Get Documento with router parameters
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    setCurrentStep: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.SetCurrentStep>(DocumentoActions.SET_CURRENT_STEP),
                withLatestFrom(this._store.pipe(select(DocumentoSelectors.getCurrentComponenteDigital))),
                tap(([action, componenteDigital]) => {
                    let type = '/visualizar';
                    if (action.payload.editavel && componenteDigital.editavel && !componenteDigital.assinado) {
                        type = '/editor/ckeditor';
                    }
                    if (this.routerState.url.indexOf('/assinaturas') > -1) {
                        type = '/assinaturas';
                    }
                    this._router.navigate([
                            this.routerState.url.split('/componente-digital/')[0] + '/componente-digital/' + action.payload.id + type
                        ]
                    ).then();
                })
            );

    /**
     * Assina Documento
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.AssinaDocumento>(DocumentoActions.ASSINA_DOCUMENTO),
                withLatestFrom(this._store.pipe(select(DocumentoSelectors.getDocumentoId))),
                mergeMap(([action, documentoId]) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([parseInt(documentoId, 0)]))
                            .pipe(
                                tap((response: any) => {
                                    const url = environment.jnlp + 'v1/assinatura/' + response.jwt + '/get_jnlp';
                                    const ifrm = document.createElement('iframe');
                                    ifrm.setAttribute('src', url);
                                    ifrm.style.width = '0';
                                    ifrm.style.height = '0';
                                    ifrm.style.border = '0';
                                    document.body.appendChild(ifrm);
                                    setTimeout(() => document.body.removeChild(ifrm), 20000);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new DocumentoActions.AssinaDocumentoFailed(err));
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
                ofType<DocumentoActions.AssinaDocumentoSuccess>(DocumentoActions.ASSINA_DOCUMENTO_SUCCESS),
                tap((action) => {
                    this._store.dispatch(new UnloadDocumento());
                    this._router.navigate([
                            this.routerState.url.split('/documento/')[0]
                        ]
                    ).then();
                }));
}
