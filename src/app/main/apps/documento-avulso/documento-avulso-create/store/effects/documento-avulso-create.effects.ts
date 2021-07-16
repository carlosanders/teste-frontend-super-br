import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentoAvulsoCreateActions from '../actions/documento-avulso-create.actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {GetDocumentos} from '../../../../tarefas/tarefa-detail/atividades/atividade-create/store/actions';

@Injectable()
export class DocumentoAvulsoCreateEffect {
    routerState: any;
    componenteDigitalId: number;
    routeOficio: string;

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _documentoService: DocumentoService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoCreateActions.SaveDocumentoAvulso>(DocumentoAvulsoCreateActions.SAVE_DOCUMENTO_AVULSO),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento avulso',
                    content: 'Salvando o documento avulso ...',
                    status: 0, // carregando
                }))),
                mergeMap(action => this._documentoAvulsoService.save(action.payload.documentoAvulso).pipe(
                        tap((response) => {
                            this.routeOficio = action.payload.routeOficio;
                            this._store.dispatch(new GetDocumentos());
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documento avulso',
                                content: 'Documento avulso id ' + response.id + ' salvo com sucesso.',
                                status: 1, // carregando
                            }));
                            if (action.payload.documentoAvulso.blocoProcessos || action.payload.documentoAvulso.blocoDestinatarios)
                            {
                                this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
                                + this.routerState.params.typeHandle + '/' +
                                this.routerState.params.targetHandle + '/tarefa/' + this.routerState.params.tarefaHandle +
                                '/oficios']).then();
                            }
                            else {
                                this._store.dispatch(new DocumentoAvulsoCreateActions.GetDocumento(response.id));
                            }
                        }),
                        mergeMap((response: DocumentoAvulso) => [
                            new DocumentoAvulsoCreateActions.SaveDocumentoAvulsoSuccess(),
                            new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documento avulso',
                                content: `Documento id ${response.id} criado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documento avulso',
                                content: 'Erro ao salvar o documento!',
                                status: 2, // erro
                            }));
                            return of(new DocumentoAvulsoCreateActions.SaveDocumentoAvulsoFailed(err));
                        })
                    ))
            );

    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoCreateActions.GetDocumento>(DocumentoAvulsoCreateActions.GET_DOCUMENTO),
                switchMap(action => this._documentoService.query(
                        `{"documentoAvulsoRemessa.id": "eq:${action.payload}"}`,
                        1,
                        0,
                        '{}',
                        JSON.stringify(['componentesDigitais']))),
                switchMap(response => [
                    // new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentoAvulsoCreateActions.GetDocumentoSuccess({
                        documentoId: response['entities'][0].id,
                        componenteDigitalId: response['entities'][0].componentesDigitais[0].id,
                        routeOficio: this.routeOficio
                    }),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoCreateActions.GetDocumentoFailed(err));
                    return caught;
                })
            );

    @Effect({ dispatch: false })
    getDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoCreateActions.GetDocumentoSuccess>(DocumentoAvulsoCreateActions.GET_DOCUMENTO_SUCCESS),
                tap((action) => {
                    const primary = 'componente-digital/' + action.payload.componenteDigitalId;
                    const sidebar = action.payload.routeOficio + '/dados-basicos';
                    const componente = this.routerState.url.indexOf('processo') !== -1 ? 'documento' : 'oficios/documento';
                    this._router.navigate([
                            this.routerState.url.replace('oficio', componente) + '/' + action.payload.documentoId,
                            {
                                outlets: {
                                    primary: primary,
                                    sidebar: sidebar
                                }
                            }
                        ],
                        {
                            relativeTo: this._activatedRoute.parent
                        }).then();
                })
            );
}
