import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../store';
import {Router} from '@angular/router';
import * as ModalidadeTransicaoActions from '../actions/modalidade-desarquivamento.actions';
import {catchError, filter, switchMap} from 'rxjs/operators';
import {AddData} from '@cdk/ngrx-normalizr';
import {ModalidadeTransicao} from '@cdk/models';
import {modalidadeTransicao as modalidadeTransicaoSchema} from '@cdk/normalizr';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';

@Injectable()
export class ModalidadeDesarquivamentoEffects {
    routerState: any;
    /**
     * Get Modalidade Transicao
     *
     * @type {any}
     */
    getModalidadeTransicao: any = createEffect(() => this._actions.pipe(
        ofType<ModalidadeTransicaoActions.GetModalidadeTransicao>(ModalidadeTransicaoActions.GET_MODALIDADE_TRANSICAO),
        switchMap(action => this._modalidadeTransicaoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        switchMap(response => [
            new ModalidadeTransicaoActions.GetModalidadeTransicaoSuccess({
                modalidadeTransicaoId: response['entities'][0].id,
                loaded: {
                    id: 'typeHandle',
                    value: this.routerState.params.typeHandle
                }
            }),
            new AddData<ModalidadeTransicao>({data: [response['entities'][0]], schema: modalidadeTransicaoSchema}),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ModalidadeTransicaoActions.GetModalidadeTransicaoFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _modalidadeTransicaoService: ModalidadeTransicaoService,
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
