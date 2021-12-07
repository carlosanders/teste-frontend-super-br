import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as ComponentesDigitaisActions from '../actions';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Documento} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';
import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';
import * as OperacoesActions from '../../../../../../store/actions/operacoes.actions';
import {GetDocumentos} from '../../../../tarefas/tarefa-detail/atividades/atividade-create/store';
import {DocumentoService} from '../../../../../../../@cdk/services/documento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class ComponentesDigitaisEffect {
    routerState: any;
    componenteDigitalId: number;
    routeAtividadeTarefa: string;
    routeAtividadeDocumento: string;
    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    createComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.CreateComponenteDigital>(ComponenteDigitalActions.CREATE_COMPONENTE_DIGITAL),
        map((action) => {

            const componenteDigital = new ComponenteDigital();
            componenteDigital.componenteDigitalOrigem = action.payload.componenteDigitalOrigem;
            componenteDigital.tarefaOrigem = action.payload.tarefaOrigem;
            componenteDigital.fileName = 'CLONE.html';

            return new ComponenteDigitalActions.SaveComponenteDigital(
                {
                    componenteDigital: componenteDigital,
                    operacaoId: action.payload.operacaoId,
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
    saveComponenteDigital: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Salvando componente digital ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._componenteDigitalService.save(action.payload.componenteDigital).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'componente digital',
                content: `Componente digital id ${response.id} criado com sucesso!`,
                status: 1, // sucesso
            }))),
            tap(() => {
                this._store.dispatch(new GetDocumentos());
            }),
            mergeMap((response: ComponenteDigital) => [
                new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                new ComponenteDigitalActions.GetDocumento({
                    componenteDigitalId: response.id,
                    routeTarefa: action.payload.routeTarefa,
                    routeDocumento: action.payload.routeDocumento
                }),
                new AddData<ComponenteDigital>({
                    data: [{...action.payload.componenteDigital, ...response}],
                    schema: componenteDigitalSchema
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
            })
        ))
    ));
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumento: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.GetDocumento>(ComponenteDigitalActions.GET_DOCUMENTO),
        tap((action) => {
            this.componenteDigitalId = action.payload.componenteDigitalId;
            this.routeAtividadeTarefa = action.payload.routeTarefa;
            this.routeAtividadeDocumento = action.payload.routeDocumento;
        }),
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
                routeTarefa: this.routeAtividadeTarefa,
                routeDocumento: this.routeAtividadeDocumento
            }),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ComponenteDigitalActions.GetDocumentoFailed(err));
        })
    ));
    getDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.GetDocumentoSuccess>(ComponenteDigitalActions.GET_DOCUMENTO_SUCCESS),
        tap((action) => {
            const primary = 'componente-digital/' + action.payload.componenteDigitalId;
            const sidebar = 'editar/' + action.payload.routeDocumento;

            if (this.routerState.url.indexOf('processo') !== -1) {
                this._router.navigate([
                        this.routerState.url.split('processo/')[0] + 'processo/' + this.routerState.params.processoHandle
                        + '/visualizar/' + this.routerState.params.stepHandle + '/documento/' + action.payload.documentoId,
                        {
                            outlets: {
                                primary: primary,
                                sidebar: sidebar
                            }
                        }
                    ],
                    {
                        relativeTo: this._activatedRoute.parent
                    }).then();
            } else {
                this._router.navigate([
                        this.routerState.url.replace('modelo', action.payload.routeTarefa + '/documento') + '/' + action.payload.documentoId,
                        {
                            outlets: {
                                primary: primary,
                                sidebar: sidebar
                            }
                        }
                    ],
                    {
                        relativeTo: this._activatedRoute.parent
                    }).then();
            }
        })
    ), {dispatch: false});
    /**
     * Get ComponentesDigitais with router parameters
     *
     * @type {Observable<any>}
     */
    getComponentesDigitais: any = createEffect(() => this._actions.pipe(
        ofType<ComponentesDigitaisActions.GetComponentesDigitais>(ComponentesDigitaisActions.GET_COMPONENTES_DIGITAIS),
        switchMap(action => this._componenteDigitalService.search(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
            new ComponentesDigitaisActions.GetComponentesDigitaisSuccess({
                entitiesId: response['entities'].map(componenteDigital => componenteDigital.id),
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ComponentesDigitaisActions.GetComponentesDigitaisFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _sanitizer: DomSanitizer,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
