import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoActions from '../actions/documento.actions';
import * as DocumentoSelectors from '../selectors/documento.selectors';

import {DocumentoService} from '@cdk/services/documento.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {modelo as modeloSchema} from '@cdk/normalizr/modelo.schema';
import {repositorio as repositorioSchema} from '@cdk/normalizr/repositorio.schema';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr/documento-avulso.schema';
import {Documento} from '@cdk/models/documento.model';
import {Router} from '@angular/router';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {Modelo} from '@cdk/models/modelo.model';
import {ModeloService} from '@cdk/services/modelo.service';
import {Repositorio} from '@cdk/models/repositorio.model';
import {RepositorioService} from '@cdk/services/repositorio.service';

@Injectable()
export class DocumentoEffect {
    routerState: any;
    private _profile: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _modeloService: ModeloService,
        private _repositorioService: RepositorioService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _loginService: LoginService,
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
                            'tipoDocumento',
                            'componentesDigitais',
                            'modelo',
                            'modelo.template',
                            'processoOrigem',
                            'repositorio',
                            'repositorio.modalidadeRepositorio',
                            'documentoAvulsoRemessa',
                            'documentoAvulsoRemessa.processo',
                            'documentoAvulsoRemessa.especieDocumentoAvulso',
                            'documentoAvulsoRemessa.modelo',
                            'documentoAvulsoRemessa.setorDestino',
                            'documentoAvulsoRemessa.pessoaDestino',
                            'vinculacaoDocumentoPrincipal',
                            'vinculacaoDocumentoPrincipal.documento',
                            'vinculacoesDocumentos',
                            'vinculacoesDocumentos.documentoVinculado',
                            'vinculacoesDocumentos.documentoVinculado.tipoDocumento']));
                }),
                switchMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentoActions.GetDocumentoSuccess({
                        loaded: {
                            id: 'documentoHandle',
                            value: this.routerState.params.documentoHandle
                        },
                        documentoId: response['entities'][0].id,
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
                            this._store.dispatch(new DocumentoActions.SetCurrentStep(action.payload.currentComponenteDigitalId));
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
                            console.log (err);
                            return of(new DocumentoActions.SaveDocumentoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Documento Avulso
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.SaveDocumentoAvulso>(DocumentoActions.SAVE_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.save(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new DocumentoActions.SaveDocumentoAvulsoSuccess(),
                            new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documento',
                                content: `Documento id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
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
                            console.log (err);
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
                            console.log (err);
                            return of(new DocumentoActions.SaveRepositorioFailed(err));
                        })
                    );
                })
            );

    /**
     * Remeter Documento Avulso
     * @type {Observable<any>}
     */
    @Effect()
    remeterDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.RemeterDocumentoAvulso>(DocumentoActions.REMETER_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.remeter(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new DocumentoActions.RemeterDocumentoAvulsoSuccess(),
                            new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoActions.RemeterDocumentoAvulsoFailed(err));
                    return caught;
                })
            );

    /**
     * Remeter Documento Avulso Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    remeterDocumentoAvulsoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.RemeterDocumentoAvulsoSuccess>(DocumentoActions.REMETER_DOCUMENTO_AVULSO_SUCCESS),
                tap(() => {
                    this._router.navigate([
                            this.routerState.url.split('/documento/')[0]
                        ]
                    ).then();
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
                    if (componenteDigital.editavel) {
                        type = '/editor/ckeditor';
                    }
                    this._router.navigate([
                            this.routerState.url.split('/componente-digital/')[0] + '/componente-digital/' + action.payload + type
                        ]
                    ).then();
                })
            );
}
