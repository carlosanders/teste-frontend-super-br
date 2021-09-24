import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AssuntoAdministrativoEditActions from '../actions/assunto-administrativo-edit.actions';
import * as AssuntoAdministrativoListActions
    from '../../../assunto-administrativo-list/store/actions/assunto-administrativo-list.actions';

import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '@cdk/normalizr';
import {AssuntoAdministrativo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class AssuntoAdministrativoEditEffects {
    routerState: any;

    /**
     * Get AssuntoAdministrativo with router parameters
     *
     * @type {Observable<any>}
     */
    getAssuntoAdministrativo: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoAdministrativoEditActions.GetAssuntoAdministrativo>(AssuntoAdministrativoEditActions.GET_ASSUNTO_ADMINISTRATIVO),
        switchMap(action => this._assuntoAdministrativoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<AssuntoAdministrativo>({
                data: response['entities'],
                schema: assuntoAdministrativoSchema
            }),
            new AssuntoAdministrativoEditActions.GetAssuntoAdministrativoSuccess({
                loaded: {
                    id: 'assuntoAdministrativoHandle',
                    value: this.routerState.params.assuntoAdministrativoHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new AssuntoAdministrativoEditActions.GetAssuntoAdministrativoFailed(err));
        })
    ));
    /**
     * Save AssuntoAdministrativo
     *
     * @type {Observable<any>}
     */
    saveAssuntoAdministrativo: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoAdministrativoEditActions.SaveAssuntoAdministrativo>(AssuntoAdministrativoEditActions.SAVE_ASSUNTO_ADMINISTRATIVO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assunto administrativo',
            content: 'Salvando o assunto administrativo ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._assuntoAdministrativoService.save(action.payload.assuntoAdministrativo, context).pipe(
                tap(response =>
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'assunto administrativo',
                        content: 'Assunto administrativo id ' + response.id + ' salvo com sucesso.',
                        status: 1, // sucesso
                    }))
                ),
                mergeMap((response: AssuntoAdministrativo) => [
                    new AssuntoAdministrativoEditActions.SaveAssuntoAdministrativoSuccess(response),
                    new AssuntoAdministrativoListActions.ReloadAssuntoAdministrativo(),
                    new AddData<AssuntoAdministrativo>({data: [response], schema: assuntoAdministrativoSchema}),
                    new UpdateData<AssuntoAdministrativo>({
                        id: response.id,
                        schema: assuntoAdministrativoSchema,
                        changes: {parent: response.parent}
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'assunto administrativo',
                        content: 'Erro ao salvar o assunto administrativo!',
                        status: 2, // erro
                    }));
                    return of(new AssuntoAdministrativoEditActions.SaveAssuntoAdministrativoFailed(err));
                })
            );
        })
    ));
    /**
     * Update AssuntoAdministrativo
     *
     * @type {Observable<any>}
     */
    updateAssuntoAdministrativo: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoAdministrativoEditActions.UpdateAssuntoAdministrativo>(AssuntoAdministrativoEditActions.UPDATE_ASSUNTO_ADMINISTRATIVO),
        switchMap(action => this._assuntoAdministrativoService.patch(action.payload.assuntoAdministrativo, action.payload.changes).pipe(
            mergeMap((response: AssuntoAdministrativo) => [
                new AssuntoAdministrativoListActions.ReloadAssuntoAdministrativo(),
                new AddData<AssuntoAdministrativo>({data: [response], schema: assuntoAdministrativoSchema}),
                new AssuntoAdministrativoEditActions.UpdateAssuntoAdministrativoSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new AssuntoAdministrativoEditActions.UpdateAssuntoAdministrativoFailed(err));
        })
    ));
    /**
     * Save AssuntoAdministrativo Success
     */
    saveAssuntoAdministrativoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoAdministrativoEditActions.SaveAssuntoAdministrativoSuccess>(AssuntoAdministrativoEditActions.SAVE_ASSUNTO_ADMINISTRATIVO_SUCCESS),
        tap(() => {
            this._router.navigate(['/apps/admin/assuntos/listar']).then();
        })
    ), {dispatch: false});
    /**
     * Save AssuntoAdministrativo Success
     */
    updateAssuntoAdministrativoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoAdministrativoEditActions.UpdateAssuntoAdministrativoSuccess>(AssuntoAdministrativoEditActions.UPDATE_ASSUNTO_ADMINISTRATIVO_SUCCESS),
        tap(() => {
            this._router.navigate(['/apps/admin/assuntos/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _assuntoAdministrativoService: AssuntoAdministrativoService,
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
