import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { DocumentoAvulso } from '@cdk/models/documento-avulso.model';
import { DocumentoAvulsoService } from '@cdk/services/documento-avulso.service';
import * as fromStore from 'app/main/apps/oficios/store';
import { getRouterState, getScreenState } from 'app/store/reducers';

import { locale as english } from 'app/main/apps/oficios/i18n/en';

import { Folder } from '@cdk/models/folder.model';

import { ResizeEvent } from 'angular-resizable-element';
import { fuseAnimations } from '@fuse/animations';
import { Etiqueta } from '@cdk/models/etiqueta.model';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Pagination } from '@cdk/models/pagination';
import { LoginService } from '../../auth/login/login.service';
/*import { ToggleMaximizado } from 'app/main/apps/oficios/store';*/
import { Usuario } from '@cdk/models/usuario.model';

@Component({
    selector: 'oficios',
    templateUrl: './oficios.component.html',
    styleUrls: ['./oficios.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OficiosComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();
    private documentoAvulso: DocumentoAvulso;

    routerState: any;

    searchInput: FormControl;

    folders$: Observable<Folder[]>;
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

    selectedOficios$: Observable<DocumentoAvulso[]>;

    selectedOficios: DocumentoAvulso[] = [];

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
     * @param _fuseSidebarService
     * @param _fuseTranslationLoaderService
     * @param _tarefaService
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _router: Router,
        private _store: Store<fromStore.ProcessosAppState>,
        private _loginService: LoginService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._fuseTranslationLoaderService.loadTranslations(english);
        /*this.loading$ = this._store.pipe(select(fromStore.getIsLoading));*/
        this.documentosAvulso$ = this._store.pipe(select(fromStore.getProcessos));
        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        /*this.selectedOficios$ = this._store.pipe(select(fromStore.getSelectedDocumentosAvulso));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedDocumentosAvulsoIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingDocumentoAvulsoIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedDocumentoAvulsoIds));*/
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
            this.currentDocumentoAvulsoId = parseInt(routerState.state.params['oficioHandle'], 0);
        });

        this.documentosAvulso$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(oficios => !!oficios)
        ).subscribe(oficios => {
            this.documentosAvulso = oficios;
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

        this.selectedOficios$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedOficios => {
            this.selectedOficios = selectedOficios;
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedIds => {
            this.selectedIds = selectedIds;
        });

        /*this.screen$.pipe(
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
        });*/
    }

    ngAfterViewInit(): void {
        /*this.documentoAvulsoListOriginalSize = this.documentoAvulsoListOriginalSize.nativeElement.offsetWidth;*/
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

        this._store.dispatch(new fromStore.GetProcessos(nparams));
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
            'vinculacoesEtiquetas.etiqueta.id': `in:${etiquetasId.join(',')}`
        };
        const nparams = {
            ...this.pagination,
            etiquetaFilter: etiquetaFilter
        };
        this._store.dispatch(new fromStore.GetProcessos(nparams));
    }

    onScroll(): void {
        if (this.documentosAvulso.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            limit: this.pagination.limit + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetProcessos(nparams));
    }

    setCurrentDocumentoAvulso(documentoAvulso: DocumentoAvulso): void {
        if (!documentoAvulso.dataHoraResposta) {
            /*this._store.dispatch(new fromStore.ToggleLidaTarefa(tarefa));*/
        }
        /*this._store.dispatch(new fromStore.SetCurrentDocumentoAvulso({documentoAvulsoId: documentoAvulso.id,
        processoId: documentoAvulso.processo.id, acessoNegado: documentoAvulso.processo.acessoNegado}));*/
    }

    /*deleteTarefa(tarefaId: number): void {
        this._store.dispatch(new fromStore.DeleteTarefa(tarefaId));
    }*/

    /*doToggleUrgente(documentoAvulso: DocumentoAvulso): void {
        this._store.dispatch(new fromStore.ToggleUrgenteTarefa(documentoAvulso));
    }*/

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
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    changeSelectedIds(ids: number[]): void {
        /*this._store.dispatch(new fromStore.ChangeSelectedDocumentosAvulso(ids));*/
    }

    /*setFolderOnSelectedTarefas(folder): void {
        this.selectedOficios.forEach((oficio) => {
            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({tarefa: oficio, folder: folder}));
        });
    }*/

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

    /*doCreateDocumentoAvulso(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/tarefa/' + tarefaId + '/oficio']).then();
    }

    doCreateTarefa(params): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/criar/' + params.processoId]).then();
    }*/

    /*doMovimentar(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/tarefa/' + tarefaId + '/atividades/criar']).then();
    }

    doEditTarefa(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/tarefa/' + tarefaId + '/editar']).then();
    }

    doCompartilhar(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/tarefa/' + tarefaId + '/compartilhamentos/criar']).then();
    }

    doCompartilharBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/compartilhamento-bloco']).then();
    }

    doEtiquetarBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    doMovimentarBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/atividade-bloco']).then();
    }

    doEditTarefaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/tarefa-edit-bloco']).then();
    }

    doCreateTarefaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/tarefa-bloco']).then();
    }

    doUploadBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/upload-bloco']).then();
    }

    doEditorBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/modelo-bloco']).then();
    }

    doCreateDocumentoAvulsoBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/'
        + this.routerState.params.folderHandle + '/documento-avulso-bloco']).then();
    }*/
}
