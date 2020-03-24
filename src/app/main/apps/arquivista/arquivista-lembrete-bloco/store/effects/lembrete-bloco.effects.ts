import {Actions, Effect, ofType} from '@ngrx/effects';
import {LembreteService} from '../../../../../../../@cdk/services/lembrete.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../store/reducers';
import {Router} from '@angular/router';
import * as LembreteActions from '../actions/lembrete-bloco.actions';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {AddChildData} from '@cdk/ngrx-normalizr';
import {Lembrete} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr/lembrete.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import * as moment from 'moment';

@Injectable()
export class LembreteBlocoEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _lembreteService: LembreteService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this.initRouterState();
    }

    /**
     * Save Lembrete
     * @type {Observable<any>}
     */
    @Effect()
    saveLembreteBloco: any =
        this._actions
            .pipe(
                ofType<LembreteActions.SaveLembreteBloco>(LembreteActions.SAVE_LEMBRETE_BLOCO),
                switchMap((action) => {
                    return this._lembreteService.save(action.payload).pipe(
                        mergeMap((response: Lembrete) => [
                            new LembreteActions.SaveLembreteBlocoSuccess(action.payload),
                            new AddChildData<Lembrete>({
                                data: [{...action.payload, ... response}],
                                childSchema: lembreteSchema,
                                parentId: action.payload.processo.id,
                                parentSchema: processoSchema
                            }),
                            new OperacoesActions.Resultado({
                                type: 'lembrete',
                                content: `Lembrete em bloco criado com sucesso!`,
                                dateTime: response.criadoEm,
                                success: true
                            })
                        ]),
                        catchError((err) => {
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'lembrete',
                                content: `Houve ao adicionar lembrete ao processo id ${action.payload.processo.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new LembreteActions.SaveLembreteBlocoFailed(err));
                        })
                    );
                })
            );


    initRouterState(): void{
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }
}
