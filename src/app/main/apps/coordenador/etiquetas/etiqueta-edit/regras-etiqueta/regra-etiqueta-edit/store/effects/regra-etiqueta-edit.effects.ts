import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RegraEtiquetaEditActions from '../actions/regra-etiqueta-edit.actions';
import * as RegraEtiquetaListActions from '../../../regra-etiqueta-list/store/actions/regra-etiqueta-list.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {regraEtiqueta as regraEtiquetaSchema} from '@cdk/normalizr';
import {RegraEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';

@Injectable()
export class RegraEtiquetaEditEffect {
    routerState: any;
    /**
     * Save RegraEtiqueta
     *
     * @type {Observable<any>}
     */
    saveRegra: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RegraEtiquetaEditActions.SaveRegraEtiqueta>(RegraEtiquetaEditActions.SAVE_REGRA_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'regra de etiqueta',
            content: 'Salvando a regra de etiqueta ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._regraEtiquetaService.save(action.payload.regraEtiqueta).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'regra de etiqueta',
                content: 'Regra de etiqueta id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: RegraEtiqueta) => [
                new RegraEtiquetaEditActions.SaveRegraEtiquetaSuccess(),
                new RegraEtiquetaListActions.ReloadRegrasEtiqueta(),
                new AddData<RegraEtiqueta>({data: [response], schema: regraEtiquetaSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'regra de etiqueta',
                    content: 'Erro ao salvar a regra de etiqueta!',
                    status: 2, // erro
                }));
                return of(new RegraEtiquetaEditActions.SaveRegraEtiquetaFailed(err));
            })
        ))
    ));
    /**
     * Save RegraEtiqueta Success
     */
    saveRegraEtiquetaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RegraEtiquetaEditActions.SaveRegraEtiquetaSuccess>(RegraEtiquetaEditActions.SAVE_REGRA_ETIQUETA_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.regraEtiquetaHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _regraEtiquetaService: RegraEtiquetaService,
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
