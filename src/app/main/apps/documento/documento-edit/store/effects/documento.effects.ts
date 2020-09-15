import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoActions from '../actions/documento.actions';
import * as DocumentoSelectors from '../selectors/documento.selectors';

import {DocumentoService} from '@cdk/services/documento.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Documento} from '@cdk/models';
import {Router} from '@angular/router';
import {ModeloService} from '@cdk/services/modelo.service';
import {RepositorioService} from '@cdk/services/repositorio.service';
import * as AssinaturaActions from '../../../store/actions/assinaturas.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';

@Injectable()
export class DocumentoEffects {
    routerState: any;
    private _profile: any;

    /**
     * @param _actions
     * @param _documentoService
     * @param _modeloService
     * @param _repositorioService
     * @param _assinaturaService
     * @param _loginService
     * @param _vinculacaoEtiquetaService
     * @param _router
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _modeloService: ModeloService,
        private _repositorioService: RepositorioService,
        private _assinaturaService: AssinaturaService,
        public _loginService: LoginService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
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
                            'modelo.modalidadeModelo',
                            'processoOrigem',
                            'tarefaOrigem',
                            'tarefaOrigem.processo',
                            'tarefaOrigem.processo.especieProcesso',
                            'tarefaOrigem.processo.especieProcesso.generoProcesso',
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
                            'documentoAvulsoRemessa.processo.especieProcesso',
                            'documentoAvulsoRemessa.processo.especieProcesso.generoProcesso',
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
                            'sigilos.tipoSigilo',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta'
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
                            this.routerState.url.split('/componente-digital/')[0] + '/componente-digital/'
                            + action.payload.id + type
                        ]
                    ).then();
                })
            );
}
