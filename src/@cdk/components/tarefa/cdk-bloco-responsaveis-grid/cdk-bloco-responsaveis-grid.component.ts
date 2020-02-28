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
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {Setor} from '@cdk/models';
import {FormControl} from '@angular/forms';
import {DataSource} from '../../../data-sources/data-source';
import {Responsavel} from '../../../models/respensavel.model';

@Component({
    selector: 'cdk-bloco-responsaveis-grid',
    templateUrl: './cdk-bloco-responsaveis-grid.component.html',
    styleUrls: ['./cdk-bloco-responsaveis-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkBlocoResponsaveisComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    responsaveis: Responsavel[];

    showFilter = false;

    @Output()
    responsaveisChange = new EventEmitter<Responsavel[]>();

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Input()
    displayedColumns: string[] = ['select', 'id', 'responsavel', 'setor', 'sigla', 'actions'];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true
        },
        {
            id: 'id',
            label: 'Id',
            fixed: false
        },
        {
            id: 'responsavel',
            label: 'Responsável',
            fixed: false
        },
        {
            id: 'setor',
            label: 'Setor',
            fixed: false
        },
        {
            id: 'sigla',
            label: 'Sigla',
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
    selected = new EventEmitter<Responsavel>();

    @Output()
    selectedIds: number[] = [];

    usuariosSetoresDataSource: DataSource<Responsavel>;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     * @param _fuseSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService
    ) {
        this.gridFilter = {};
        this.responsaveis = [];

    }

    ngOnChanges(): void {
        this.usuariosSetoresDataSource = new DataSource(of([...this.responsaveis]));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.usuariosSetoresDataSource = new DataSource(of([...this.responsaveis]));
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
        this._fuseSidebarService.getSidebar('cdk-bloco-responsaveis-main-sidebar').toggleOpen();
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

    deleteResponsavel(setorId, responsavelId): void {
        if (responsavelId) {
            this.responsaveis = this.responsaveis.filter(responsavel => 
                (responsavel.setor.id && responsavel.usuario.id) !== (setorId && responsavelId));
            this.responsaveisChange.emit(this.responsaveis);
        }else {
            this.responsaveis = this.responsaveis.filter(responsavel => 
                (responsavel.setor.id) !== (setorId));
            this.responsaveisChange.emit(this.responsaveis);

        }
    }

    selectResponsavel(responsaveis: Responsavel): void {
        this.responsaveisChange.emit(this.responsaveis);
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
        const arrUrs = Object.keys(this.responsaveis).map(k => this.responsaveis[k]);
        this.selectedIds = arrUrs.map(responsavel => responsavel.setor.id);

        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(responsavelId): void {
        const selectedResponsavelIds = [...this.selectedIds];

        if (selectedResponsavelIds.find(id => id === responsavelId) !== undefined) {
            this.selectedIds = selectedResponsavelIds.filter(id => id !== responsavelId);
        } else {
            this.selectedIds = [...selectedResponsavelIds, responsavelId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.responsaveis.length && this.selectedIds.length > 0);
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
