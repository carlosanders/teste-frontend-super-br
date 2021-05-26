import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../store';
import * as ClassificacaoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Classificacao} from '@cdk/models';
import {classificacao as classificacaoSchema} from '@cdk/normalizr';
import { CdkUtils } from '@cdk/utils';

@Injectable()
export class ClassificacaoListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _classificacaoService: ClassificacaoService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Classificacao with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getClassificacao: any =
        this._actions
            .pipe(
                ofType<ClassificacaoListActions.GetClassificacao>(ClassificacaoListActions.GET_CLASSIFICACAO),
                switchMap(action => this._classificacaoService.query(
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
                            new AddData<Classificacao>({data: response['entities'], schema: classificacaoSchema}),
                            new ClassificacaoListActions.GetClassificacaoSuccess({
                                entitiesId: response['entities'].map(classificacao => classificacao.id),
                                loaded: {
                                    id: 'classificacaoHandle',
                                    value: this.routerState.params.classificacaoHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ClassificacaoListActions.GetClassificacaoFailed(err));
                        })
                    ))
            );

    /**
     * Delete Classificacao
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteClassificacao: any =
        this._actions
            .pipe(
                ofType<ClassificacaoListActions.DeleteClassificacao>(ClassificacaoListActions.DELETE_CLASSIFICACAO),
                mergeMap(action => this._classificacaoService.destroy(action.payload).pipe(
                        map(response => new ClassificacaoListActions.DeleteClassificacaoSuccess(action.payload)),
                        catchError((err) => {
                            console.log(err);
                            return of(new ClassificacaoListActions.DeleteClassificacaoFailed(
                                {
                                        [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    ))
            );
}
