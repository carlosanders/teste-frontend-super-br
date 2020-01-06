import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {RelacionamentoPessoal} from '@cdk/models/relacionamento-pessoal.model';
import {RelacionamentoPessoalDataSource} from '@cdk/data-sources/relacionamento-pessoal-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-relacionamento-pessoal-grid',
    templateUrl: './cdk-relacionamento-pessoal-grid.component.html',
    styleUrls: ['./cdk-relacionamento-pessoal-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkRelacionamentoPessoalGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    relacionamentoPessoals: RelacionamentoPessoal[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'pessoaRelacionada.nome', 'modalidadeRelacionamentoPessoal.valor',
        'origemDados.servico', 'actions'];

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
            id: 'pessoaRelacionada.nome',
            label: 'Pessoa Relacionada',
            fixed: true
        },
        {
            id: 'modalidadeRelacionamentoPessoal.valor',
            label: 'Modalidade Relacionamento Pessoal',
            fixed: false
        },
        {
            id: 'origemDados.fonteDados',
            label: 'Origem de Dados',
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
    selected = new EventEmitter<RelacionamentoPessoal>();

    @Output()
    selectedIds: number[] = [];

    dataSource: RelacionamentoPessoalDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService
    ) {
        this.gridFilter = {};
        this.relacionamentoPessoals = [];
    }

    ngOnChanges(): void {
        this.dataSource = new RelacionamentoPessoalDataSource(of(this.relacionamentoPessoals));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const ElementQueries = require('css-element-queries/src/ElementQueries');
        ElementQueries.listen();
        ElementQueries.init();

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new RelacionamentoPessoalDataSource(of(this.relacionamentoPessoals));

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
        this._fuseSidebarService.getSidebar('cdk-relacionamento-pessoal-main-sidebar').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        this.reload.emit({
            gridFilter: this.gridFilter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {}
        });
    }

    editRelacionamentoPessoal(relacionamentoPessoalId): void {
        this.edit.emit(relacionamentoPessoalId);
    }

    selectRelacionamentoPessoal(relacionamentoPessoal: RelacionamentoPessoal): void {
        this.selected.emit(relacionamentoPessoal);
    }

    deleteRelacionamentoPessoal(relacionamentoPessoalId): void {
        this.delete.emit(relacionamentoPessoalId);
    }

    deleteRelacionamentoPessoals(relacionamentoPessoalsId): void {
        relacionamentoPessoalsId.forEach(relacionamentoPessoalId => this.deleteRelacionamentoPessoal(relacionamentoPessoalId));
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
        const arr = Object.keys(this.relacionamentoPessoals).map(k => this.relacionamentoPessoals[k]);
        this.selectedIds = arr.map(relacionamentoPessoal => relacionamentoPessoal.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(relacionamentoPessoalId): void {
        const selectedRelacionamentoPessoalIds = [...this.selectedIds];

        if (selectedRelacionamentoPessoalIds.find(id => id === relacionamentoPessoalId) !== undefined) {
            this.selectedIds = selectedRelacionamentoPessoalIds.filter(id => id !== relacionamentoPessoalId);
        } else {
            this.selectedIds = [...selectedRelacionamentoPessoalIds, relacionamentoPessoalId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.relacionamentoPessoals.length && this.selectedIds.length > 0);
    }

    setGridFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
