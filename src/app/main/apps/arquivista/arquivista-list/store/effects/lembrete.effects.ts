import {Actions, Effect, ofType} from '@ngrx/effects';
import {LembreteService} from '@cdk/services/lembrete.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../store/reducers';
import {Router} from '@angular/router';
import * as LembreteActions from '../actions/lembrete.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AddData} from '@cdk/ngrx-normalizr';
import {Lembrete} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr/lembrete.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromStore from '../index';

@Injectable()
export class LembreteEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _lembreteService: LembreteService,
        private _store: Store<State>,
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
     * Save Lembrete
     * @type {Observable<any>}
     */
    @Effect()
    saveLembrete: any =
        this._actions
            .pipe(
                ofType<LembreteActions.SaveLembrete>(LembreteActions.SAVE_LEMBRETE),
                switchMap((action) => {
                    return this._lembreteService.save(action.payload).pipe(
                        mergeMap((response: Lembrete) => [
                            new LembreteActions.SaveLembreteSuccess(),
                            new AddData<Lembrete>({data: [response], schema: lembreteSchema}),
                            new OperacoesActions.Resultado({
                                type: 'lembrete',
                                content: `Lembrete id ${response.id} criado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new LembreteActions.SaveLembreteFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Lembrete Success
     */
    @Effect({dispatch: false})
    saveLembreteSuccess: any =
        this._actions
            .pipe(
                ofType<LembreteActions.SaveLembreteSuccess>(LembreteActions.SAVE_LEMBRETE_SUCCESS),
                tap(() => {

                })
            );
}
