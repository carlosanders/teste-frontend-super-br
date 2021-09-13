import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as InteressadoEditActions
    from 'app/main/apps/processo/processo-edit/interessados/interessado-edit/store/actions/interessado-edit.actions';
import * as InteressadoListActions
    from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/actions/interessado-list.actions';

import {InteressadoService} from '@cdk/services/interessado.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {interessado as interessadoSchema} from '@cdk/normalizr';
import {Interessado} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class InteressadoEditEffect {
    routerState: any;
    /**
     * Get Interessado with router parameters
     *
     * @type {Observable<any>}
     */
    getInteressado: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<InteressadoEditActions.GetInteressado>(InteressadoEditActions.GET_INTERESSADO),
        switchMap(action => this._interessadoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
            new InteressadoEditActions.GetInteressadoSuccess({
                loaded: {
                    id: 'interessadoHandle',
                    value: this.routerState.params.interessadoHandle
                },
                interessadoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new InteressadoEditActions.GetInteressadoFailed(err));
        })
    ));
    /**
     * Save Interessado
     *
     * @type {Observable<any>}
     */
    saveInteressado: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<InteressadoEditActions.SaveInteressado>(InteressadoEditActions.SAVE_INTERESSADO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'interessado',
            content: 'Salvando o interessado ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._interessadoService.save(action.payload.interessado).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'interessado',
                content: 'Interessado id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Interessado) => [
                new InteressadoEditActions.SaveInteressadoSuccess(),
                new InteressadoListActions.ReloadInteressados(),
                new AddData<Interessado>({data: [response], schema: interessadoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'interessado',
                    content: 'Erro ao salvar o interessado!',
                    status: 2, // erro
                }));
                return of(new InteressadoEditActions.SaveInteressadoFailed(err));
            })
        ))
    ));
    /**
     * Save Interessado Success
     */
    saveInteressadoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<InteressadoEditActions.SaveInteressadoSuccess>(InteressadoEditActions.SAVE_INTERESSADO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.interessadoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _interessadoService: InteressadoService,
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
