import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RelacionamentoEditActions from '../actions/relacionamento-edit.actions';
import * as RelacionamentoListActions from '../../../relacionamento-list/store/actions/relacionamento-list.actions';

import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {relacionamentoPessoal as relacionamentoSchema} from '@cdk/normalizr';
import {RelacionamentoPessoal} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RelacionamentoEditEffect {
    routerState: any;
    /**
     * Get Relacionamento with router parameters
     *
     * @type {Observable<any>}
     */
    getRelacionamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelacionamentoEditActions.GetRelacionamento>(RelacionamentoEditActions.GET_RELACIONAMENTO),
        switchMap(action => this._relacionamentoPessoalService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<RelacionamentoPessoal>({data: response['entities'], schema: relacionamentoSchema}),
            new RelacionamentoEditActions.GetRelacionamentoSuccess({
                loaded: {
                    id: 'relacionamentoHandle',
                    value: this.routerState.params.relacionamentoHandle
                },
                relacionamentoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RelacionamentoEditActions.GetRelacionamentoFailed(err));
        })
    ));
    /**
     * Save Relacionamento
     *
     * @type {Observable<any>}
     */
    saveRelacionamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelacionamentoEditActions.SaveRelacionamento>(RelacionamentoEditActions.SAVE_RELACIONAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'relacionamento',
            content: 'Salvando o relacionamento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._relacionamentoPessoalService.save(action.payload.relacionamento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'relacionamento',
                content: 'Relacionamento id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: RelacionamentoPessoal) => [
                new RelacionamentoEditActions.SaveRelacionamentoSuccess(),
                new RelacionamentoListActions.ReloadRelacionamentos(),
                new AddData<RelacionamentoPessoal>({data: [response], schema: relacionamentoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relacionamento',
                    content: 'Erro ao salvar o relacionamento!',
                    status: 2, // erro
                }));
                return of(new RelacionamentoEditActions.SaveRelacionamentoFailed(err));
            })
        ))
    ));
    /**
     * Save Relacionamento Success
     */
    saveRelacionamentoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelacionamentoEditActions.SaveRelacionamentoSuccess>(RelacionamentoEditActions.SAVE_RELACIONAMENTO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.relacionamentoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _relacionamentoPessoalService: RelacionamentoPessoalService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
