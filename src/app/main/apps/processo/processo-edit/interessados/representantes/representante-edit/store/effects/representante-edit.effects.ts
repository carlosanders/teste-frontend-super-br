import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RepresentanteEditActions
    from '../actions/representante-edit.actions';
import * as RepresentanteListActions
    from '../../../representante-list/store/actions/representante-list.actions';

import {RepresentanteService} from '@cdk/services/representante.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {representante as representanteSchema} from '@cdk/normalizr';
import {Representante} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RepresentanteEditEffect {
    routerState: any;

    /**
     * Get Representante with router parameters
     *
     * @type {Observable<any>}
     */
    getRepresentante: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RepresentanteEditActions.GetRepresentante>(RepresentanteEditActions.GET_REPRESENTANTE),
        switchMap(action => this._representanteService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Representante>({data: response['entities'], schema: representanteSchema}),
            new RepresentanteEditActions.GetRepresentanteSuccess({
                loaded: {
                    id: 'representanteHandle',
                    value: this.routerState.params.representanteHandle
                },
                representanteId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RepresentanteEditActions.GetRepresentanteFailed(err));
        })
    ));
    /**
     * Save Representante
     *
     * @type {Observable<any>}
     */
    saveRepresentante: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RepresentanteEditActions.SaveRepresentante>(RepresentanteEditActions.SAVE_REPRESENTANTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'representante',
            content: 'Salvando o representante ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._representanteService.save(action.payload.representante).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'representante',
                content: 'Representante id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Representante) => [
                new RepresentanteEditActions.SaveRepresentanteSuccess(),
                new RepresentanteListActions.ReloadRepresentantes(),
                new AddData<Representante>({data: [response], schema: representanteSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'representante',
                    content: 'Erro ao salvar o representante!',
                    status: 2, // erro
                }));
                return of(new RepresentanteEditActions.SaveRepresentanteFailed(err));
            })
        ))
    ));
    /**
     * Save Representante Success
     */
    saveRepresentanteSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RepresentanteEditActions.SaveRepresentanteSuccess>(RepresentanteEditActions.SAVE_REPRESENTANTE_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.representanteHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _representanteService: RepresentanteService,
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
