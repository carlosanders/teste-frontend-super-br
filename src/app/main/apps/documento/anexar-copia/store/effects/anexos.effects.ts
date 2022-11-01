import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

import * as AnexosActions from '../actions/anexos.actions';
import * as fromStore from '../';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DocumentoService} from '@cdk/services/documento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {AddData} from '@cdk/ngrx-normalizr';
import {CdkUtils} from '@cdk/utils';

@Injectable()
export class AnexosEffects {
    routerState: any;
    /**
     * Get Documentos Vinculados with router parameters
     *
     * @type {Observable<any>}
     */
    getAnexos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AnexosActions.GetAnexos>(AnexosActions.GET_ANEXOS),
        mergeMap((action) => {
            const params = {
                filter: {
                    'id': `in:${action.payload.componentesDigitaisIds}`
                },
                limit: action.payload.limit,
                offset: action.payload.offset,
                sort: {
                    id: 'ASC'
                },
                populate: [],
                context: {}
            };

            return this._componenteDigitalService.query(
                JSON.stringify({
                    ...params.filter
                }),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate),
                JSON.stringify(params.context)
            ).pipe(
                mergeMap(response => [
                    new AnexosActions.GetAnexosSuccess({
                        loaded: {
                            id: 'documentoHandle',
                            value: action.payload.documentoId
                        },
                        entitiesId: response['entities'].map(cd => cd.id),
                        componentesDigitaisIds: action.payload.componentesDigitaisIds,
                        documentoId: action.payload.documentoId,
                        total: response['total']
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new AnexosActions.GetAnexosFailed(err));
                })
            )
        }),
    ));
    getAnexosSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AnexosActions.GetAnexosSuccess>(AnexosActions.GET_ANEXOS_SUCCESS),
        withLatestFrom(this._store.select(fromStore.getAnexosPagination), this._store.select(fromStore.getAnexosId)),
        tap(([action, pagination, anexosIds]) => {
            if (action.payload.total > anexosIds.length) {
                this._store.dispatch(new AnexosActions.GetAnexos({
                    componentesDigitaisIds: action.payload.componentesDigitaisIds,
                    documentoId: action.payload.documentoId,
                    limit: pagination.limit,
                    offset: pagination.offset + pagination.limit
                }));
            }
        })
    ), {dispatch: false});
    /**
     * Save ComponenteDigital
     *
     * @type {Observable<any>}
     */
    saveComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AnexosActions.SaveComponenteDigital>(AnexosActions.SAVE_COMPONENTE_DIGITAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'componente digital',
            content: 'Salvando componente digital ...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._componenteDigitalService.save(action.payload.componenteDigital).pipe(
            tap((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Componente digital id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }));
            }),
            mergeMap((response: ComponenteDigital) => [
                new AnexosActions.SaveComponenteDigitalSuccess({
                    documentoOrigem: action.payload.componenteDigital.documentoOrigem,
                    componenteDigitalId: action.payload.componenteDigitalId
                }),
                new AddData<ComponenteDigital>({
                    data: [{...action.payload.componenteDigital, ...response}],
                    schema: componenteDigitalSchema
                }),
            ]),
            catchError((err) => {
                const payload = {
                    id: action.payload.componenteDigitalId,
                    error: CdkUtils.errorsToString(err)
                }
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Erro ao salvar o componente digital: ' + payload.error,
                    status: 2, // erro
                }));
                return of(new AnexosActions.SaveComponenteDigitalFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _router: Router,
        private _store: Store<State>,
        private _activatedRoute: ActivatedRoute,
        private _componenteDigitalService: ComponenteDigitalService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
