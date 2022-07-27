import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as CronjobEditActions from '../actions/cronjob-edit.actions';
import * as CronjobListActions from '../../../cronjob-list/store/actions/cronjob-list.actions';

import {CronjobService} from '@cdk/services/cronjob.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {cronjob as cronjobSchema} from '@cdk/normalizr';
import {Cronjob} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as appStore from 'app/store';

@Injectable()
export class CronjobEditEffects {
    routerState: any;
    /**
     * Get Cronjob with router parameters
     *
     * @type {Observable<any>}
     */
    getCronjob: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CronjobEditActions.GetCronjob>(CronjobEditActions.GET_CRONJOB),
        switchMap(action => this._cronjobService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<Cronjob>({data: response['entities'], schema: cronjobSchema}),
            new CronjobEditActions.GetCronjobSuccess({
                loaded: {
                    id: 'cronjobHandle',
                    value: this.routerState.params.cronjobHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new CronjobEditActions.GetCronjobFailed(err));
        })
    ));

    /**
     * Save Cronjob
     *
     * @type {Observable<any>}
     */
    saveCronjob: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CronjobEditActions.SaveCronjob>(CronjobEditActions.SAVE_CRONJOB),
        tap(action => this._store.dispatch(new appStore.Operacao({
            id: action.payload.operacaoId,
            type: 'classificação',
            content: 'Salvando a classificação ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._cronjobService.save(action.payload.cronjob, context).pipe(
                tap(response => this._store.dispatch(new appStore.Operacao({
                    id: action.payload.operacaoId,
                    type: 'classificação',
                    content: 'Classificação id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Cronjob) => [
                    new CronjobEditActions.SaveCronjobSuccess(response),
                    new CronjobListActions.ReloadCronjob(),
                    new AddData<Cronjob>({data: [response], schema: cronjobSchema}),
                    new UpdateData<Cronjob>({
                        id: response.id,
                        schema: cronjobSchema,
                        changes: response
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new appStore.Operacao({
                        id: action.payload.operacaoId,
                        type: 'classificação',
                        content: 'Erro ao salvar a classificação!',
                        status: 2, // erro
                    }));
                    return of(new CronjobEditActions.SaveCronjobFailed(err));
                })
            );
        })
    ));
    /**
     * Update Cronjob
     *
     * @type {Observable<any>}
     */
    updateCronjob: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CronjobEditActions.UpdateCronjob>(CronjobEditActions.UPDATE_CRONJOB),
        switchMap(action => this._cronjobService.patch(action.payload.Cronjob, action.payload.changes).pipe(
            mergeMap((response: Cronjob) => [
                new CronjobListActions.ReloadCronjob(),
                new AddData<Cronjob>({data: [response], schema: cronjobSchema}),
                new CronjobEditActions.UpdateCronjobSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new CronjobEditActions.UpdateCronjobFailed(err));
        })
    ));

    /**
     * Save Cronjob Success
     */
    saveCronjobSuccess: any = createEffect(() => this._actions.pipe(
        ofType<CronjobEditActions.SaveCronjobSuccess>(CronjobEditActions.SAVE_CRONJOB_SUCCESS),
        tap(() => {
            this._router.navigate(['/apps/admin/cronjob/listar']).then();
        })
    ), {dispatch: false});

    /**
     * Save Cronjob Success
     */
    updateCronjobSuccess: any = createEffect(() => this._actions.pipe(
        ofType<CronjobEditActions.UpdateCronjobSuccess>(CronjobEditActions.UPDATE_CRONJOB_SUCCESS),
        tap(() => {
            this._router.navigate(['/apps/admin/cronjob/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _cronjobService: CronjobService,
        private _store: Store<appStore.State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(appStore.getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
