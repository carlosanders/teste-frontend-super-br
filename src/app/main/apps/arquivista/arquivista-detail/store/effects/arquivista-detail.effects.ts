import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProcessoService} from '../../../../../../../@cdk/services/processo.service';
import {VinculacaoEtiquetaService} from '../../../../../../../@cdk/services/vinculacao-etiqueta.service';
import {select, Store} from '@ngrx/store';
import * as ArquivistaDetailActions from '../actions/arquivista-detail.actions';

import {getRouterState, State} from 'app/store/reducers';
import {Router} from '@angular/router';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {AddData} from '../../../../../../../@cdk/ngrx-normalizr';
import {Processo} from '../../../../../../../@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';

@Injectable()
export class ArquivistaDetailEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Tarefa with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcesso: any =
        this._actions
            .pipe(
                ofType<ArquivistaDetailActions.GetProcesso>(ArquivistaDetailActions.GET_PROCESSO),
                switchMap((action) => {
                    return this._processoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'processo',
                            'processo.especieProcesso',
                            'processo.modalidadeMeio',
                            'processo.documentoAvulsoOrigem',
                            'especieTarefa',
                            'usuarioResponsavel',
                            'setorResponsavel',
                            'setorResponsavel.unidade',
                            'setorOrigem',
                            'setorOrigem.unidade',
                            'especieTarefa.generoTarefa',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta']));
                }),
                mergeMap(response => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new ArquivistaDetailActions.GetProcessoSuccess({
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        processo: response['entities'][0]
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ArquivistaDetailActions.GetProcessoFailed(err));
                    return caught;
                })
            );


}
