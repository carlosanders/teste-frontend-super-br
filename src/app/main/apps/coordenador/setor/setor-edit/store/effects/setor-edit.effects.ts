import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
    /**
     * Get Setor with router parameters
     *
     * @type {Observable<any>}
     */
    getSetor: Observable<any> = createEffect(() => this._actions.pipe(
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
                setorId: this.routerState.params['setorHandle']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new SetorEditActions.GetSetorFailed(err));
        })
    ));
    /**
     * Save Setor
     *
     * @type {Observable<any>}
     */
    saveSetor: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<SetorEditActions.SaveSetor>(SetorEditActions.SAVE_SETOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'setor',
            content: 'Salvando o setor ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._setorService.save(action.payload.setor, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'setor',
                    content: 'Setor id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
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
            );
        })
    ));
    /**
     * Save Setor Success
     */
    saveSetorSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<SetorEditActions.SaveSetorSuccess>(SetorEditActions.SAVE_SETOR_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('setor/'), 'setor/default/listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
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
