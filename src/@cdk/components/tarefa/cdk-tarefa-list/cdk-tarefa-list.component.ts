import { PaginatedResponse } from '@cdk/models/paginated.response';
import { Observable, BehaviorSubject } from 'rxjs';
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Tarefa} from '@cdk/models/tarefa.model';

/*
* ISSUE-100
*/
import { Assunto } from '@cdk/models/assunto.model';
 

@Component({
    selector: 'cdk-tarefa-list',
    templateUrl: './cdk-tarefa-list.component.html',
    styleUrls: ['./cdk-tarefa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'dragTarefaList'
})
export class CdkTarefaListComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading: boolean;

    @Input()
    tarefas: Tarefa[] = [];

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
    reload = new EventEmitter<any>();

    @Output()
    scrolled = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    folder = new EventEmitter<any>();

    @Output()
    selected = new EventEmitter<Tarefa>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    createTarefa = new EventEmitter<any>();

    @Output()
    movimentar = new EventEmitter<number>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    editTarefa = new EventEmitter<number>();

    @Output()
    toggleUrgente = new EventEmitter<Tarefa>();

    @Output()
    compartilharBloco = new EventEmitter<any>();

    @Output()
    createTarefaBloco = new EventEmitter<any>();

    @Output()
    createDocumentoAvulsoBloco = new EventEmitter<any>();

    @Output()
    editTarefaBloco = new EventEmitter<any>();

    @Output()
    movimentarBloco = new EventEmitter<any>();

    @Output()
    etiquetarBloco = new EventEmitter<any>();

    @Output()
    uploadBloco = new EventEmitter<any>();

    @Output()
    editorBloco = new EventEmitter<any>();

    /*
    * ISSUE-107
    */
    @Input()
    assuntos: Assunto[];

    @Output()
    idProcesso = new EventEmitter<any>();

    @Input()
    bsAssuntos: BehaviorSubject<Assunto[]>;

    @Input()
    pagAssuntos: PaginatedResponse;

    @Input()
    loadingAssunto: boolean;
    
    listFilter: {} = {};
    listSort: {} = {};

    isIndeterminate = false;

    

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService) {
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
        this.selected.emit(tarefa);
    }

    doToggleUrgente(tarefa: Tarefa): void {
        this.toggleUrgente.emit(tarefa);
    }

    doDeleteTarefa(tarefaId): void {
        this.delete.emit(tarefaId);
    }

    doDeleteTarefaBloco(): void {
        this.selectedIds.forEach(tarefaId => this.doDeleteTarefa(tarefaId));
    }

    setFolder(folder): void {
        this.folder.emit(folder);
    }

    onScroll(): void {
        this.scrolled.emit();
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

    doMovimentar(tarefaId): void {
        this.movimentar.emit(tarefaId);
    }

    doMovimentarBloco(): void {
        this.movimentarBloco.emit();
    }

    doCompartilhar(tarefaId): void {
        this.compartilhar.emit(tarefaId);
    }

    doCompartilharBloco(): void {
        this.compartilharBloco.emit();
    }

    doCreateDocumentoAvulso(tarefaId): void {
        this.createDocumentoAvulso.emit(tarefaId);
    }

    doCreateDocumentoAvulsoBloco(): void {
        this.createDocumentoAvulsoBloco.emit();
    }

    doCreateTarefa(params): void {
        this.createTarefa.emit(params);
    }

    doCreateTarefaBloco(): void {
        this.createTarefaBloco.emit();
    }

    doEditTarefa(tarefaId): void {
        this.editTarefa.emit(tarefaId);
    }

    doEditTarefaBloco(): void {
        this.editTarefaBloco.emit();
    }

    doEditProcesso(params): void {
        this.editProcesso.emit(params);
    }

    doEtiquetarBloco(): void {
        this.etiquetarBloco.emit();
    }

    doUploadBloco(): void {
        this.uploadBloco.emit();
    }

    doEditorBloco(): void {
        this.editorBloco.emit();
    }

    /**
     * Toggle the sidebar
     */
    toggleSidebar(): void {
        this._cdkSidebarService.getSidebar('cdk-tarefa-list-main-sidebar').toggleOpen();
    }

    doLoadAssuntos(idProcesso) {
        this.idProcesso.emit(idProcesso);
    }
}
