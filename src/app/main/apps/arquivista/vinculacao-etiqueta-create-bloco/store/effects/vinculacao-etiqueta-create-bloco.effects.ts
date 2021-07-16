import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as VinculacaoEtiquetaCreateBlocoActions from '../actions/vinculacao-etiqueta-create-bloco.actions';

import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {AddChildData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema, vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr';
import {VinculacaoEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from '@cdk/utils';
import {ChangeSelectedProcessos, getSelectedProcessoIds} from '../../../arquivista-list/store';

@Injectable()
export class VinculacaoEtiquetaCreateBlocoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    /**
     * Save Etiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveEtiqueta: any =
        this._actions
            .pipe(
                ofType<VinculacaoEtiquetaCreateBlocoActions.SaveVinculacaoEtiqueta>(VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação da etiqueta',
                    content: 'Salvando a vinculação da etiqueta ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._vinculacaoEtiquetaService.save(action.payload.vinculacaoEtiqueta).pipe(
                        tap((response) => {
                            response.processo = null;
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculação da etiqueta',
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
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculacaoEtiqueta',
                                content: 'Erro ao salvar a vinculacaoEtiqueta!',
                                status: 2, // erro
                            }));
                            return of(new VinculacaoEtiquetaCreateBlocoActions.SaveVinculacaoEtiquetaFailed(err));
                        })
                    )
                })
            );

    @Effect({dispatch: false})
    saveProcessoSuccess: any =
        this._actions.
        pipe(
            ofType<VinculacaoEtiquetaCreateBlocoActions.SaveVinculacaoEtiquetaSuccess>(VinculacaoEtiquetaCreateBlocoActions.SAVE_VINCULACAO_ETIQUETA_SUCCESS),
            withLatestFrom(this._store.pipe(select(getSelectedProcessoIds))),
            tap(([action, selectedIds]) => {
                const newSelectedProcessos = selectedIds.filter(id => id !== action.payload.vinculacaoEtiqueta.processo.id);
                this._store.dispatch(new ChangeSelectedProcessos(newSelectedProcessos, false));
            })
        );

}
