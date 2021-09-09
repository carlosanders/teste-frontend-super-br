import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as RegisterActions from '../actions';
import {UsuarioService} from '@cdk/services/usuario.service';
import {usuario as usuarioSchema} from '@cdk/normalizr';

import {Usuario} from '@cdk/models';
import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {Observable, of} from 'rxjs';

@Injectable()
export class RegisterEffects {
    routerState: any;
    /**
     * Registar Usuario
     *
     * @type {Observable<any>}
     */
    register: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RegisterActions.Register>(RegisterActions.REGISTER),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'registro',
            content: 'Salvando o registro ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._usuarioService.save(action.payload.usuario).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'registro',
                content: 'Registro id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Usuario) => [
                new RegisterActions.RegisterSuccess(response),
                new AddData<Usuario>({data: [response], schema: usuarioSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'registro',
                    content: 'Erro ao salvar o registro!',
                    status: 2, // erro
                }));
                return of(new RegisterActions.RegisterFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _usuarioService: UsuarioService,
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
