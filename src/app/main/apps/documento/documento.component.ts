import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, of, Subject} from 'rxjs';

import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {ComponenteDigital, Documento} from '@cdk/models';
import * as fromStore from 'app/main/apps/documento/store';

import {cdkAnimations} from '@cdk/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {
    GetDocumentos as GetDocumentosProcesso,
    GetJuntadas,
    SetCurrentStep,
    UnloadDocumentos,
    UnloadJuntadas
} from '../processo/processo-view/store/actions';
import {GetDocumentos as GetDocumentosAtividade} from '../tarefas/tarefa-detail/atividades/atividade-create/store/actions';
import {GetDocumentos as GetDocumentosAvulsos} from '../tarefas/tarefa-detail/oficios/store/actions';
import {UnloadComponenteDigital} from './componente-digital/store';
import * as ProcessoViewActions from '../processo/processo-view/store/actions/processo-view.actions';
import {CdkUtils} from '../../../../@cdk/utils';

@Component({
    selector: 'documento',
    templateUrl: './documento.component.html',
    styleUrls: ['./documento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoComponent implements OnInit, OnDestroy {

    documento$: Observable<Documento>;
    loading$: Observable<boolean>;
    currentComponenteDigital$: Observable<ComponenteDigital>;
    screen$: Observable<any>;

    documento: Documento;
    currentComponenteDigital: ComponenteDigital;

    routerState: any;

    modoProcesso = 1;

    destroying = false;
    mobileMode: boolean;

    deveRecarregarJuntadas: boolean = false;
    unloadDocumentosTarefas: boolean = false;
    getDocumentosAtividades: boolean = false;
    getDocumentosAvulsos: boolean = false;
    getDocumentosProcesso: boolean = false;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _store
     * @param _router
     * @param _activatedRoute
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _store: Store<fromStore.DocumentoAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        // Set the defaults
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.currentComponenteDigital$ = this._store.pipe(select(fromStore.getCurrentComponenteDigital));
        this.screen$ = this._store.pipe(select(getScreenState));
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        const content = document.getElementsByTagName('content')[0];
        content.classList.add('full-screen');

        this.documento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documento => this.documento = documento);

        this.currentComponenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            componenteDigital => this.currentComponenteDigital = componenteDigital
        );

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
            } else {
                this.mobileMode = false;
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.destroyEditor();
        const content = document.getElementsByTagName('content')[0];
        content.classList.remove('full-screen');

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        this._store.dispatch(new UnloadComponenteDigital());
        this._store.dispatch(new fromStore.UnloadDocumento());
        if (this.unloadDocumentosTarefas) {
            this._store.dispatch(new UnloadDocumentos());
        }
        if (this.getDocumentosAtividades) {
            this._store.dispatch(new GetDocumentosAtividade());
        } else if (this.getDocumentosAvulsos) {
            this._store.dispatch(new GetDocumentosAvulsos());
        } else if (this.getDocumentosProcesso) {
            this._store.dispatch(new GetDocumentosProcesso());
        }
        if (this.deveRecarregarJuntadas) {
            this.reloadJuntadas();
            return;
        }
        if (this.routerState.params.stepHandle) {
            const steps = this.routerState.params['stepHandle'].split('-');
            this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                step: steps[0],
                subStep: steps[1]
            }));
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    /**
     * Refresh
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
    }

    back(): void {
        // eslint-disable-next-line max-len
        this.deveRecarregarJuntadas = !!this.documento.juntadaAtual || this.routerState.params['processoCopiaHandle'] && this.routerState.params['processoHandle'] !== this.routerState.params['processoCopiaHandle'];
        this.destroying = true;
        let url = this.routerState.url.split('/documento/')[0];
        this.unloadDocumentosTarefas = url.indexOf('/processo') !== -1 && url.indexOf('tarefa') !== -1;

        if (url.indexOf('/capa') !== -1) {
            url += '/mostrar';
        }
        if (url.indexOf('/atividades') !== -1) {
            this.getDocumentosAtividades = true;
        } else if (url.indexOf('/oficios') !== -1) {
            this.getDocumentosAvulsos = true;
        } else if (url.indexOf('/processo') !== -1 && url.indexOf('tarefa') !== -1) {
            this.getDocumentosProcesso = true;
        }

        if (this.routerState.queryParams.pesquisa) {
            this._router.navigate(['apps/pesquisa/documentos/']).then();
            return;
        }
        this._router.navigate([url]).then();
    }

    public destroyEditor(): void {
        /*const editor = window['CKEDITOR'];
        if (editor && editor.instances) {
            for (const editorInstance in editor.instances) {
                if (editor.instances.hasOwnProperty(editorInstance) &&
                    editor.instances[editorInstance]) {
                    editor.instances[editorInstance].destroy();
                }
            }
        }*/
    }

    reloadJuntadas(): void {
        this._store.dispatch(new UnloadJuntadas({reset: true}));

        let processoFilter = null;

        const routeParams = of('processoHandle');
        routeParams.subscribe((param) => {
            processoFilter = `eq:${this.routerState.params[param]}`;
        });

        const params = {
            filter: {
                'volume.processo.id': processoFilter,
                'vinculada': 'eq:0'
            },
            listFilter: {},
            limit: 10,
            offset: 0,
            sort: {'volume.numeracaoSequencial': 'DESC', 'numeracaoSequencial': 'DESC'},
            populate: [
                'volume',
                'documento',
                'documento.origemDados',
                'documento.tipoDocumento',
                'documento.componentesDigitais',
                'documento.vinculacoesDocumentos',
                'documento.vinculacoesDocumentos.documentoVinculado',
                'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais',
                'documento.vinculacoesEtiquetas',
                'documento.vinculacoesEtiquetas.etiqueta'
            ]
        };

        this._store.dispatch(new GetJuntadas(params));
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        let nextComponenteDigital = null;
        this.documento.componentesDigitais.forEach((componenteDigital) => {
            if (componenteDigital.numeracaoSequencial === (this.currentComponenteDigital.numeracaoSequencial + 1)) {
                nextComponenteDigital = componenteDigital;
                return;
            }
        });
        if (nextComponenteDigital) {
            this._store.dispatch(new fromStore.SetCurrentStep({
                id: nextComponenteDigital.id,
                editavel: nextComponenteDigital.editavel && this.documento.minuta
            }));
        }
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        let prevComponenteDigital = null;
        this.documento.componentesDigitais.forEach((componenteDigital) => {
            if (componenteDigital.numeracaoSequencial === (this.currentComponenteDigital.numeracaoSequencial - 1)) {
                prevComponenteDigital = componenteDigital;
                return;
            }
        });
        if (prevComponenteDigital) {
            this._store.dispatch(new fromStore.SetCurrentStep({
                id: prevComponenteDigital.id,
                editavel: prevComponenteDigital.editavel && this.documento.minuta
            }));
        }
    }

    hasChanges(): boolean {
        const editor = window['CKEDITOR'];
        if (editor && editor.instances) {
            for (const editorInstance in editor.instances) {
                if (editor.instances.hasOwnProperty(editorInstance) && editor.instances[editorInstance]) {
                    if (editor.instances[editorInstance].checkDirty()) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    visualizarProcessoNovaAba(): void {
        window.open(this.routerState.url.split('/apps/')[0] + '/apps/processo/' + this.documento.processoOrigem.id
            + '/visualizar', '_blank');
    }

    visualizarProcesso(indice): void {
        if (indice === 1) {
            this.modoProcesso = 2;
            const stepHandle = this.routerState.params['stepHandle'] ?? 'default';
            const primary = 'visualizar-processo/' + this.documento.processoOrigem.id + '/visualizar/' + stepHandle;
            const steps = stepHandle ? stepHandle.split('-') : false;
            this._router.navigate([{outlets: {primary: primary}}],
                {
                    relativeTo: this._activatedRoute
                })
                .then(() => {
                    if (steps) {
                        this._store.dispatch(new SetCurrentStep({
                            step: steps[0],
                            subStep: steps[1]
                        }));
                    }
                });
        } else {
            this.modoProcesso = 1;
            let primary: string;
            primary = 'componente-digital/' + this.currentComponenteDigital.id;
            primary += (this.currentComponenteDigital.editavel && !this.currentComponenteDigital.assinado) ? '/editor/ckeditor' : '/visualizar';
            this._router.navigate([{outlets: {primary: primary}}],
                {
                    relativeTo: this._activatedRoute
                }).then();
        }
    }

    delete(documentoVinculadoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado({
            documentoVinculadoId: documentoVinculadoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }
}
