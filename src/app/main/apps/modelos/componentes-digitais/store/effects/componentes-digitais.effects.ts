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
import * as ModeloComponenteDigitalActions from "../../../modelo/store/actions/componentes-digitais.actions";
import * as TarefasActions from "../../../../tarefas/store/actions/tarefas.actions";

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
                new ComponenteDigitalActions.SaveComponenteDigitalSuccess({
                    componenteDigital: response,
                    tarefaId: action.payload.componenteDigital.tarefaOrigem.id
                }),
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
                const payload = {
                    id: action.payload.componenteDigital.tarefaOrigem.id,
                    error: err
                };
                return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(payload));
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
            JSON.stringify([
                'processoOrigem',
                'tarefaOrigem'
            ]),
            JSON.stringify({'incluiVinculacaoDocumentoPrincipal': true})
        )),
        switchMap(response => [
            new AddData<Documento>({
                data: response['entities'],
                schema: documentoSchema,
                populate: [
                    'processoOrigem',
                    'tarefaOrigem'
                ]
            }),
            new ComponenteDigitalActions.GetDocumentoSuccess({
                documentoId: response['entities'][0].id,
                documento: response['entities'][0],
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
    /**
     * getDocumentoSuccess
     *
     * @type {Observable<any>}
     */
    getDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ComponenteDigitalActions.GetDocumentoSuccess>(ComponenteDigitalActions.GET_DOCUMENTO_SUCCESS),
        tap((action) => {
            let stepHandle = this.routerState.params['stepHandle'];
            let primary: string;
            primary = 'componente-digital/';
            const componenteDigitalId = action.payload.componenteDigitalId;

            primary += componenteDigitalId;
            const tarefaId = action.payload.documento.estaVinculada ?
                action.payload.documento.vinculacaoDocumentoPrincipal.documento.tarefaOrigem.id :
                action.payload.documento.tarefaOrigem.id;
            const processoId = action.payload.documento.processoOrigem.id;
            if (!stepHandle || processoId !== parseInt(this.routerState.params['processoHandle'], 10)) {
                stepHandle = 'latest';
            }
            this._router.navigate([
                    'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
                    + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/processo/' + processoId + '/visualizar/'
                    + stepHandle + '/documento/' + action.payload.documento.id,
                    {
                        outlets: {
                            primary: primary
                        }
                    }
                ],
                {
                    relativeTo: this._activatedRoute.parent
                }).then();
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
