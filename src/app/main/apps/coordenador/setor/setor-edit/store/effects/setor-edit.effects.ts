import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as SetorEditActions from '../actions/setor-edit.actions';
import * as SetorListActions from '../../../setor-list/store/actions/setor-list.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class SetorEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
     * Get Setor with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getSetor: any =
        this._actions
            .pipe(
                ofType<SetorEditActions.GetSetor>(SetorEditActions.GET_SETOR),
                switchMap(action => this._setorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                    new SetorEditActions.GetSetorSuccess({
                        loaded: {
                            id: 'setorHandle',
                            value: this.routerState.params.setorHandle
                        },
                        setorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new SetorEditActions.GetSetorFailed(err));
                    return caught;
                })
            );

    /**
     * Save Setor
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveSetor: any =
        this._actions
            .pipe(
                ofType<SetorEditActions.SaveSetor>(SetorEditActions.SAVE_SETOR),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'setor',
                    content: 'Salvando o setor ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._setorService.save(action.payload.setor).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'setor',
                                content: 'Setor id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Setor) => [
                            new SetorEditActions.SaveSetorSuccess(),
                            new SetorListActions.ReloadSetores(),
                            new AddData<Setor>({data: [response], schema: setorSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'setor',
                                content: 'Erro ao salvar o setor!',
                                status: 2, // erro
                            }));
                            return of(new SetorEditActions.SaveSetorFailed(err));
                        })
                    )
                })
            );

    /**
     * Save Setor Success
     */
    @Effect({dispatch: false})
    saveSetorSuccess: any =
        this._actions
            .pipe(
                ofType<SetorEditActions.SaveSetorSuccess>(SetorEditActions.SAVE_SETOR_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('setor/'), 'setor/default/listar')]).then();
                })
            );
}
