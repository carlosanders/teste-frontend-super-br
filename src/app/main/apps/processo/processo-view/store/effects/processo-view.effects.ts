import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom, switchMap, tap, concatMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada} from '@cdk/models';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {JuntadaService} from '@cdk/services/juntada.service';
import {getCurrentStep, getIndex, getPagination, getDocumentos} from '../selectors';
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
                concatMap((response) => [
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
                            id: this.routerState.params['processoCopiaHandle'] ?
                                'processoCopiaHandle' : 'processoHandle',
                            value: this.routerState.params['processoCopiaHandle'] ?
                                this.routerState.params.processoCopiaHandle : this.routerState.params.processoHandle
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
                    if (this.routerState.params.stepHandle !== 'capa' && index[currentStep.step] === undefined) {
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
     * Get Juntadas Success
     */
    @Effect({dispatch: false})
    getJuntadasSuccess: any =
        this._actions
            .pipe(
                ofType<ProcessoViewActions.GetJuntadasSuccess>(ProcessoViewActions.GET_JUNTADAS_SUCCESS),
                withLatestFrom(this._store.pipe(select(getPagination))),
                tap(([action, pagination]) => {
                    if (this.routerState.params['stepHandle'] === 'default') {
                        let capa = true;
                        let firstJuntada = 0;
                        if (action.payload.index) {
                            firstJuntada = action.payload.index.findIndex((indice) => {
                                return indice.length > 0;
                            });
                            capa = firstJuntada === -1;
                        }
                        if (capa) {
                            if (this.routerState.url.indexOf('/documento/') !== -1) {
                                let arrPrimary = [];
                                arrPrimary.push(this.routerState.url.indexOf('anexar-copia') === -1 ?
                                    'visualizar-processo' : 'anexar-copia');
                                arrPrimary.push(this.routerState.params.processoHandle);
                                if (this.routerState.params.chaveAcessoHandle) {
                                    arrPrimary.push('chave');
                                    arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                                }
                                arrPrimary.push('visualizar');
                                arrPrimary.push('capa');
                                arrPrimary.push('mostrar');
                                let extras = {
                                    relativeTo: this._activatedRoute.parent,
                                    queryParams: {
                                        documentoEdit: this.routerState.queryParams.documentoEdit
                                    }
                                }

                                // Navegação do processo deve ocorrer por outlet
                                this._router.navigate(
                                    [
                                        this.routerState.url.split('/documento/')[0] + '/documento/' +
                                        this.routerState.params.documentoHandle,
                                        {
                                            outlets: {
                                                primary: arrPrimary
                                            }
                                        }
                                    ],
                                    extras
                                ).then();
                            } else {
                                let url = this.routerState.url.split('/processo/' +
                                    this.routerState.params.processoHandle)[0] + '/processo/' +
                                    this.routerState.params.processoHandle;
                                if (this.routerState.params.chaveAcessoHandle) {
                                    url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                                }
                                url += '/visualizar/capa/mostrar';
                                let extras = {
                                    queryParams: {
                                        documentoEdit: this.routerState.queryParams.documentoEdit
                                    }
                                }
                                this._router.navigate([url], extras).then();
                            }
                        } else {
                            if (this.routerState.url.indexOf('/documento/') !== -1) {
                                if (this.routerState.url.indexOf('sidebar:') === -1) {
                                    let arrPrimary = [];
                                    arrPrimary.push(this.routerState.url.indexOf('anexar-copia') === -1 ?
                                        'visualizar-processo' : 'anexar-copia');
                                    arrPrimary.push(this.routerState.params.processoHandle);
                                    if (this.routerState.params.chaveAcessoHandle) {
                                        arrPrimary.push('chave');
                                        arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                                    }
                                    arrPrimary.push('visualizar');
                                    arrPrimary.push(firstJuntada + '-0');
                                    // Navegação do processo deve ocorrer por outlet
                                    this._router.navigate(
                                        [
                                            this.routerState.url.split('/documento/')[0] + '/documento/' +
                                            this.routerState.params.documentoHandle,
                                            {
                                                outlets: {
                                                    primary: arrPrimary
                                                }
                                            }
                                        ],
                                        {
                                            relativeTo: this._activatedRoute.parent
                                        }
                                    ).then(() => {
                                        this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                            step: firstJuntada,
                                            subStep: 0
                                        }));
                                    });
                                } else {
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: firstJuntada,
                                        subStep: 0
                                    }));
                                }
                            } else {
                                let url = this.routerState.url.split('/processo/' +
                                    this.routerState.params.processoHandle)[0] + '/processo/' +
                                    this.routerState.params.processoHandle;
                                if (this.routerState.params.chaveAcessoHandle) {
                                    url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                                }
                                url += '/visualizar/' + firstJuntada + '-0';
                                let extras = {
                                    queryParams: {
                                        documentoEdit: this.routerState.queryParams.documentoEdit
                                    }
                                }
                                this._router.navigate([url], extras)
                                    .then(() => {
                                        this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                            step: firstJuntada,
                                            subStep: 0
                                        }));
                                    });
                            }
                        }
                    } else if (pagination.offset === 0 && this.routerState.params['stepHandle'] &&
                        this.routerState.params['stepHandle'] !== 'capa' && this.routerState.params['stepHandle'] !== 'default') {
                        if (this.routerState.url.indexOf('/documento/') !== -1) {
                            if (this.routerState.url.indexOf('sidebar:') === -1) {
                                let arrPrimary = [];
                                arrPrimary.push(this.routerState.url.indexOf('anexar-copia') === -1 ?
                                    'visualizar-processo' : 'anexar-copia');
                                arrPrimary.push(this.routerState.params.processoHandle);
                                if (this.routerState.params.chaveAcessoHandle) {
                                    arrPrimary.push('chave');
                                    arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                                }
                                arrPrimary.push('visualizar');
                                arrPrimary.push(this.routerState.params['stepHandle']);

                                // Navegação do processo deve ocorrer por outlet
                                this._router.navigate(
                                    [
                                        this.routerState.url.split('/documento/')[0] + '/documento/' +
                                        this.routerState.params.documentoHandle,
                                        {
                                            outlets: {
                                                primary: arrPrimary
                                            }
                                        }
                                    ],
                                    {
                                        relativeTo: this._activatedRoute.parent
                                    }
                                ).then(() => {
                                    const steps = this.routerState.params['stepHandle'].split('-');
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: steps[0],
                                        subStep: steps[1]
                                    }));
                                });
                            } else {
                                const steps = this.routerState.params['stepHandle'].split('-');
                                this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                    step: steps[0],
                                    subStep: steps[1]
                                }));
                            }
                        } else {
                            let url = this.routerState.url.split('/processo/' + this.routerState.params.processoHandle)[0]
                                + '/processo/' + this.routerState.params.processoHandle;
                            if (this.routerState.params.chaveAcessoHandle) {
                                url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                            }
                            url += '/visualizar/' + this.routerState.params['stepHandle'];

                            this._router.navigateByUrl(url)
                                .then(() => {
                                    const steps = this.routerState.params['stepHandle'].split('-');
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: steps[0],
                                        subStep: steps[1]
                                    }));
                                });
                        }
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
                        let arrPrimary = [];
                        arrPrimary.push(this.routerState.url.indexOf('anexar-copia') === -1 ?
                            'visualizar-processo' : 'anexar-copia');
                        this.routerState.params['processoCopiaHandle'] ?
                            arrPrimary.push(this.routerState.params.processoCopiaHandle) : arrPrimary.push(this.routerState.params.processoHandle);
                        if (this.routerState.params.chaveAcessoHandle) {
                            arrPrimary.push('chave');
                            arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                        }
                        arrPrimary.push('visualizar');
                        arrPrimary.push('capa');
                        arrPrimary.push('mostrar');

                        // Navegação do processo deve ocorrer por outlet
                        this._router.navigate(
                            [
                                this.routerState.url.split('/documento/')[0] + '/documento/' +
                                this.routerState.params.documentoHandle,
                                {
                                    outlets: {
                                        primary: arrPrimary
                                    }
                                }
                            ],
                            {
                                relativeTo: this._activatedRoute.parent
                            }
                        ).then();
                    } else {
                        let url = this.routerState.url.split('/processo/' +
                            this.routerState.params.processoHandle)[0] + '/processo/' +
                            this.routerState.params.processoHandle;
                        if (this.routerState.params.chaveAcessoHandle) {
                            url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                        }
                        url += '/visualizar/capa/mostrar';

                        this._router.navigateByUrl(url).then();
                    }
                })
            );
}
