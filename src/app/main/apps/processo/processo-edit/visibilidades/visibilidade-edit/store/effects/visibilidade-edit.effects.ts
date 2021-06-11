import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as VisibilidadeEditActions from '../actions/visibilidade-edit.actions';
import * as VisibilidadeListActions from '../../../visibilidade-list/store/actions/visibilidade-list.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import {Visibilidade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class VisibilidadeEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
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
     * Save Visibilidade
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveVisibilidade: any =
        this._actions
            .pipe(
                ofType<VisibilidadeEditActions.SaveVisibilidade>(VisibilidadeEditActions.SAVE_VISIBILIDADE),
                switchMap(action => this._processoService.createVisibilidade(action.payload.processoId, action.payload.visibilidade).pipe(
                        mergeMap((response: Visibilidade) => [
                            new VisibilidadeEditActions.SaveVisibilidadeSuccess(),
                            new VisibilidadeListActions.ReloadVisibilidades(),
                            new AddData<Visibilidade>({data: [response], schema: visibilidadeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'visibilidade',
                                content: `Visibilidade id ${response.id} criada com sucesso!`,
                                dateTime: moment()
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new VisibilidadeEditActions.SaveVisibilidadeFailed(err));
                        })
                    ))
            );
    /**
     * Save Visibilidade Success
     */
    @Effect({dispatch: false})
    saveVisibilidadeSuccess: any =
        this._actions
            .pipe(
                ofType<VisibilidadeEditActions.SaveVisibilidadeSuccess>(VisibilidadeEditActions.SAVE_VISIBILIDADE_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.visibilidadeHandle), 'listar')]).then();
                })
            );
}
