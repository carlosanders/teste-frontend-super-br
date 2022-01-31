import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as ComponentesDigitaisActions from '../actions';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {DocumentoService} from '@cdk/services/documento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class ComponentesDigitaisEffects {
    routerState: any;
    componenteDigitalId: number;
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
                    loteId: action.payload.loteId
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
            lote: action.payload.loteId
        }))),
        switchMap(action => this._componenteDigitalService.save(action.payload.componenteDigital).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'componente digital',
                content: `Componente digital id ${response.id} criado com sucesso!`,
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: ComponenteDigital) => [
                new ComponenteDigitalActions.SaveComponenteDigitalSuccess({
                    componenteDigital: response,
                    tarefaId: action.payload.componenteDigital.tarefaOrigem.id
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
