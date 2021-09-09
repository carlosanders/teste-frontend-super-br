import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as MunicipioEditActions from '../actions/municipio-edit.actions';
import * as MunicipioListActions from '../../../municipio-list/store/actions/municipio-list.actions';

import {MunicipioService} from '@cdk/services/municipio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {municipio as municipioSchema} from '@cdk/normalizr';
import {Municipio} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class MunicipioEditEffects {
    routerState: any;
    /**
     * Get Municipio with router parameters
     *
     * @type {Observable<any>}
     */
    getMunicipio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MunicipioEditActions.GetMunicipio>(MunicipioEditActions.GET_MUNICIPIO),
        switchMap(action => this._municipioService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<Municipio>({data: response['entities'], schema: municipioSchema}),
            new MunicipioEditActions.GetMunicipioSuccess({
                loaded: {
                    id: 'municipioHandle',
                    value: this.routerState.params.municipioHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new MunicipioEditActions.GetMunicipioFailed(err));
        })
    ));
    /**
     * Save Municipio
     *
     * @type {Observable<any>}
     */
    saveMunicipio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MunicipioEditActions.SaveMunicipio>(MunicipioEditActions.SAVE_MUNICIPIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'município',
            content: 'Salvando o município ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._municipioService.save(action.payload.municipio, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'município',
                    content: 'Município id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Municipio) => [
                    new MunicipioEditActions.SaveMunicipioSuccess(response),
                    new MunicipioListActions.ReloadMunicipio(),
                    new AddData<Municipio>({data: [response], schema: municipioSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'município',
                        content: 'Erro ao salvar o município!',
                        status: 2, // erro
                    }));
                    return of(new MunicipioEditActions.SaveMunicipioFailed(err));
                })
            );
        })
    ));
    /**
     * Update Municipio
     *
     * @type {Observable<any>}
     */
    updateMunicipio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MunicipioEditActions.UpdateMunicipio>(MunicipioEditActions.UPDATE_MUNICIPIO),
        switchMap(action => this._municipioService.patch(action.payload.municipio, action.payload.changes).pipe(
            mergeMap((response: Municipio) => [
                new MunicipioListActions.ReloadMunicipio(),
                new AddData<Municipio>({data: [response], schema: municipioSchema}),
                new MunicipioEditActions.UpdateMunicipioSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new MunicipioEditActions.UpdateMunicipioFailed(err));
        })
    ));
    /**
     * Save Municipio Success
     */
    saveMunicipioSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MunicipioEditActions.SaveMunicipioSuccess>(MunicipioEditActions.SAVE_MUNICIPIO_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/municipios/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _municipioService: MunicipioService,
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
