import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import * as AcompanhamentoListActions from '../actions';
import {AddChildData} from '@cdk/ngrx-normalizr';
import {VinculacaoEtiqueta} from '@cdk/models';
import {vinculacaoEtiqueta as vinculacaoEtiquetaSchema, processo as processoSchema} from '@cdk/normalizr';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';

@Injectable()
export class EtiquetasEffect {
    getEtiquetas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AcompanhamentoListActions.GetEtiquetasProcesso>(AcompanhamentoListActions.GET_ETIQUETAS_PROCESSO),
        mergeMap(action => this._vinculacaoEtiquetaService.query(
                    JSON.stringify({
                        'processo.id': 'eq:' + action.payload,
                    }),
                    25,
                    0,
                    JSON.stringify({}),
                    JSON.stringify(['etiqueta'])).pipe(
                    mergeMap(response => [
                        new AcompanhamentoListActions.GetEtiquetasProcessoSuccess(response),
                        new AddChildData<VinculacaoEtiqueta>({
                            data: response['entities'],
                            childSchema: vinculacaoEtiquetaSchema,
                            parentSchema: processoSchema,
                            parentId: action.payload
                        })
                    ])
                ), 25),
                catchError((err) => {
                    console.log(err);
                    return of(new AcompanhamentoListActions.GetEtiquetasProcessoFailed(err));
                })
    ));

    constructor(
        private _actions: Actions,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService
    ) {
    }
}
