import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {Documento} from '@cdk/models';
import * as fromStore from 'app/main/apps/documento/store';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {GetDocumentos as GetDocumentosProcesso, UnloadDocumentos} from '../processo/processo-view/store/actions';
import {GetDocumentos as GetDocumentosAtividade} from '../tarefas/tarefa-detail/atividades/atividade-create/store/actions';
import {GetDocumentos as GetDocumentosAvulsos} from '../tarefas/tarefa-detail/oficios/store/actions';
import {ToggleMaximizado} from '../oficios/store/actions';

@Component({
    selector: 'documento',
    templateUrl: './documento.component.html',
    styleUrls: ['./documento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    documento$: Observable<Documento>;
    loading$: Observable<boolean>;
    currentComponenteDigital$: Observable<ComponenteDigital>;
    screen$: Observable<any>;

    documento: Documento;
    currentComponenteDigital: ComponenteDigital;

    routerState: any;

    modoProcesso = 1;

    destroying = false;
    private mobileMode: boolean;

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
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
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
        ).subscribe(screen => {
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
        this.destroying = true;
        this._store.dispatch(new fromStore.UnloadDocumento());
        let url = this.routerState.url.split('/documento/')[0];
        if (url.indexOf('/processo') !== -1) {
            this._store.dispatch(new UnloadDocumentos());
        }
        if (url.indexOf('/capa') !== -1) {
            url += '/mostrar';
        }
        this._router.navigate([url]).then(() => {
            if (url.indexOf('/atividades') !== -1) {
                this._store.dispatch(new GetDocumentosAtividade());
            } else if (url.indexOf('/oficios') !== -1) {
                this._store.dispatch(new GetDocumentosAvulsos());
            } else if (url.indexOf('/processo') !== -1) {
                this._store.dispatch(new GetDocumentosProcesso());
            }
        });
    }

    public destroyEditor(): void {
        const editor = window['CKEDITOR'];
        if (editor && editor.instances) {
            for (const editorInstance in editor.instances) {
                if (editor.instances.hasOwnProperty(editorInstance) &&
                    editor.instances[editorInstance]) {
                    editor.instances[editorInstance].destroy();
                    editor.instances[editorInstance] = {
                        destroy: () => true,
                    };
                }
            }
        }
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        this.documento.componentesDigitais.forEach(componenteDigital => {
            if (componenteDigital.numeracaoSequencial === (this.currentComponenteDigital.numeracaoSequencial + 1)) {
                this._store.dispatch(new fromStore.SetCurrentStep({
                    id: componenteDigital.id,
                    editavel: componenteDigital.editavel && this.documento.minuta
                }));
                return;
            }
        });
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        this.documento.componentesDigitais.forEach(componenteDigital => {
            if (componenteDigital.numeracaoSequencial === (this.currentComponenteDigital.numeracaoSequencial - 1)) {
                this._store.dispatch(new fromStore.SetCurrentStep({
                    id: componenteDigital.id,
                    editavel: componenteDigital.editavel && this.documento.minuta
                }));
                return;
            }
        });
    }

    visualizarProcessoNovaAba(): void {
        window.open(this.routerState.url.split('/apps/')[0] + '/apps/processo/' + this.documento.processoOrigem.id
            + '/visualizar', '_blank');
    }

    visualizarProcesso(indice): void {
        if (indice === 1) {
            this.modoProcesso = 2;
            let primary: string;
            primary = 'visualizar-processo/' + this.documento.processoOrigem.id + '/visualizar';
            this._router.navigate([{outlets: {primary: primary}}],
                {
                    relativeTo: this._activatedRoute
                }).then();
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
}
