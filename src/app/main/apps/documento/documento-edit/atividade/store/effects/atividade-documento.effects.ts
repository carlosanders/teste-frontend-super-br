import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';
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
import {GetJuntadas, UnloadJuntadas} from '../../../../../processo/processo-view/store';
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
                switchMap(action => this._atividadeService.save(action.payload).pipe(
                        mergeMap((response: Atividade) => [
                            new AtividadeDocumentoActions.SaveAtividadeSuccess(action.payload),
                            new AddData<Atividade>({data: [response], schema: atividadeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'atividade',
                                content: `Atividade id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new AtividadeDocumentoActions.SaveAtividadeFailed(err));
                        })
                    ))
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
                    if (this.routerState.url.indexOf('/processo') !== -1) {
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
                    const split = this.routerState.url.indexOf('/atividades/criar') !== -1 ? '/atividades/criar' : '/processo';
                    this._router.navigate([this.routerState.url.split(split)[0] + '/encaminhamento']).then();
                })
            );

}
