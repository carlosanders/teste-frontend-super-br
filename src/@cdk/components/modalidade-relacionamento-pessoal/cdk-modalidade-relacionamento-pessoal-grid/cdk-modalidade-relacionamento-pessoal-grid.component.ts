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

import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {ModalidadeRelacionamentoPessoal} from '@cdk/models/modalidade-relacionamento-pessoal.model';
import {ModalidadeRelacionamentoPessoalDataSource} from '@cdk/data-sources/modalidade-relacionamento-pessoal-data-source';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'cdk-modalidade-relacionamento-pessoal-grid',
    templateUrl: './cdk-modalidade-relacionamento-pessoal-grid.component.html',
    styleUrls: ['./cdk-modalidade-relacionamento-pessoal-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeRelacionamentoPessoalGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidaderelacionamentoPessoals: ModalidadeRelacionamentoPessoal[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'valor', 'descricao', 'actions'];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true
        },
        {
            id: 'id',
            label: 'Id',
            fixed: true
        },
        {
            id: 'descricao',
            label: 'Descrição',
            fixed: true
        },
        {
            id: 'valor',
            label: 'Valor',
            fixed: false
        },
        {
            id: 'ativo',
            label: 'Ativo',
            fixed: false
        },
        {
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false
        },
        {
            id: 'criadoEm',
            label: 'Criado Em',
            fixed: false
        },
        {
            id: 'atualizadoPor.nome',
            label: 'Atualizado Por',
            fixed: false
        },
        {
            id: 'atualizadoEm',
            label: 'Atualizado Em',
            fixed: false
        },
        {
            id: 'apagadoPor.nome',
            label: 'Apagado Por',
            fixed: false
        },
        {
            id: 'apagadoEm',
            label: 'Apagado Em',
            fixed: false
        },
        {
            id: 'actions',
            label: '',
            fixed: true
        }
    ];

    columns = new FormControl();

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    pageSize = 5;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
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
    selected = new EventEmitter<ModalidadeRelacionamentoPessoal>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeRelacionamentoPessoalDataSource;

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
        this.modalidaderelacionamentoPessoals = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeRelacionamentoPessoalDataSource(of(this.modalidaderelacionamentoPessoals));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeRelacionamentoPessoalDataSource(of(this.modalidaderelacionamentoPessoals));

        this.columns.setValue(this.allColumns.map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.allColumns.forEach(c => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        this.displayedColumns.push(c.id);
                    }
                });
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
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

    editModalidadeRelacionamentoPessoal(modalidaderelacionamentoPessoalId): void {
        this.edit.emit(modalidaderelacionamentoPessoalId);
    }

    selectModalidadeRelacionamentoPessoal(modalidaderelacionamentoPessoal: ModalidadeRelacionamentoPessoal): void {
        this.selected.emit(modalidaderelacionamentoPessoal);
    }

    deleteModalidadeRelacionamentoPessoal(modalidaderelacionamentoPessoalId): void {
        this.delete.emit(modalidaderelacionamentoPessoalId);
    }

    deleteModalidadeRelacionamentoPessoals(modalidaderelacionamentoPessoalsId): void {
        modalidaderelacionamentoPessoalsId.forEach(modalidaderelacionamentoPessoalId => this.deleteModalidadeRelacionamentoPessoal(modalidaderelacionamentoPessoalId));
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
        const arr = Object.keys(this.modalidaderelacionamentoPessoals).map(k => this.modalidaderelacionamentoPessoals[k]);
        this.selectedIds = arr.map(modalidaderelacionamentoPessoal => modalidaderelacionamentoPessoal.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidaderelacionamentoPessoalId): void {
        const selectedModalidaderelacionamentoPessoalIds = [...this.selectedIds];

        if (selectedModalidaderelacionamentoPessoalIds.find(id => id === modalidaderelacionamentoPessoalId) !== undefined) {
            this.selectedIds = selectedModalidaderelacionamentoPessoalIds.filter(id => id !== modalidaderelacionamentoPessoalId);
        } else {
            this.selectedIds = [...selectedModalidaderelacionamentoPessoalIds, modalidaderelacionamentoPessoalId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidaderelacionamentoPessoals.length && this.selectedIds.length > 0);
    }

    setGridFilter(gridFilter): void {
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
