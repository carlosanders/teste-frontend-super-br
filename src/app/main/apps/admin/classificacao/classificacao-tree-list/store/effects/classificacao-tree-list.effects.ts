import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../store';
import * as ClassificacaoTreeListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {ClassificacaoService} from '../../../../../../../../@cdk/services/classificacao.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {Classificacao} from '../../../../../../../../@cdk/models';
import {classificacao as classificacaoSchema} from '../../../../../../../../@cdk/normalizr';
import * as ClassificacaoListActions
    from '../../../classificacao-list/store/actions/classificacao-list.actions';


@Injectable()
export class ClassificacaoTreeListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _classificacaoService: ClassificacaoService,
        private _loginService: LoginService,
        private _store: Store<State>
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
     * Get Classificacao with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getClassificacao: any =
        this._actions
            .pipe(
                ofType<ClassificacaoTreeListActions.GetClassificacao>(ClassificacaoTreeListActions.GET_CLASSIFICACAO),
                switchMap((action) => {
                    return this._classificacaoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                            new AddData<Classificacao>({data: response['entities'], schema: classificacaoSchema}),
                            new ClassificacaoTreeListActions.GetClassificacaoSuccess({
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
                            return of(new ClassificacaoTreeListActions.GetClassificacaoFailed(err));
                        })
                    );
                })
            );


    /**
     * Save Classificacao
     * @type {Observable<any>}
     */
    @Effect()
    saveClassificacao: any =
        this._actions
            .pipe(
                ofType<ClassificacaoTreeListActions.SaveClassificacao>(ClassificacaoTreeListActions.SAVE_CLASSIFICACAO),
                switchMap((action) => {
                    return this._classificacaoService.save(action.payload).pipe(
                        mergeMap((response: Classificacao) => [
                            new ClassificacaoListActions.ReloadClassificacao(),
                            new AddData<Classificacao>({data: [response], schema: classificacaoSchema}),
                            new ClassificacaoTreeListActions.SaveClassificacaoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ClassificacaoTreeListActions.SaveClassificacaoFailed(err));
                    return caught;
                })
            );


}
