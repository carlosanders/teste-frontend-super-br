import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';
import {ComponenteDigital, Documento} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {GetDocumentos} from '../../../../../tarefas/tarefa-detail/atividades/atividade-create/store';

@Injectable()
export class ComponenteDigitalEffects {
    routerState: any;
    componenteDigitalId: number;
    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    createComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Save ComponenteDigital
     *
     * @type {Observable<any>}
     */
    saveComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Salvando o componente digital ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._componenteDigitalService.patch(action.payload.componenteDigital, action.payload.changes).pipe(
            tap((response) => {
                this._store.dispatch(new GetDocumentos());
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Componente digital id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }));
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
                new AddData<ComponenteDigital>({data: [response], schema: componenteDigitalSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Erro ao salvar o componente digital!',
                    status: 2, // erro
                }));
                return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
            })
        ))
    ));
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumento: Observable<any> = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.GetDocumentoFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
