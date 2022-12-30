import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
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
import {filter, take, takeUntil} from 'rxjs/operators';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {
    GetJuntada,
} from '../processo/processo-view/store';
import {
    GetDocumentos as GetDocumentosAtividade
} from '../tarefas/tarefa-detail/atividades/atividade-create/store/actions';
import {GetDocumentos as GetDocumentosAvulsos} from '../tarefas/tarefa-detail/oficios/store/actions';
import {getIsLoading as getIsLoadingComponenteDigital, getIsSaving as getIsSavingComponenteDigital, UnloadComponenteDigital} from './componente-digital/store';
import * as ProcessoViewActions from '../processo/processo-view/store/actions/processo-view.actions';
import {CdkUtils} from '@cdk/utils';
import {MatDialog} from '@angular/material/dialog';
import {MatTabGroup} from '@angular/material/tabs';
import {RouterHistoryService} from '../../../../@cdk/utils/router-history.service';
import {ComponenteDigitalService} from '../../../../@cdk/services/componente-digital.service';
import {modulesConfig} from 'modules/modules-config';

@Component({
    selector: 'documento',
    templateUrl: './documento.component.html',
    styleUrls: ['./documento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('matTabGroup') matTabGroup: MatTabGroup;
    documento$: Observable<Documento>;
    loading$: Observable<boolean>;
    loading: boolean = false;
    loadingComponenteDigital$: Observable<boolean>;
    savingComponenteDigital$: Observable<boolean>;
    currentComponenteDigital$: Observable<ComponenteDigital>;
    screen$: Observable<any>;

    documento: Documento;
    currentComponenteDigital: ComponenteDigital;

    routerState: any;

    currentIndice = 0;
    modoProcesso = 0;

    destroying = false;
    mobileMode: boolean;

    getDocumentosAtividades: boolean = false;
    atualizarJuntadaId: number = null;
    getDocumentosAvulsos: boolean = false;
    lote: string;
    routeAtividadeDocumento = 'atividade';
    routeOficioDocumento = 'oficio';

    private _backUrl: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _store: Store<fromStore.DocumentoAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
        private _routerHistoryService: RouterHistoryService
    ) {
        // Set the defaults
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.currentComponenteDigital$ = this._store.pipe(select(fromStore.getCurrentComponenteDigital));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.loadingComponenteDigital$ = this._store.pipe(select(getIsLoadingComponenteDigital));
        this.savingComponenteDigital$ = this._store.pipe(select(getIsSavingComponenteDigital));
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
        // this._backUrl = this._routerHistoryService.getPreviousUrl()?.url;
        this._backUrl = this._router.url.split('/documento/')[0];
        if (this._backUrl.indexOf('/capa') !== -1) {
            this._backUrl += '/mostrar';
        }
        const content = document.getElementsByTagName('content')[0];
        content.classList.add('full-screen');

        this.documento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documento => this.documento = documento);

        this.currentComponenteDigital$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            componenteDigital => this.currentComponenteDigital = componenteDigital
        );

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });
    }

    ngAfterViewInit(): void {
        const pathDocumento = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('atividade') &&
                module.routerLinks[pathDocumento]['atividade'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeAtividadeDocumento = module.routerLinks[pathDocumento]['atividade'][this.routerState.params.generoHandle];
            }
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('oficio') &&
                module.routerLinks[pathDocumento]['oficio'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeOficioDocumento = module.routerLinks[pathDocumento]['oficio'][this.routerState.params.generoHandle];
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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();

        this._store.dispatch(new UnloadComponenteDigital());
        this._store.dispatch(new fromStore.UnloadDocumento());
        if (this.getDocumentosAtividades) {
            this._store.dispatch(new GetDocumentosAtividade());
        } else if (this.getDocumentosAvulsos) {
            this._store.dispatch(new GetDocumentosAvulsos());
        }
        if (this.atualizarJuntadaId !== null) {
            this._store.dispatch(new GetJuntada(this.atualizarJuntadaId));
        }
        if (this.routerState.params['stepHandle'] && this.routerState.params['stepHandle'] !== 'latest' && this.routerState.params['stepHandle'] !== 'capa') {
            const steps = this.routerState.params['stepHandle'].split('-');
            this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                step: parseInt(steps[0], 10),
                subStep: parseInt(steps[1], 10)
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
        let url = this.routerState.url.split('/documento/')[0];
        this.destroying = true;
        if (url.indexOf('/capa') !== -1) {
            url += '/mostrar';
        }
        if (url.indexOf('/atividades') !== -1) {
            this.getDocumentosAtividades = true;
        } else if (url.indexOf('/oficios') !== -1 && url.indexOf('/tarefa/') !== -1) {
            this.getDocumentosAvulsos = true;
        }

        if (this.routerState.queryParams.pesquisa) {
            this._router.navigate(['apps/pesquisa/documentos/']).then();
            return;
        }

        this._router.navigate([this._backUrl || url]).then(() => {
            if (url.indexOf('latest') !== -1) {
                this._store.dispatch(new ProcessoViewActions.DownloadLatestBinary(this.routerState.params['processoHandle']));
            }
        });
    }

    public destroyEditor(): void {
        // const editor = window['CKEDITOR'];
        // if (editor && editor.instances) {
        //     for (const editorInstance in editor.instances) {
        //         if (editor.instances.hasOwnProperty(editorInstance) &&
        //             editor.instances[editorInstance]) {
        //             editor.instances[editorInstance].destroy();
        //         }
        //     }
        // }
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        if (this.currentComponenteDigital.editavel) {
            this.podeNavegarDoEditor().pipe(take(1)).subscribe((result) => {
                if (result) {
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
            });
        } else {
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
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        if (this.currentComponenteDigital.editavel) {
            this.podeNavegarDoEditor().pipe(take(1)).subscribe((result) => {
                if (result) {
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
            });
        } else {
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

    visualizarProcesso(clickedTab): void {
        const indice = clickedTab.index;
        if (this.currentIndice !== indice) {
            if (indice === 1) {
                this.podeNavegarDoEditor().pipe(take(1)).subscribe((result) => {
                    if (result) {
                        this._componenteDigitalService.saving.next(false);
                        this.currentIndice = indice;
                        this.modoProcesso = 1;
                        const primary = 'visualizar-processo/' + this.documento.processoOrigem.id;
                        const sidebar = 'empty';
                        this._router.navigate([{outlets: {primary: primary, sidebar: sidebar}}],
                            {
                                relativeTo: this._activatedRoute
                            })
                            .then(() => {});
                    } else {
                        this.matTabGroup.selectedIndex = 0;
                    }
                });
            } else {
                this.currentIndice = indice;
                this.modoProcesso = 0;
                let sidebar = 'editar/' + this.routeAtividadeDocumento;
                let primary: string;
                primary = 'componente-digital/' + this.currentComponenteDigital.id;
                primary += (this.currentComponenteDigital.editavel && !this.currentComponenteDigital.assinado) ? '/editor/ckeditor' : '/visualizar';
                if (this.documento.estaVinculada) {
                    sidebar = 'editar/dados-basicos';
                }
                if (!!this.documento.documentoAvulsoRemessa) {
                    sidebar = this.routeOficioDocumento + '/dados-basicos';
                }
                this._router.navigate([{outlets: {primary: primary, sidebar: sidebar}}],
                    {
                        relativeTo: this._activatedRoute
                    }).then();
            }
        }
    }

    podeNavegarDoEditor(): Observable<boolean> {
        if (this.hasChanges()) {
            this._componenteDigitalService.doEditorSave.next(true);
            return this._componenteDigitalService.completedEditorSave.asObservable();
        } else {
            return of(true);
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
