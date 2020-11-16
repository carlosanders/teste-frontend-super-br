import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of, throwError} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada} from '@cdk/models';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {JuntadaService} from '@cdk/services/juntada.service';
import {getCurrentStep, getIndex, getPagination} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class ProcessoViewEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
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
     * Get Juntadas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getJuntadas: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoViewActions.GetJuntadas>(ProcessoViewActions.GET_JUNTADAS),
                switchMap((action) => {
                    const chaveAcesso = this.routerState.params.chaveAcessoHandle ? {
                        chaveAcesso: this.routerState.params.chaveAcessoHandle
                    } : {};
                    return this._juntadaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(chaveAcesso));
                }),
                mergeMap((response) => [
                    new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
                    new ProcessoViewActions.GetJuntadasSuccess({
                        index: response['entities'].map(
                            juntada => {
                                if (!juntada.ativo) {
                                    return [];
                                }
                                let componentesDigitaisIds = [];
                                if (juntada.documento.componentesDigitais) {
                                    componentesDigitaisIds = juntada.documento.componentesDigitais.map(
                                        cd => cd.id
                                    );
                                }
                                if (juntada.documento.vinculacoesDocumentos) {
                                    juntada.documento.vinculacoesDocumentos.map(
                                        vinculacaoDocumento => {
                                            vinculacaoDocumento.documentoVinculado.componentesDigitais.map(
                                                cd => componentesDigitaisIds.push(cd.id)
                                            );
                                        }
                                    );
                                }
                                return componentesDigitaisIds;
                            }
                        ),
                        entitiesId: response['entities'].map(juntada => juntada.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoViewActions.GetJuntadasFailed(err));
                    return caught;
                })
            );

    /**
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentStep: Observable<ProcessoViewActions.ProcessoViewActionsAll> =
        this._actions
            .pipe(
                ofType<ProcessoViewActions.SetCurrentStep>(ProcessoViewActions.SET_CURRENT_STEP),
                withLatestFrom(this._store.pipe(select(getIndex)), this._store.pipe(select(getCurrentStep))),
                switchMap(([action, index, currentStep]) => {
                    // if (this.routerState.url.indexOf('/visualizar/capa') !== -1) {
                    //     this._router.navigate([this.routerState.url.replace('/visualizar/capa', '/visualizar')]).then();
                    // }
                    // if (this.routerState.url.indexOf('/documento/') !== -1) {
                    //     // Navegação do processo deve ocorrer por outlet
                    //     this._router.navigate(
                    //         [
                    //             this.routerState.url.split('/documento/')[0] + '/documento/' +
                    //             this.routerState.params.documentoHandle,
                    //             {
                    //                 outlets: {
                    //                     primary: [
                    //                         this.routerState.url.indexOf('anexar-copia') === -1 ?
                    //                             'visualizar-processo' : 'anexar-copia',
                    //                         this.routerState.params.processoHandle,
                    //                         'visualizar'
                    //                     ]
                    //                 }
                    //             }
                    //         ],
                    //         {
                    //             relativeTo: this._activatedRoute.parent
                    //         }
                    //     ).then();
                    // }

                    if (index[currentStep.step] === undefined) {
                        // não tem documentos, vamos para capa
                        this._store.dispatch(new ProcessoViewActions.GetCapaProcesso());
                        return of(null);
                    } else if (index[currentStep.step][currentStep.subStep] === undefined) {
                        // temos documento sem componente digital
                        return of(null);
                    } else {
                        // temos componente digital, vamos pega-lo
                        const chaveAcesso = this.routerState.params.chaveAcessoHandle ?
                            {chaveAcesso: this.routerState.params.chaveAcessoHandle} : {};
                        const context = JSON.stringify(chaveAcesso);

                        return this._componenteDigitalService.download(index[currentStep.step][currentStep.subStep], context);
                    }
                }),
                map((response: any) => {
                    return new ProcessoViewActions.SetCurrentStepSuccess({
                        binary: response,
                        loaded: this.routerState.params.stepHandle
                    });
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new ProcessoViewActions.SetCurrentStepFailed(err));
                    return caught;
                })
            );

    /**
     * Set Current Step
     */
    @Effect({dispatch: false})
    getJuntadasSuccess: any =
        this._actions
            .pipe(
                ofType<ProcessoViewActions.GetJuntadasSuccess>(ProcessoViewActions.GET_JUNTADAS_SUCCESS),
                withLatestFrom(this._store.pipe(select(getPagination))),
                tap(([action, pagination]) => {
                    if (pagination.offset === 0 && this.routerState.params['stepHandle'] && this.routerState.params['stepHandle'] !== 'capa') {
                        this._router.navigateByUrl(this.routerState.url.replace('/processo/' +
                            this.routerState.params.processoHandle +
                            '/visualizar', '/processo/' +
                            this.routerState.params.processoHandle + '/visualizar/' + this.routerState.params['stepHandle'])).then();
                    }
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new ProcessoViewActions.SetCurrentStepFailed(err));
                    return caught;
                })
            );


    /**
     * Get Capa Processo
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    getCapaProcesso: any =
        this._actions
            .pipe(
                ofType<ProcessoViewActions.GetCapaProcesso>(ProcessoViewActions.GET_CAPA_PROCESSO),
                map(() => {
                    if (this.routerState.url.indexOf('/documento/') !== -1) {
                        // Navegação do processo deve ocorrer por outlet
                        this._router.navigate(
                            [
                                this.routerState.url.split('/documento/')[0] + '/documento/' +
                                this.routerState.params.documentoHandle,
                                {
                                    outlets: {
                                        primary: [
                                            this.routerState.url.indexOf('anexar-copia') === -1 ?
                                                'visualizar-processo' : 'anexar-copia',
                                            this.routerState.params.processoHandle,
                                            'visualizar',
                                            'capa',
                                            'mostrar'
                                        ]
                                    }
                                }
                            ],
                            {
                                relativeTo: this._activatedRoute.parent
                            }
                        ).then();
                    } else {
                        this._router.navigateByUrl(this.routerState.url.replace('/processo/' +
                            this.routerState.params.processoHandle +
                            '/visualizar', '/processo/' +
                            this.routerState.params.processoHandle + '/visualizar/capa/mostrar')).then();
                    }
                })
            );
}
