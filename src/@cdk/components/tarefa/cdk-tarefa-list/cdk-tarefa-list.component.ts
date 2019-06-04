import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {Tarefa} from '@cdk/models/tarefa.model';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector: 'cdk-tarefa-list',
    templateUrl: './cdk-tarefa-list.component.html',
    styleUrls: ['./cdk-tarefa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'dragTarefaList'
})
export class CdkTarefaListComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading: boolean;

    @Input()
    tarefas: Tarefa[];

    @Input()
    currentTarefaId: number;

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    selectedIds: number[] = [];

    @Output()
    changeSelectedIds = new EventEmitter();

    @Input()
    pagination: any;

    @Input()
    folders: any;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @Output()
    toggleInSelectedTarefas = new EventEmitter();

    @Output()
    selectedTarefa = new EventEmitter();

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    folder = new EventEmitter<any>();

    @Output()
    select = new EventEmitter<Tarefa>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    compartilhar = new EventEmitter<number>();

    listFilter: {} = {};
    listSort: {} = {};

    isIndeterminate = false;


    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    ngOnChanges(): void {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    toggleFilter(): void {
        this.toggleSidebar();
    }

    loadPage(): void {
        this.reload.emit({
            listFilter: this.listFilter,
            listSort: this.listSort
        });
    }

    doSort(sort: any): void {
        this.listSort = sort;
        this.loadPage();
    }

    selectTarefa(tarefa: Tarefa): void {
        this.select.emit(tarefa);
    }

    deleteTarefa(tarefaId): void {
        this.delete.emit(tarefaId);
    }

    deleteTarefas(): void {
        this.selectedIds.forEach(tarefaId => this.deleteTarefa(tarefaId));
    }

    setFolder(folder): void {
        this.folder.emit(folder);
    }

    /**
     * Toggle select all
     *
     * @param ev
     */
    toggleSelectAll(ev): void {
        ev.preventDefault();

        if (this.selectedIds.length && this.selectedIds.length > 0) {
            this.deselectAll();
        } else {
            this.selectAll();
        }
    }

    /**
     * Select all
     */
    selectAll(): void {
        const arr = Object.keys(this.tarefas).map(k => this.tarefas[k]);
        this.selectedIds = arr.map(tarefa => tarefa.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(tarefaId): void {
        const selectedTarefaIds = [...this.selectedIds];

        if (selectedTarefaIds.find(id => id === tarefaId) !== undefined) {
            this.selectedIds = selectedTarefaIds.filter(id => id !== tarefaId);
        } else {
            this.selectedIds = [...selectedTarefaIds, tarefaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.tarefas.length && this.selectedIds.length > 0);
        this.changeSelectedIds.emit(this.selectedIds);
    }

    setListFilter(listFilter): void {
        this.listFilter = listFilter;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }

    doCreateDocumentosAvulsos(): void {
        this.selectedIds.forEach(tarefaId => this.doCreateDocumentoAvulso(tarefaId));
    }

    doCompartilhar(): void {
        this.compartilhar.emit();
    }

    doCreateDocumentoAvulso(tarefaId): void {
        this.createDocumentoAvulso.emit(tarefaId);
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(): void {
        this._fuseSidebarService.getSidebar('cdk-tarefa-list-main-sidebar').toggleOpen();
    }
}
