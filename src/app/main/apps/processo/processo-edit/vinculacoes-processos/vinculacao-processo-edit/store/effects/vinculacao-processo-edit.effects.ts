import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as VinculacaoProcessoEditActions from '../actions/vinculacao-processo-edit.actions';
import * as VinculacaoProcessoListActions
    from '../../../vinculacao-processo-list/store/actions/vinculacao-processo-list.actions';

import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';
import {VinculacaoProcesso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class VinculacaoProcessoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoProcessoService: VinculacaoProcessoService,
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
     * Get VinculacaoProcesso with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacaoProcesso: any =
        this._actions
            .pipe(
                ofType<VinculacaoProcessoEditActions.GetVinculacaoProcesso>(VinculacaoProcessoEditActions.GET_VINCULACAO_PROCESSO),
                switchMap(action => this._vinculacaoProcessoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<VinculacaoProcesso>({data: response['entities'], schema: vinculacaoProcessoSchema}),
                    new VinculacaoProcessoEditActions.GetVinculacaoProcessoSuccess({
                        loaded: {
                            id: 'vinculacaoProcessoHandle',
                            value: this.routerState.params.vinculacaoProcessoHandle
                        },
                        vinculacaoProcessoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VinculacaoProcessoEditActions.GetVinculacaoProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoProcesso
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveVinculacaoProcesso: any =
        this._actions
            .pipe(
                ofType<VinculacaoProcessoEditActions.SaveVinculacaoProcesso>(VinculacaoProcessoEditActions.SAVE_VINCULACAO_PROCESSO),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação processo',
                    content: 'Salvando a vinculação processo ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._vinculacaoProcessoService.save(action.payload.vinculacaoProcesso).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculação processo',
                                content: 'Vinculação processo id ' + response.id + ' salva com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: VinculacaoProcesso) => [
                            new VinculacaoProcessoEditActions.SaveVinculacaoProcessoSuccess(),
                            new VinculacaoProcessoListActions.ReloadVinculacoesProcessos(),
                            new AddData<VinculacaoProcesso>({data: [response], schema: vinculacaoProcessoSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculação processo',
                                content: 'Erro ao salvar a vinculação processo!',
                                status: 2, // erro
                            }));
                            return of(new VinculacaoProcessoEditActions.SaveVinculacaoProcessoFailed(err));
                        })
                    )
                })
            );

    /**
     * Save VinculacaoProcesso Success
     */
    @Effect({dispatch: false})
    saveVinculacaoProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<VinculacaoProcessoEditActions.SaveVinculacaoProcessoSuccess>(VinculacaoProcessoEditActions.SAVE_VINCULACAO_PROCESSO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.vinculacaoProcessoHandle), 'listar')]).then();
                })
            );
}
