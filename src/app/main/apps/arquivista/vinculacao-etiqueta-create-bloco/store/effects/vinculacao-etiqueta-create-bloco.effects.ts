import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

import * as VinculacaoEtiquetaCreateBlocoActions from '../actions/vinculacao-etiqueta-create-bloco.actions';

import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {AddChildData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema, vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr';
import {VinculacaoEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ChangeSelectedProcessos, getSelectedProcessoIds} from '../../../arquivista-list/store';

@Injectable()
export class VinculacaoEtiquetaCreateBlocoEffect {
    routerState: any;
    /**
     * Save Etiqueta
     *
     * @type {Observable<any>}
     */
    saveEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoEtiquetaCreateBlocoActions.SaveVinculacaoEtiqueta>(VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação etiqueta',
            content: 'Salvando a vinculação da etiqueta ...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._vinculacaoEtiquetaService.save(action.payload.vinculacaoEtiqueta).pipe(
            tap((response) => {
                response.processo = null;
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação etiqueta',
                    content: `Processo id ${action.payload.vinculacaoEtiqueta.processo.id} etiquetado com sucesso!`,
                    status: 1, // sucesso
                    success: true,
                    lote: action.payload.loteId,
                    redo: 'inherent'
                }));
            }),
            mergeMap((response: VinculacaoEtiqueta) => [
                new VinculacaoEtiquetaCreateBlocoActions.SaveVinculacaoEtiquetaSuccess(action.payload),
                new AddChildData<VinculacaoEtiqueta>({
                    data: [response],
                    childSchema: vinculacaoEtiquetaSchema,
                    parentSchema: processoSchema,
                    parentId: action.payload.vinculacaoEtiqueta.processo.id
                }),
            ]),
            catchError((err) => {
                const payload = {
                    processoId: action.payload.vinculacaoEtiqueta.processo.id,
                    errors: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação etiqueta',
                    content: 'Erro ao salvar a vinculação de etiqueta!',
                    status: 2, // erro
                }));
                return of(new VinculacaoEtiquetaCreateBlocoActions.SaveVinculacaoEtiquetaFailed(payload));
            })
        ))
    ));
    /**
     * Save Processo Success
     *
     * @type {Observable<any>}
     */
    saveProcessoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoEtiquetaCreateBlocoActions.SaveVinculacaoEtiquetaSuccess>(VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_SUCCESS),
        withLatestFrom(this._store.pipe(select(getSelectedProcessoIds))),
        tap(([action, selectedIds]) => {
            const newSelectedProcessos = selectedIds.filter(id => id !== action.payload.vinculacaoEtiqueta.processo.id);
            this._store.dispatch(new ChangeSelectedProcessos(newSelectedProcessos, false));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
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
