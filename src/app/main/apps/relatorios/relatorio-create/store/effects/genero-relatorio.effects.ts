import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {GeneroRelatorio} from '@cdk/models/genero-relatorio.model';
import {GeneroRelatorioService} from '@cdk/services/genero-relatorio.service';
import {generoRelatorio as generoRelatorioSchema} from '@cdk/normalizr/genero-relatorio.schema';
import * as GeneroRelatoriosActions from '../actions';
import {Router} from '@angular/router';

@Injectable()
export class GeneroRelatoriosEffects {
    routerState: any;
    generoRelatorios: GeneroRelatorio[];

    constructor(
        private _actions: Actions,
        private _generoRelatorioService: GeneroRelatorioService,
        private _router: Router,
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
     * Get GeneroRelatorios with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getGeneroRelatorios: any =
        this._actions
            .pipe(
                ofType<GeneroRelatoriosActions.GetGeneroRelatorios>(GeneroRelatoriosActions.GET_GENERO_RELATORIOS),
                switchMap(() => {
                    return this._generoRelatorioService.query(
                        JSON.stringify({}),
                        100,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                mergeMap(response => [
                    new AddData<GeneroRelatorio>({data: response['entities'], schema: generoRelatorioSchema}),
                    new GeneroRelatoriosActions.GetGeneroRelatoriosSuccess({
                        entitiesId: response['entities'].map(generoRelatorio => generoRelatorio.id),
                    }),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new GeneroRelatoriosActions.GetGeneroRelatoriosFailed(err));
                    return caught;
                })
            );
}
