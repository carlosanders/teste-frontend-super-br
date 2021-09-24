import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as SegurancaActions from '../actions/seguranca.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class SegurancaEffect {
    routerState: any;
    /**
     * Save Seguranca
     *
     * @type {Observable<any>}
     */
    saveSeguranca: any = createEffect(() => this._actions.pipe(
        ofType<SegurancaActions.SaveSeguranca>(SegurancaActions.SAVE_SEGURANCA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'segurança',
            content: 'Salvando a segurança ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._usuarioService.patch(action.payload.usuario, action.payload.changes).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'segurança',
                content: 'Segurança id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap(() => [
                new SegurancaActions.SaveSegurancaSuccess(),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'segurança',
                    content: 'Erro ao salvar a segurança!',
                    status: 2, // erro
                }));
                return of(new SegurancaActions.SaveSegurancaFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
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
