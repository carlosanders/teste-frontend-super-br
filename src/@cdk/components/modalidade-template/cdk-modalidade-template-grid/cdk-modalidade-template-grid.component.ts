import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {MatPaginator, MatSort} from '@angular/material';

import {tap} from 'rxjs/operators';

import {ModalidadeTemplate} from '@cdk/models/modalidade-template.model';
import {ModalidadeTemplateDataSource} from '@cdk/data-sources/modalidade-template-data-source';

@Component({
    selector: 'cdk-modalidade-template-grid',
    templateUrl: './cdk-modalidade-template-grid.component.html',
    styleUrls: ['./cdk-modalidade-template-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeTemplateGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadetemplates: ModalidadeTemplate[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'valor', 'descricao', 'actions'];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    pageSize = 5;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    select = new EventEmitter<ModalidadeTemplate>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeTemplateDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.gridFilter = {};
        this.modalidadetemplates = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeTemplateDataSource(of(this.modalidadetemplates));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeTemplateDataSource(of(this.modalidadetemplates));
    }

    ngAfterViewInit(): void {
        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(
            this.sort.sortChange,
            this.paginator.page
        ).pipe(
            tap(() => this.loadPage())
        ).subscribe();
    }

    toggleFilter(): void {
        this.showFilter = !this.showFilter;
        if (!this.showFilter) {
            this.gridFilter = {};
            this.setGridFilter(this.gridFilter);
        }
    }

    loadPage(): void {
        this.reload.emit({
            gridFilter: this.gridFilter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {}
        });
    }

    editModalidadeTemplate(modalidadetemplateId): void {
        this.edit.emit(modalidadetemplateId);
    }

    selectModalidadeTemplate(modalidadetemplate: ModalidadeTemplate): void {
        this.select.emit(modalidadetemplate);
    }

    deleteModalidadeTemplate(modalidadetemplateId): void {
        this.delete.emit(modalidadetemplateId);
    }

    deleteModalidadeTemplates(modalidadetemplatesId): void {
        modalidadetemplatesId.forEach(modalidadetemplateId => this.deleteModalidadeTemplate(modalidadetemplateId));
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
        const arr = Object.keys(this.modalidadetemplates).map(k => this.modalidadetemplates[k]);
        this.selectedIds = arr.map(modalidadetemplate => modalidadetemplate.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadetemplateId): void {
        const selectedModalidadetemplateIds = [...this.selectedIds];

        if (selectedModalidadetemplateIds.find(id => id === modalidadetemplateId) !== undefined) {
            this.selectedIds = selectedModalidadetemplateIds.filter(id => id !== modalidadetemplateId);
        } else {
            this.selectedIds = [...selectedModalidadetemplateIds, modalidadetemplateId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadetemplates.length && this.selectedIds.length > 0);
    }

    setGridFilter (gridFilter): void {
        this.gridFilter = {
            ...this.gridFilter,
            ...gridFilter
        };

        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
