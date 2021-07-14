import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AcaoEditActions from '../actions/acao-edit.actions';
import * as AcaoListActions from '../../../acao-list/store/actions/acao-list.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {acao as acaoSchema} from '@cdk/normalizr';
import {Acao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';
import {AcaoService} from '@cdk/services/acao.service';

@Injectable()
export class AcaoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _acaoService: AcaoService,
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
     * Save Acao
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveAcao: any =
        this._actions
            .pipe(
                ofType<AcaoEditActions.SaveAcao>(AcaoEditActions.SAVE_ACAO),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'ação',
                    content: 'Salvando a ação ...',
                    status: 0, // carregando
                }))),
                switchMap(action => this._acaoService.save(action.payload.acao).pipe(
                    tap((response) =>
                        this._store.dispatch(new OperacoesActions.Operacao({
                            id: action.payload.operacaoId,
                            type: 'ação',
                            content: 'Ação id ' + response.id + ' salvo com sucesso.',
                            status: 1, // sucesso
                        }))
                    ),
                    mergeMap((response: Acao) => [
                        new AcaoEditActions.SaveAcaoSuccess(),
                        new AcaoListActions.ReloadAcoes(),
                        new AddData<Acao>({data: [response], schema: acaoSchema})
                    ]),
                    catchError((err) => {
                        console.log(err);
                        this._store.dispatch(new OperacoesActions.Operacao({
                            id: action.payload.operacaoId,
                            type: 'ação',
                            content: 'Erro ao salvar a ação!',
                            status: 2, // erro
                        }));
                        return of(new AcaoEditActions.SaveAcaoFailed(err));
                    })
                ))
            );

    /**
     * Save Acao Success
     */
    @Effect({dispatch: false})
    saveAcaoSuccess: any =
        this._actions
            .pipe(
                ofType<AcaoEditActions.SaveAcaoSuccess>(AcaoEditActions.SAVE_ACAO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.acaoHandle), 'listar')]).then();
                })
            );
}
