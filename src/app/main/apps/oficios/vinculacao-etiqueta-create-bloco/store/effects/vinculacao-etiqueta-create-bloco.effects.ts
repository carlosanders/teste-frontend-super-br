import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import * as VinculacaoEtiquetaCreateBlocoActions from '../actions/vinculacao-etiqueta-create-bloco.actions';

import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {AddChildData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema, vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr';
import {VinculacaoEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

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
                mergeMap(action => this._vinculacaoEtiquetaService.save(action.payload).pipe(
                        mergeMap((response: VinculacaoEtiqueta) => [
                            new VinculacaoEtiquetaCreateBlocoActions.SaveVinculacaoEtiquetaSuccess(action.payload),
                            new AddChildData<VinculacaoEtiqueta>({
                                data: [{...action.payload, ...response}],
                                childSchema: vinculacaoEtiquetaSchema,
                                parentSchema: documentoAvulsoSchema,
                                parentId: action.payload.documentoAvulso.id
                            }),
                            new OperacoesActions.Resultado({
                                type: 'vinculacao_etiqueta',
                                content: `Etiqueta na ofício id ${action.payload.documentoAvulso.id} criada com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'vinculacao_etiqueta',
                                content: `Houve erro no etiqueta na ofício id ${action.payload.documentoAvulso.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new VinculacaoEtiquetaCreateBlocoActions.SaveVinculacaoEtiquetaFailed(action.payload));
                        })
                    ), 25)
            );

}
