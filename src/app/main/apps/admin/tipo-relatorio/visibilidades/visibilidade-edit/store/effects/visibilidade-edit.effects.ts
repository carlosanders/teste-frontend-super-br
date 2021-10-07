import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as VisibilidadeEditActions from '../actions/visibilidade-edit.actions';
import * as VisibilidadeListActions from '../../../visibilidade-list/store/actions/visibilidade-list.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import {Visibilidade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';

@Injectable()
export class VisibilidadeEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoRelatorioService: TipoRelatorioService,
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
        ofType<VisibilidadeEditActions.SaveVisibilidade>(VisibilidadeEditActions.SAVE_VISIBILIDADE_TIPO_RELATORIO),
        switchMap(action => this._tipoRelatorioService.createVisibilidade(action.payload.tipoRelatorioId, action.payload.visibilidade).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'visibilidade',
                content: 'Visibilidade criada com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Visibilidade) => [
                new VisibilidadeEditActions.SaveVisibilidadeSuccess(),
                new VisibilidadeListActions.ReloadVisibilidades()
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'visibilidade',
                    content: 'Ocorreu um erro na criação da visibilidade.',
                    status: 2, // sucesso
                }));
                return of(new VisibilidadeEditActions.SaveVisibilidadeFailed(err));
            })
        ))
    ));
    /**
     * Save Visibilidade Success
     */
    saveVisibilidadeSuccess: any = createEffect(() => this._actions.pipe(
        ofType<VisibilidadeEditActions.SaveVisibilidadeSuccess>(VisibilidadeEditActions.SAVE_VISIBILIDADE_TIPO_RELATORIO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar'), 'listar')]).then();
        })
    ), {dispatch: false});
}
