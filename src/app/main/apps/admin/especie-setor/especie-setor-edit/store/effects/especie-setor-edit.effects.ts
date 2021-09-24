import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as EspecieSetorEditActions from '../actions/especie-setor-edit.actions';
import * as EspecieSetorListActions from '../../../especie-setor-list/store/actions/especie-setor-list.actions';
import {EspecieSetorService} from '@cdk/services/especie-setor.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr';
import {EspecieSetor} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EspecieSetorEditEffects {
    routerState: any;
    /**
     * Get EspecieSetor with router parameters
     *
     * @type {Observable<any>}
     */
    getEspecieSetor: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieSetorEditActions.GetEspecieSetor>(EspecieSetorEditActions.GET_ESPECIE_SETOR),
        switchMap(action => this._especieSetorService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<EspecieSetor>({data: response['entities'], schema: especieSetorSchema}),
            new EspecieSetorEditActions.GetEspecieSetorSuccess({
                loaded: {
                    id: 'especieSetorHandle',
                    value: this.routerState.params.especieSetorHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new EspecieSetorEditActions.GetEspecieSetorFailed(err));
        })
    ));
    /**
     * Save EspecieSetor
     *
     * @type {Observable<any>}
     */
    saveEspecieSetor: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieSetorEditActions.SaveEspecieSetor>(EspecieSetorEditActions.SAVE_ESPECIE_SETOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie setor',
            content: 'Salvando a espécie setor ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._especieSetorService.save(action.payload.especieSetor, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie setor',
                    content: 'Espécie setor id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: EspecieSetor) => [
                    new EspecieSetorEditActions.SaveEspecieSetorSuccess(response),
                    new EspecieSetorListActions.ReloadEspecieSetor(),
                    new AddData<EspecieSetor>({data: [response], schema: especieSetorSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'espécie setor',
                        content: 'Erro ao salvar a espécie setor!',
                        status: 2, // erro
                    }));
                    return of(new EspecieSetorEditActions.SaveEspecieSetorFailed(err));
                })
            );
        })
    ));
    /**
     * Update EspecieSetor
     *
     * @type {Observable<any>}
     */
    updateEspecieSetor: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieSetorEditActions.UpdateEspecieSetor>(EspecieSetorEditActions.UPDATE_ESPECIE_SETOR),
        switchMap(action => this._especieSetorService.patch(action.payload.especieSetor, action.payload.changes).pipe(
            mergeMap((response: EspecieSetor) => [
                new EspecieSetorListActions.ReloadEspecieSetor(),
                new AddData<EspecieSetor>({data: [response], schema: especieSetorSchema}),
                new EspecieSetorEditActions.UpdateEspecieSetorSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new EspecieSetorEditActions.UpdateEspecieSetorFailed(err));
        })
    ));
    /**
     * Save EspecieSetor Success
     */
    saveEspecieSetorSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieSetorEditActions.SaveEspecieSetorSuccess>(EspecieSetorEditActions.SAVE_ESPECIE_SETOR_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/especie-setor/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _especieSetorService: EspecieSetorService,
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
