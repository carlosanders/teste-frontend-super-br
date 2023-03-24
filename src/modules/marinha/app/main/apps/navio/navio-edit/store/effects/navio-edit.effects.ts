import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as NavioEditActions from '../actions/navio-edit.actions';
import * as NavioListActions from '../../../navio-list/store/actions/navio-list.actions';

import {NavioService} from '../../../../../../../@cdk/services/navio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {navio as navioSchema} from '../../../../../../../@cdk/normalizr';
import {Navio} from '../../../../../../../@cdk/models/navio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class NavioEditEffects {
    routerState: any;
    /**
     * Get Navio with router parameters
     *
     * @type {Observable<any>}
     */
    getNavio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<NavioEditActions.GetNavio>(NavioEditActions.GET_NAVIO),
        switchMap(action => this._navioService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<Navio>({data: response['entities'], schema: navioSchema}),
            new NavioEditActions.GetNavioSuccess({
                loaded: {
                    id: 'navioHandle',
                    value: this.routerState.params.navioHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new NavioEditActions.GetNavioFailed(err));
        })
    ));
    /**
     * Save Navio
     *
     * @type {Observable<any>}
     */
    saveNavio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<NavioEditActions.SaveNavio>(NavioEditActions.SAVE_NAVIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'navio',
            content: 'Salvando o navio ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._navioService.save(action.payload.navio, context).pipe(
                tap(response =>
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'navio',
                        content: 'Navio id ' + response.id + ' salvo com sucesso.',
                        status: 1, // sucesso
                    }))
                ),
                mergeMap((response: Navio) => [
                    new NavioEditActions.SaveNavioSuccess(response),
                    new NavioListActions.ReloadNavio(),
                    new AddData<Navio>({data: [response], schema: navioSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'navio',
                        content: 'Erro ao salvar o navio!',
                        status: 2, // erro
                    }));
                    return of(new NavioEditActions.SaveNavioFailed(err));
                })
            );
        })
    ));
    /**
     * Update Navio
     *
     * @type {Observable<any>}
     */
    updateNavio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<NavioEditActions.UpdateNavio>(NavioEditActions.UPDATE_NAVIO),
        switchMap(action => this._navioService.patch(action.payload.navio, action.payload.changes).pipe(
            mergeMap((response: Navio) => [
                new NavioListActions.ReloadNavio(),
                new AddData<Navio>({data: [response], schema: navioSchema}),
                new NavioEditActions.UpdateNavioSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new NavioEditActions.UpdateNavioFailed(err));
        })
    ));
    /**
     * Save Navio Success
     */
    saveNavioSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<NavioEditActions.SaveNavioSuccess>(NavioEditActions.SAVE_NAVIO_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/navios/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _navioService: NavioService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
