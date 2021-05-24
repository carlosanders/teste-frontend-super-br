import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap, map} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {ComponenteDigital} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {GetDocumentos} from '../../../../../tarefas/tarefa-detail/atividades/atividade-create/store/actions';

@Injectable()
export class ComponenteDigitalEffects {
    routerState: any;
    componenteDigitalId: number;

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    createComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.CreateComponenteDigital>(ComponenteDigitalActions.CREATE_COMPONENTE_DIGITAL),
                map((action) => {

                    const componenteDigital = new ComponenteDigital();
                    componenteDigital.modelo = action.payload.modelo;
                    componenteDigital.tarefaOrigem = action.payload.tarefaOrigem;
                    componenteDigital.fileName = action.payload.modelo.nome + '.html';

                    return new ComponenteDigitalActions.SaveComponenteDigital(
                        {
                            componenteDigital: componenteDigital,
                            routeTarefa: action.payload.routeAtividadeTarefa,
                            routeDocumento: action.payload.routeAtividadeDocumento
                        }
                    );
                }),
            );

    /**
     * Save ComponenteDigital
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
                switchMap(action => this._componenteDigitalService.patch(action.payload.componenteDigital, action.payload.changes).pipe(
                        tap((response) => {
                            this._store.dispatch(new GetDocumentos());
                        }),
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                            new ComponenteDigitalActions.GetDocumento({
                                componenteDigitalId: response.id,
                            }),
                            new UpdateData<ComponenteDigital>({
                                    id: response.id,
                                    schema: componenteDigitalSchema,
                                    changes: {modelo: response.modelo, conteudo: response.conteudo}
                                }
                            ),
                            new OperacoesActions.Resultado({
                                type: 'componenteDigital',
                                content: `Componente Digital id ${response.id} atualizado com sucesso!`,
                                dateTime: response.atualizadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
                        })
                    ))
            );


    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumento: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.GetDocumento>(ComponenteDigitalActions.GET_DOCUMENTO),
                tap((action) => {
                        this.componenteDigitalId = action.payload.componenteDigitalId;
                        this._componenteDigitalService.alterandoModelo.next(true);
                    }
                ),
                switchMap(action => this._documentoService.query(
                        `{"componentesDigitais.id": "eq:${action.payload.componenteDigitalId}"}`,
                        1,
                        0,
                        '{}',
                        '[]')),
                switchMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new ComponenteDigitalActions.GetDocumentoSuccess({
                        documentoId: response['entities'][0].id,
                        componenteDigitalId: this.componenteDigitalId,
                    }),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ComponenteDigitalActions.GetDocumentoFailed(err));
                    return caught;
                })
            );
}
