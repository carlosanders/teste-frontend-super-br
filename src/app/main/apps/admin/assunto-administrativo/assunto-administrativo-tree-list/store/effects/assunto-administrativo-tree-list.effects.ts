import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
import * as AssuntoAdministrativoTreeListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {AssuntoAdministrativo} from '@cdk/models';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '@cdk/normalizr';
import * as AssuntoAdministrativoListActions
    from '../../../assunto-administrativo-list/store/actions/assunto-administrativo-list.actions';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class AssuntoAdministrativoTreeListEffects {
    routerState: any;
    /**
     * Get AssuntoAdministrativo with router parameters
     *
     * @type {Observable<any>}
     */
    getAssuntoAdministrativo: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoAdministrativoTreeListActions.GetAssuntoAdministrativo>(AssuntoAdministrativoTreeListActions.GET_ASSUNTO_ADMINISTRATIVO),
        switchMap(action => this._assuntoAdministrativoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<AssuntoAdministrativo>({
                    data: response['entities'],
                    schema: assuntoAdministrativoSchema
                }),
                new AssuntoAdministrativoTreeListActions.GetAssuntoAdministrativoSuccess({
                    entitiesId: response['entities'].map(assuntoAdministrativo => assuntoAdministrativo.id),
                    loaded: {
                        id: 'assuntoAdministrativoHandle',
                        value: this.routerState.params.assuntoAdministrativoHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new AssuntoAdministrativoTreeListActions.GetAssuntoAdministrativoFailed(err));
            })
        ))
    ));
    /**
     * Save AssuntoAdministrativo
     *
     * @type {Observable<any>}
     */
    saveAssuntoAdministrativo: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoAdministrativoTreeListActions.SaveAssuntoAdministrativo>(AssuntoAdministrativoTreeListActions.SAVE_ASSUNTO_ADMINISTRATIVO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assunto administrativo',
            content: 'Salvando a assunto administrativo ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._assuntoAdministrativoService.save(action.payload.assuntoAdministrativo).pipe(
                tap(response =>
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'assunto administrativo',
                        content: 'Assunto Administrativo id ' + response.id + ' salva com sucesso.',
                        status: 1, // sucesso
                    }))
                ),
                mergeMap((response: AssuntoAdministrativo) => [
                    new AssuntoAdministrativoTreeListActions.SaveAssuntoAdministrativoSuccess(response),
                    new AssuntoAdministrativoListActions.ReloadAssuntoAdministrativo(),
                    new AddData<AssuntoAdministrativo>({data: [response], schema: assuntoAdministrativoSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'assunto administrativo',
                        content: 'Erro ao salvar a assunto administrativo!',
                        status: 2, // erro
                    }));
                    return of(new AssuntoAdministrativoTreeListActions.SaveAssuntoAdministrativoFailed(err));
                })
            ))
    ));

    constructor(
        private _actions: Actions,
        private _assuntoAdministrativoService: AssuntoAdministrativoService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

}
