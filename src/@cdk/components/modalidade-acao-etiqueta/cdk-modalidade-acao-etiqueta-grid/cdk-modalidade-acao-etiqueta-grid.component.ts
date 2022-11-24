import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';
import {ModalidadeAcaoEtiquetaDataSource} from '@cdk/data-sources/modalidade-acao-etiqueta-data-source';
import {FormControl} from '@angular/forms';
import {CdkModalidadeAcaoEtiquetaFilterComponent} from '../sidebars/cdk-modalidade-acao-etiqueta-filter/cdk-modalidade-acao-etiqueta-filter.component';


@Component({
    selector: 'cdk-modalidade-acao-etiqueta-grid',
    templateUrl: './cdk-modalidade-acao-etiqueta-grid.component.html',
    styleUrls: ['./cdk-modalidade-acao-etiqueta-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeAcaoEtiquetaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadeAcaoEtiquetas: ModalidadeAcaoEtiqueta[];

    showFilter = false;

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'modalidadeEtiqueta.valor', 'actions'];

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
            id: 'nome',
            label: 'Nome',
            fixed: true
        },
        {
            id: 'descricao',
            label: 'Descrição',
            fixed: false
        },
        {
            id: 'ativo',
            label: 'Ativo',
            fixed: false
        },
        {
            id: 'modalidadeEtiqueta.valor',
            label: 'Modalidade Etiqueta',
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
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild(CdkModalidadeAcaoEtiquetaFilterComponent)
    cdkModalidadeAcaoEtiquetaFilterComponent: CdkModalidadeAcaoEtiquetaFilterComponent;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    inatived = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<ModalidadeAcaoEtiqueta>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeAcaoEtiquetaDataSource;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;
    hasInatived = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.modalidadeAcaoEtiquetas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeAcaoEtiquetaDataSource(of(this.modalidadeAcaoEtiquetas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new ModalidadeAcaoEtiquetaDataSource(of(this.modalidadeAcaoEtiquetas));

        this.columns.setValue(this.allColumns.map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.allColumns.forEach((c) => {
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
        this._cdkSidebarService.getSidebar('cdk-modalidade-acao-etiqueta-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : {};
        contexto['isAdmin'] = this.hasInatived;
        contexto['mostrarApagadas'] = this.hasExcluded;
        this.reload.emit({
            gridFilter: filter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
    }

    loadExcluded(): void {
        this.hasExcluded = !this.hasExcluded;
        if (this.hasExcluded) {
            const filter = this.gridFilter.filters;
            this.excluded.emit({
                gridFilter: filter,
                limit: this.paginator.pageSize,
                offset: (this.paginator.pageSize * this.paginator.pageIndex),
                sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
                context: {mostrarApagadas: true}
            });
        }
        else {
            this.loadPage();
        }
    }

    loadInatived(): void {
        this.hasInatived = !this.hasInatived;
        if (this.hasInatived) {
            const filter = this.gridFilter.filters;
            this.inatived.emit({
                gridFilter: filter,
                limit: this.paginator.pageSize,
                offset: (this.paginator.pageSize * this.paginator.pageIndex),
                sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
                context: {isAdmin: true}
            });
        }
        else {
            this.gridFilter = {};
            this.cdkModalidadeAcaoEtiquetaFilterComponent.resetarFormulario();
            this.loadPage();
        }
    }

    editModalidadeAcaoEtiqueta(modalidadeAcaoEtiquetaId): void {
        this.edit.emit(modalidadeAcaoEtiquetaId);
    }

    selectModalidadeAcaoEtiqueta(modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta): void {
        this.selected.emit(modalidadeAcaoEtiqueta);
    }

    deleteModalidadeAcaoEtiqueta(modalidadeAcaoEtiquetaId): void {
        this.delete.emit(modalidadeAcaoEtiquetaId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
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
        const arr = Object.keys(this.modalidadeAcaoEtiquetas).map(k => this.modalidadeAcaoEtiquetas[k]);
        this.selectedIds = arr.map(modalidadeAcaoEtiqueta => modalidadeAcaoEtiqueta.id);
        this.recompute();
    }

    /**
     * Deselect all
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadeAcaoEtiquetaId): void {
        const selectedModalidadeAcaoEtiquetaIds = [...this.selectedIds];

        if (selectedModalidadeAcaoEtiquetaIds.find(id => id === modalidadeAcaoEtiquetaId) !== undefined) {
            this.selectedIds = selectedModalidadeAcaoEtiquetaIds.filter(id => id !== modalidadeAcaoEtiquetaId);
        } else {
            this.selectedIds = [...selectedModalidadeAcaoEtiquetaIds, modalidadeAcaoEtiquetaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadeAcaoEtiquetas.length && this.selectedIds.length > 0);
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }

    doCreate(): void {
        this.create.emit();
    }

    getProp(obj, prop): any|boolean {
        if (obj && obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        return false;
    }

    getMessageError(obj): any {
        return obj?.error?.error?.message;
   }
}
