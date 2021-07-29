import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AfastamentoEditActions from '../actions/afastamento-edit.actions';
import * as AfastamentosListActions from '../../../afastamentos-list/store/actions';

import {AfastamentoService} from '@cdk/services/afastamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';
import {Afastamento} from '@cdk/models/afastamento.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class AfastamentoEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _afastamentoService: AfastamentoService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get Afastamento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAfastamento: any =
        this._actions
            .pipe(
                ofType<AfastamentoEditActions.GetAfastamento>(AfastamentoEditActions.GET_AFASTAMENTO),
                switchMap(action => this._afastamentoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'colaborador.usuario',
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AfastamentoEditActions.GetAfastamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Afastamento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveAfastamento: any =
        this._actions
            .pipe(
                ofType<AfastamentoEditActions.SaveAfastamento>(AfastamentoEditActions.SAVE_AFASTAMENTO),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'afastamento',
                    content: 'Salvando o afastamento ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._afastamentoService.save(action.payload.afastamento, context).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'afastamento',
                                content: 'Afastamento id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Afastamento) => [
                            new AfastamentoEditActions.SaveAfastamentoSuccess(),
                            new AfastamentosListActions.ReloadAfastamentos(),
                            new AddData<Afastamento>({data: [response], schema: afastamentoSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'afastamento',
                                content: 'Erro ao salvar a afastamento!',
                                status: 2, // erro
                            }));
                            return of(new AfastamentoEditActions.SaveAfastamentoFailed(err));
                        })
                    )
                })
            );

    /**
     * Save Afastamento Success
     */
    @Effect({dispatch: false})
    saveAfastamentoSuccess: any =
        this._actions
            .pipe(
                ofType<AfastamentoEditActions.SaveAfastamentoSuccess>(AfastamentoEditActions.SAVE_AFASTAMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.afastamentoHandle), 'listar')]).then();
                })
            );
}
