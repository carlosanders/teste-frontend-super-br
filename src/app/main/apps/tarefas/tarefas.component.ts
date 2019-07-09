import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormControl} from '@angular/forms';
import { select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { Tarefa } from '@cdk/models/tarefa.model';
import { TarefaService } from '@cdk/services/tarefa.service';
import * as fromStore from 'app/main/apps/tarefas/store';
import {getRouterState} from 'app/store/reducers';

import { locale as english } from 'app/main/apps/tarefas/i18n/en';

import { Folder } from '@cdk/models/folder.model';

import { ResizeEvent } from 'angular-resizable-element';
import { fuseAnimations } from '@fuse/animations';
import { Etiqueta } from '@cdk/models/etiqueta.model';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Pagination} from '@cdk/models/pagination';
import {LoginService} from '../../auth/login/login.service';

@Component({
    selector: 'tarefas',
    templateUrl: './tarefas.component.html',
    styleUrls: ['./tarefas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TarefasComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;

    searchInput: FormControl;

    folders$: Observable<Folder[]>;
    currentTarefaId: number;
    tarefas: Tarefa[] = [];
    tarefaListSize = 35;
    tarefaListOriginalSize: number;

    tarefas$: Observable<Tarefa[]>;
    loading$: Observable<boolean>;

    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];

    selectedTarefas$: Observable<Tarefa[]>;

    selectedTarefas: Tarefa[] = [];

    filter = {};

    etiquetas: Etiqueta[] = [];

    pagination$: Observable<any>;
    pagination: any;

    routerState$: Observable<any>;

    maximizado$: Observable<boolean>;

    vinculacaoEtiquetaPagination: Pagination;

    private _profile: any;

    @ViewChild('tarefaListElement', {read: ElementRef}) tarefaListElement: ElementRef;

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
        private _tarefaService: TarefaService,
        private _router: Router,
        private _store: Store<fromStore.TarefasAppState>,
        private _loginService: LoginService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._fuseTranslationLoaderService.loadTranslations(english);
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.tarefas$ = this._store.pipe(select(fromStore.getTarefas));
        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        this.selectedTarefas$ = this._store.pipe(select(fromStore.getSelectedTarefas));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedTarefaIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingTarefaIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedTarefaIds));
        this._profile = _loginService.getUserProfile();
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.usuario.id};
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
            this.currentTarefaId = parseInt(routerState.state.params['tarefaHandle'], 0);
        });

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefas => {
            this.tarefas = tarefas;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => {
            this.pagination = pagination;
        });

        this.selectedTarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedTarefas => {
            this.selectedTarefas = selectedTarefas;
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedIds => {
            this.selectedIds = selectedIds;
        });
    }

    ngAfterViewInit(): void {
        this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
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

        this._store.dispatch(new fromStore.GetTarefas(nparams));
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
        this._store.dispatch(new fromStore.GetTarefas(nparams));
    }

    onScroll(): void {

        if (this.tarefas.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            limit: this.pagination.limit + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetTarefas(nparams));
    }

    setCurrentTarefa(tarefa: Tarefa): void {
        if (!tarefa.dataHoraLeitura) {
            this._store.dispatch(new fromStore.ToggleLidaTarefa(tarefa));
        }
        this._store.dispatch(new fromStore.SetCurrentTarefa({tarefaId: tarefa.id, processoId: tarefa.processo.id, acessoNegado: tarefa.processo.acessoNegado}));
    }

    deleteTarefa(tarefaId: number): void {
        this._store.dispatch(new fromStore.DeleteTarefa(tarefaId));
    }

    doToggleUrgente(tarefa: Tarefa): void {
        this._store.dispatch(new fromStore.ToggleUrgenteTarefa(tarefa));
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
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    changeSelectedIds(ids: number[]): void {
        this._store.dispatch(new fromStore.ChangeSelectedTarefas(ids));
    }

    setFolderOnSelectedTarefas(folder): void {
        this.selectedTarefas.forEach((tarefa) => {
            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({tarefa: tarefa, folder: folder}));
        });
    }

    onResizeEndTarefaList(event: ResizeEvent): void {
        const potencialTarefaListSize = (event.rectangle.width * this.tarefaListSize) / this.tarefaListOriginalSize;

        if (potencialTarefaListSize < 30) {
            this.tarefaListSize = 30;
            setTimeout(() => {
                this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        if (potencialTarefaListSize > 50) {
            this.tarefaListSize = 50;
            this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
            setTimeout(() => {
                this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        this.tarefaListSize = (event.rectangle.width * this.tarefaListSize) / this.tarefaListOriginalSize;
        this.tarefaListOriginalSize = event.rectangle.width;
    }

    doCreateDocumentoAvulso(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/' + tarefaId + '/oficio']).then();
    }

    doCreateTarefa(params): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/criar/' + params.processoId]).then();
    }

    doMovimentar(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/tarefa/' + tarefaId + '/atividades/criar']).then();
    }

    doEditTarefa(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/tarefa/' + tarefaId + '/editar']).then();
    }

    doCompartilhar(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/tarefa/' + tarefaId + '/compartilhamentos/criar']).then();
    }

    doCompartilharBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/compartilhamento-bloco']).then();
    }

    doEtiquetarBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    doMovimentarBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/atividade-bloco']).then();
    }

    doEditTarefaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/tarefa-edit-bloco']).then();
    }

    doCreateTarefaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/tarefa-bloco']).then();
    }

    doUploadBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/upload-bloco']).then();
    }

    doEditorBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/modelo-bloco']).then();
    }

    doCreateDocumentoAvulsoBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/documento-avulso-bloco']).then();
    }
}
