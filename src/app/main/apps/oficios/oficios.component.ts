import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import * as fromStore from 'app/main/apps/oficios/store';
import {ToggleMaximizado} from 'app/main/apps/oficios/store';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {locale as english} from 'app/main/apps/oficios/i18n/en';

import {ResizeEvent} from 'angular-resizable-element';
import {cdkAnimations} from '@cdk/animations';
import {Etiqueta} from '@cdk/models/etiqueta.model';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Pagination} from '@cdk/models/pagination';
import {LoginService} from '../../auth/login/login.service';
import {Usuario} from '@cdk/models/usuario.model';
import {MatDialog} from '@cdk/angular/material';

@Component({
    selector: 'oficios',
    templateUrl: './oficios.component.html',
    styleUrls: ['./oficios.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class OficiosComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;

    searchInput: FormControl;

    currentDocumentoAvulsoId: number;
    documentosAvulso: DocumentoAvulso[] = [];
    documentoAvulsoListSize = 35;
    documentoAvulsoListOriginalSize: number;

    documentosAvulso$: Observable<DocumentoAvulso[]>;
    loading$: Observable<boolean>;

    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];

    selectedDocumentosAvulso$: Observable<DocumentoAvulso[]>;

    selectedDocumentosAvulso: DocumentoAvulso[] = [];

    screen$: Observable<any>;

    filter = {};

    etiquetas: Etiqueta[] = [];

    pagination$: Observable<any>;
    pagination: any;

    routerState$: Observable<any>;

    maximizado$: Observable<boolean>;
    maximizado = false;

    vinculacaoEtiquetaPagination: Pagination;

    private _profile: Usuario;

    mobileMode = false;

    @ViewChild('documentoAvulsoListElement', {read: ElementRef, static: true}) documentoAvulsoListElement: ElementRef;


    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _tarefaService
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        public _dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _router: Router,
        private _store: Store<fromStore.DocumentoAvulsoAppState>,
        public _loginService: LoginService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.documentosAvulso$ = this._store.pipe(select(fromStore.getDocumentosAvulso));
        this.selectedDocumentosAvulso$ = this._store.pipe(select(fromStore.getSelectedDocumentoAvulso));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedDocumentoAvulsoIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.screen$ = this._store.pipe(select(getScreenState));
        this._profile = _loginService.getUserProfile();
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.currentDocumentoAvulsoId = parseInt(routerState.state.params['documentoAvulsoHandle'], 0);
        });

        this.documentosAvulso$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documentosAvulso => {
            this.documentosAvulso = documentosAvulso;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => {
            this.pagination = pagination;
        });

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(maximizado => {
            this.maximizado = maximizado;
        });

        this.selectedDocumentosAvulso$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedDocumentosAvulso => {
            this.selectedDocumentosAvulso = selectedDocumentosAvulso;
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedIds => {
            this.selectedIds = selectedIds;
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(screen => {
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
                if (this.maximizado) {
                    this._store.dispatch(new ToggleMaximizado());
                }
            } else {
                this.mobileMode = false;
            }
        });
    }

    ngAfterViewInit(): void {
        this.documentoAvulsoListOriginalSize = this.documentoAvulsoListElement.nativeElement.offsetWidth;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reload(params): void {

        const nparams = {
            ...this.pagination,
            listFilter: params.listFilter,
            sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort
        };

        this._store.dispatch(new fromStore.GetDocumentosAvulso(nparams));
    }

    addEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas.push(etiqueta);
        this.proccessEtiquetaFilter();
    }

    deleteEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas = this.etiquetas.filter(e => e.id !== etiqueta.id);
        this.proccessEtiquetaFilter();
    }

    proccessEtiquetaFilter(): any {
        const etiquetasId = [];
        this.etiquetas.forEach((e) => {
            etiquetasId.push(e.id);
        });
        const etiquetaFilter = {
            'processo.vinculacoesEtiquetas.etiqueta.id': `in:${etiquetasId.join(',')}`
        };
        const nparams = {
            ...this.pagination,
            etiquetaFilter: etiquetaFilter
        };
        this._store.dispatch(new fromStore.GetDocumentosAvulso(nparams));
    }

    onScroll(): void {
        if (this.documentosAvulso.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            limit: this.pagination.limit + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetDocumentosAvulso(nparams));
    }

    setCurrentDocumentoAvulso(documentoAvulso: DocumentoAvulso): void {
        this._store.dispatch(new fromStore.SetCurrentDocumentoAvulso({documentoAvulsoId: documentoAvulso.id,
                processoId: documentoAvulso.processo.id, acessoNegado: documentoAvulso.processo.acessoNegado}));
    }

    /**
     * Refresh
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    changeSelectedIds(ids: number[]): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentosAvulso(ids));
    }

    onResizeEndDocumentoAvulsoList(event: ResizeEvent): void {
        const potencialDocumentoAvulsoListSize = (event.rectangle.width * this.documentoAvulsoListSize) / this.documentoAvulsoListOriginalSize;

        if (potencialDocumentoAvulsoListSize < 30) {
            this.documentoAvulsoListSize = 30;
            setTimeout(() => {
                this.documentoAvulsoListOriginalSize = this.documentoAvulsoListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        if (potencialDocumentoAvulsoListSize > 50) {
            this.documentoAvulsoListSize = 50;
            this.documentoAvulsoListOriginalSize = this.documentoAvulsoListElement.nativeElement.offsetWidth;
            setTimeout(() => {
                this.documentoAvulsoListOriginalSize = this.documentoAvulsoListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        this.documentoAvulsoListSize = (event.rectangle.width * this.documentoAvulsoListSize) / this.documentoAvulsoListOriginalSize;
        this.documentoAvulsoListOriginalSize = event.rectangle.width;
    }
}
