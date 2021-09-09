import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AfastamentoEditActions from '../actions/afastamento-edit.actions';
import * as AfastamentoListActions from '../../../afastamento-list/store/actions/afastamento-list.actions';

import {AfastamentoService} from '@cdk/services/afastamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';
import {Afastamento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class AfastamentoEditEffect {
    routerState: any;
    /**
     * Get Afastamento with router parameters
     *
     * @type {Observable<any>}
     */
    getAfastamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AfastamentoEditActions.GetAfastamento>(AfastamentoEditActions.GET_AFASTAMENTO),
        switchMap(action => this._afastamentoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Afastamento>({data: response['entities'], schema: afastamentoSchema}),
            new AfastamentoEditActions.GetAfastamentoSuccess({
                loaded: {
                    id: 'afastamentoHandle',
                    value: this.routerState.params.afastamentoHandle
                },
                afastamentoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new AfastamentoEditActions.GetAfastamentoFailed(err));
        })
    ));
    /**
     * Save Afastamento
     *
     * @type {Observable<any>}
     */
    saveAfastamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AfastamentoEditActions.SaveAfastamento>(AfastamentoEditActions.SAVE_AFASTAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'afastamento',
            content: 'Salvando o afastamento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._afastamentoService.save(action.payload.afastamento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'afastamento',
                content: 'Afastamento id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Afastamento) => [
                new AddData<Afastamento>({data: [response], schema: afastamentoSchema}),
                new AfastamentoEditActions.SaveAfastamentoSuccess(),
                new AfastamentoListActions.ReloadAfastamentos()
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'afastamento',
                    content: 'Erro ao salvar o afastamento!',
                    status: 2, // erro
                }));
                return of(new AfastamentoEditActions.SaveAfastamentoFailed(err));
            })
        ))
    ));
    /**
     * Save Afastamento Success
     */
    saveAfastamentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AfastamentoEditActions.SaveAfastamentoSuccess>(AfastamentoEditActions.SAVE_AFASTAMENTO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.afastamentoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _afastamentoService: AfastamentoService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
