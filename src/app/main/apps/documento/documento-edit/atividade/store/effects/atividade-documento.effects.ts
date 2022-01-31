import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
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
    UnloadDocumentos
} from '../../../../../processo/processo-view/store';
import {GetTarefa} from '../../../../../tarefas/tarefa-detail/store';

@Injectable()
export class AtividadeDocumentoEffects {
    routerState: any;

    /**
     * Save Atividade
     *
     * @type {Observable<any>}
     */
    saveAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeDocumentoActions.SaveAtividade>(AtividadeDocumentoActions.SAVE_ATIVIDADE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'atividade',
            content: 'Salvando a atividade ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._atividadeService.save(action.payload.atividade).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'atividade',
                content: 'Atividade id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Atividade) => [
                new AtividadeDocumentoActions.SaveAtividadeSuccess(action.payload),
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
        ))
    ));

    /**
     * Save Atividade Success
     */
    saveAtividadeSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeDocumentoActions.SaveAtividadeSuccess>(AtividadeDocumentoActions.SAVE_ATIVIDADE_SUCCESS),
        tap((action) => {
            if (action.payload.encerraTarefa) {
                this._store.dispatch(new RemoveTarefa(action.payload.atividade.tarefa.id));
            } else {
                this._store.dispatch(new GetTarefa({id: action.payload.atividade.tarefa.id}));
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
                    }
                });
            }
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _atividadeService: AtividadeService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
