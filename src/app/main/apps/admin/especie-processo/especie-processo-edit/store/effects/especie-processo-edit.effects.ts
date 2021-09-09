import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as EspecieProcessoEditActions from '../actions/especie-processo-edit.actions';
import * as EspecieProcessoListActions
    from '../../../especie-processo-list/store/actions/especie-processo-list.actions';

import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';
import {EspecieProcesso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EspecieProcessoEditEffects {
    routerState: any;
    /**
     * Get EspecieProcesso with router parameters
     *
     * @type {Observable<any>}
     */
    getEspecieProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieProcessoEditActions.GetEspecieProcesso>(EspecieProcessoEditActions.GET_ESPECIE_PROCESSO),
        switchMap(action => this._especieProcessoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
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
        catchError((err) => {
            console.log(err);
            return of(new EspecieProcessoEditActions.GetEspecieProcessoFailed(err));
        })
    ));
    /**
     * Save EspecieProcesso
     *
     * @type {Observable<any>}
     */
    saveEspecieProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieProcessoEditActions.SaveEspecieProcesso>(EspecieProcessoEditActions.SAVE_ESPECIE_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie processo',
            content: 'Salvando a espécie processo ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._especieProcessoService.save(action.payload.especieProcesso, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie processo',
                    content: 'Espécie processo id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: EspecieProcesso) => [
                    new EspecieProcessoEditActions.SaveEspecieProcessoSuccess(response),
                    new EspecieProcessoListActions.ReloadEspecieProcesso(),
                    new AddData<EspecieProcesso>({data: [response], schema: especieProcessoSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'espécie processo',
                        content: 'Erro ao salvar a espécie processo!',
                        status: 2, // erro
                    }));
                    return of(new EspecieProcessoEditActions.SaveEspecieProcessoFailed(err));
                })
            );
        })
    ));
    /**
     * Update EspecieProcesso
     *
     * @type {Observable<any>}
     */
    updateEspecieProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieProcessoEditActions.UpdateEspecieProcesso>(EspecieProcessoEditActions.UPDATE_ESPECIE_PROCESSO),
        switchMap(action => this._especieProcessoService.patch(action.payload.especieProcesso, action.payload.changes).pipe(
            mergeMap((response: EspecieProcesso) => [
                new EspecieProcessoListActions.ReloadEspecieProcesso(),
                new AddData<EspecieProcesso>({data: [response], schema: especieProcessoSchema}),
                new EspecieProcessoEditActions.UpdateEspecieProcessoSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new EspecieProcessoEditActions.UpdateEspecieProcessoFailed(err));
        })
    ));
    /**
     * Save EspecieProcesso Success
     */
    saveEspecieProcessoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieProcessoEditActions.SaveEspecieProcessoSuccess>(EspecieProcessoEditActions.SAVE_ESPECIE_PROCESSO_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/especie-processo/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _especieProcessoService: EspecieProcessoService,
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
