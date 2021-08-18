import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as AtividadeDocumentoActions from '../actions/atividade-documento.actions';
import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {atividade as atividadeSchema} from '@cdk/normalizr';
import {Atividade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {UnloadDocumento} from '../../../../store';
import {RemoveTarefa} from '../../../../../tarefas/store';
import {
    GetDocumentos as GetDocumentosProcesso,
    GetJuntadas,
    UnloadDocumentos,
    UnloadJuntadas
} from '../../../../../processo/processo-view/store';
import {GetTarefa} from '../../../../../tarefas/tarefa-detail/store';

@Injectable()
export class AtividadeDocumentoEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _atividadeService: AtividadeService,
        private _store: Store<State>,
        private _router: Router
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
     * Save Atividade
     *
     * @type {Observable<any>}
     */
    @Effect()
        saveAtividade: any =
        this._actions
            .pipe(
                ofType<AtividadeDocumentoActions.SaveAtividade>(AtividadeDocumentoActions.SAVE_ATIVIDADE),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'atividade',
                    content: 'Salvando a atividade ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._atividadeService.save(action.payload.atividade).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'atividade',
                                content: 'Atividade id ' + response.id + ' salva com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Atividade) => [
                            new AtividadeDocumentoActions.SaveAtividadeSuccess(response),
                            new AddData<Atividade>({data: [response], schema: atividadeSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'atividade',
                                content: 'Erro ao salvar a atividade!',
                                status: 2, // erro
                            }));
                            return of(new AtividadeDocumentoActions.SaveAtividadeFailed(err));
                        })
                    )
                })
            );

    /**
     * Save Atividade Success
     */
    @Effect({ dispatch: false })
    saveAtividadeSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeDocumentoActions.SaveAtividadeSuccess>(AtividadeDocumentoActions.SAVE_ATIVIDADE_SUCCESS),
                tap((action) => {
                    if (action.payload.encerraTarefa) {
                        this._store.dispatch(new RemoveTarefa(action.payload.tarefa.id));
                    } else {
                        this._store.dispatch(new GetTarefa({id: action.payload.tarefa.id}));
                    }
                    this._store.dispatch(new UnloadDocumento());
                    const url = this.routerState.url;
                    if (action.payload.encerraTarefa) {
                        const split = url.indexOf('/atividades/criar') !== -1 ? '/atividades/criar' : '/processo';
                        this._router.navigate([url.split(split)[0] + '/encaminhamento']).then();
                    } else {
                        this._router.navigate([url.split('/documento')[0]]).then(() => {
                            if (url.indexOf('/processo') !== -1) {
                                this._store.dispatch(new UnloadDocumentos());
                                this._store.dispatch(new GetDocumentosProcesso());
                                this._store.dispatch(new UnloadJuntadas({reset: false}));
                                let processoFilter = null;

                                const routeParams = of('processoHandle');
                                routeParams.subscribe((param) => {
                                    processoFilter = `eq:${this.routerState.params[param]}`;
                                });

                                const params = {
                                    filter: {
                                        'volume.processo.id': processoFilter,
                                        'vinculada': 'eq:0'
                                    },
                                    listFilter: {},
                                    limit: 10,
                                    offset: 0,
                                    sort: {'volume.numeracaoSequencial': 'DESC', 'numeracaoSequencial': 'DESC'},
                                    populate: [
                                        'volume',
                                        'documento',
                                        'documento.origemDados',
                                        'documento.tipoDocumento',
                                        'documento.componentesDigitais',
                                        'documento.vinculacoesDocumentos',
                                        'documento.vinculacoesDocumentos.documentoVinculado',
                                        'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                                        'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais',
                                        'documento.vinculacoesEtiquetas',
                                        'documento.vinculacoesEtiquetas.etiqueta'
                                    ]
                                };

                                this._store.dispatch(new GetJuntadas(params));
                            }
                        });
                    }
                })
            );

}
