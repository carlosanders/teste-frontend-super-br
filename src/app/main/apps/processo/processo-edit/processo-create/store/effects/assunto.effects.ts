import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as AssuntoActions from '../actions/assunto.actions';
import {AddData} from '@cdk/ngrx-normalizr';
import {Assunto} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {assunto as assuntoSchema} from '@cdk/normalizr';
import {AssuntoService} from '@cdk/services/assunto.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {getAssuntosPagination} from '../selectors';

@Injectable()
export class AssuntosEffect {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _assuntoService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _assuntoService: AssuntoService,
        private _store: Store<State>,
        private _router: Router
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
     * Get Assuntos Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAssuntosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<AssuntoActions.GetAssuntos>(AssuntoActions.GET_ASSUNTOS),
                switchMap(action => this._assuntoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context))),
                mergeMap(response => [
                    new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
                    new AssuntoActions.GetAssuntosSuccess({
                        entitiesId: response['entities'].map(assunto => assunto.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle,
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AssuntoActions.GetAssuntosFailed(err));
                    return caught;
                })
            );


    /**
     * Delete Assunto
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteAssunto: any =
        this._actions
            .pipe(
                ofType<AssuntoActions.DeleteAssunto>(AssuntoActions.DELETE_ASSUNTO),
                mergeMap(action => this._assuntoService.destroy(action.payload).pipe(
                        map(response => new AssuntoActions.DeleteAssuntoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new AssuntoActions.DeleteAssuntoFailed(action.payload));
                        })
                    ))
            );

    /**
     * Save Assunto
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveAssunto: any =
        this._actions
            .pipe(
                ofType<AssuntoActions.SaveAssunto>(AssuntoActions.SAVE_ASSUNTO),
                switchMap(action => this._assuntoService.save(action.payload).pipe(
                        mergeMap((response: Assunto) => [
                            new AssuntoActions.SaveAssuntoSuccess(),
                            new AddData<Assunto>({data: [response], schema: assuntoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'assunto',
                                content: `Assunto id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AssuntoActions.SaveAssuntoFailed(err));
                        })
                    ))
            );

    /**
     * Save Assunto Success
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    saveAssuntoSuccess: any =
        this._actions
            .pipe(
                ofType<AssuntoActions.SaveAssuntoSuccess>(AssuntoActions.SAVE_ASSUNTO_SUCCESS),
                withLatestFrom(this._store.pipe(select(getAssuntosPagination))),
                tap(([action, pagination]) => {
                    this._store.dispatch(new AssuntoActions.GetAssuntos(pagination));
                }),
            );

}
