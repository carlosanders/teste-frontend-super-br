import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as EspecieProcessoEditActions from '../actions/especie-processo-edit.actions';
import * as EspecieProcessoListActions from '../../../especie-processo-list/store/actions/especie-processo-list.actions';

import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';
import {colaborador as colaboradorSchema} from '@cdk/normalizr';
import {EspecieProcesso, Colaborador} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class EspecieProcessoEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieProcessoService: EspecieProcessoService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get EspecieProcesso with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieProcesso: any =
        this._actions
            .pipe(
                ofType<EspecieProcessoEditActions.GetEspecieProcesso>(EspecieProcessoEditActions.GET_ESPECIE_PROCESSO),
                switchMap((action) => {
                    return this._especieProcessoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
                switchMap(response => [
                    new AddData<EspecieProcesso>({data: response['entities'], schema: especieProcessoSchema}),
                    new EspecieProcessoEditActions.GetEspecieProcessoSuccess({
                        loaded: {
                            id: 'especieProcessoHandle',
                            value: this.routerState.params.especieProcessoHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieProcessoEditActions.GetEspecieProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Save EspecieProcesso
     * @type {Observable<any>}
     */
    @Effect()
    saveEspecieProcesso: any =
        this._actions
            .pipe(
                ofType<EspecieProcessoEditActions.SaveEspecieProcesso>(EspecieProcessoEditActions.SAVE_ESPECIE_PROCESSO),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._especieProcessoService.save(action.payload, context).pipe(
                        mergeMap((response: EspecieProcesso) => [
                            new EspecieProcessoListActions.ReloadEspecieProcesso(),
                            new AddData<EspecieProcesso>({data: [response], schema: especieProcessoSchema}),
                            new EspecieProcessoEditActions.SaveEspecieProcessoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieProcessoEditActions.SaveEspecieProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Update EspecieProcesso
     * @type {Observable<any>}
     */
    @Effect()
    updateEspecieProcesso: any =
        this._actions
            .pipe(
                ofType<EspecieProcessoEditActions.UpdateEspecieProcesso>(EspecieProcessoEditActions.UPDATE_ESPECIE_PROCESSO),
                switchMap((action) => {
                    return this._especieProcessoService.patch(action.payload.especieProcesso, action.payload.changes).pipe(
                        mergeMap((response: EspecieProcesso) => [
                            new EspecieProcessoListActions.ReloadEspecieProcesso(),
                            new AddData<EspecieProcesso>({data: [response], schema: especieProcessoSchema}),
                            new EspecieProcessoEditActions.UpdateEspecieProcessoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieProcessoEditActions.UpdateEspecieProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Save EspecieProcesso Success
     */
    @Effect({dispatch: false})
    saveEspecieProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<EspecieProcessoEditActions.SaveEspecieProcessoSuccess>(EspecieProcessoEditActions.SAVE_ESPECIE_PROCESSO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/especie-processo/listar']).then();
                })
            );


}