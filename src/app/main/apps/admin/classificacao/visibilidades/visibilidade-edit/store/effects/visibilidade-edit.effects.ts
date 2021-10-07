import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AddData} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import {Visibilidade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../index';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import * as VisibilidadeListActions from '../../../visibilidade-list/store/actions/visibilidade-list.actions';

@Injectable()
export class VisibilidadeEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _classificacaoService: ClassificacaoService,
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

    /**
     * Save Visibilidade
     *
     * @type {Observable<any>}
     */
    saveVisibilidade: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveVisibilidade>(fromStore.SAVE_VISIBILIDADE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'classificacao visibilidade',
            content: 'Criando visibilidade ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._classificacaoService.createVisibilidade(action.payload.classificacaoId, action.payload.visibilidade).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'classificacao visibilidade',
                content: `Visibilidade id ${response.id} criada com sucesso.`,
                status: 1, // sucesso
            }))),
            mergeMap((response: Visibilidade) => [
                new fromStore.SaveVisibilidadeSuccess(),
                new VisibilidadeListActions.ReloadVisibilidades(),
                new AddData<Visibilidade>({data: [response], schema: visibilidadeSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'classificacao visibilidade',
                    content: 'Ocorreu um erro na criação da visibilidade.',
                    status: 2, // sucesso
                }));
                return of(new fromStore.SaveVisibilidadeFailed(err));
            })
        ))
    ));

    /**
     * Save Visibilidade Success
     */
    saveVisibilidadeSuccess: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveVisibilidadeSuccess>(fromStore.SAVE_VISIBILIDADE_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params['visibilidadeHandle']), 'listar')]).then();
        })
    ), {dispatch: false});

}
