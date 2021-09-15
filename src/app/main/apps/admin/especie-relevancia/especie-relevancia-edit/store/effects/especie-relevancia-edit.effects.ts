import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as EspecieRelevanciaEditActions from '../actions/especie-relevancia-edit.actions';
import * as EspecieRelevanciaListActions
    from '../../../especie-relevancia-list/store/actions/especie-relevancia-list.actions';

import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieRelevancia as especieRelevanciaSchema} from '@cdk/normalizr';
import {EspecieRelevancia} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EspecieRelevanciaEditEffects {
    routerState: any;
    /**
     * Get EspecieRelevancia with router parameters
     *
     * @type {Observable<any>}
     */
    getEspecieRelevancia: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieRelevanciaEditActions.GetEspecieRelevancia>(EspecieRelevanciaEditActions.GET_ESPECIE_RELEVANCIA),
        switchMap(action => this._especieRelevanciaService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<EspecieRelevancia>({data: response['entities'], schema: especieRelevanciaSchema}),
            new EspecieRelevanciaEditActions.GetEspecieRelevanciaSuccess({
                loaded: {
                    id: 'especieRelevanciaHandle',
                    value: this.routerState.params.especieRelevanciaHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new EspecieRelevanciaEditActions.GetEspecieRelevanciaFailed(err));
        })
    ));
    /**
     * Save EspecieRelevancia
     *
     * @type {Observable<any>}
     */
    saveEspecieRelevancia: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieRelevanciaEditActions.SaveEspecieRelevancia>(EspecieRelevanciaEditActions.SAVE_ESPECIE_RELEVANCIA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie relevância',
            content: 'Salvando a espécie relevância ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._especieRelevanciaService.save(action.payload.especieRelevancia, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie relevância',
                    content: 'Espécie relevância id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: EspecieRelevancia) => [
                    new EspecieRelevanciaEditActions.SaveEspecieRelevanciaSuccess(response),
                    new EspecieRelevanciaListActions.ReloadEspecieRelevancia(),
                    new AddData<EspecieRelevancia>({data: [response], schema: especieRelevanciaSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'espécie relevância',
                        content: 'Erro ao salvar a espécie relevância!',
                        status: 2, // erro
                    }));
                    return of(new EspecieRelevanciaEditActions.SaveEspecieRelevanciaFailed(err));
                })
            );
        })
    ));
    /**
     * Update EspecieRelevancia
     *
     * @type {Observable<any>}
     */
    updateEspecieRelevancia: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieRelevanciaEditActions.UpdateEspecieRelevancia>(EspecieRelevanciaEditActions.UPDATE_ESPECIE_RELEVANCIA),
        switchMap(action => this._especieRelevanciaService.patch(action.payload.especieRelevancia, action.payload.changes).pipe(
            mergeMap((response: EspecieRelevancia) => [
                new EspecieRelevanciaListActions.ReloadEspecieRelevancia(),
                new AddData<EspecieRelevancia>({data: [response], schema: especieRelevanciaSchema}),
                new EspecieRelevanciaEditActions.UpdateEspecieRelevanciaSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new EspecieRelevanciaEditActions.UpdateEspecieRelevanciaFailed(err));
        })
    ));
    /**
     * Save EspecieRelevancia Success
     */
    saveEspecieRelevanciaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<EspecieRelevanciaEditActions.SaveEspecieRelevanciaSuccess>(EspecieRelevanciaEditActions.SAVE_ESPECIE_RELEVANCIA_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/especie-relevancias/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _especieRelevanciaService: EspecieRelevanciaService,
        private _colaboradorService: ColaboradorService,
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
