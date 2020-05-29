import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
 

@Component({
    selector: 'cdk-tipo-relatorio-list',
    templateUrl: './cdk-tipo-relatorio-list.component.html',
    styleUrls: ['./cdk-tipo-relatorio-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'dragRelatorioList'
})
export class CdkTipoRelatorioListComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading: boolean;

    @Input()
    tiposRelatorios: TipoRelatorio[] = [];

    @Input()
    currentTipoRelatorioId: number;

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
    selected = new EventEmitter<TipoRelatorio>();

    @Output()
    createTipoRelatorio = new EventEmitter<any>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    editTipoRelatorio = new EventEmitter<number>();

    @Output()
    toggleUrgente = new EventEmitter<TipoRelatorio>();

    @Input()
    isOpenPanel: boolean;

    @Input()
    idRelatorioToLoadAssuntos: number;
    
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

    selectRelatorio(relatorio: TipoRelatorio): void {
        this.selected.emit(relatorio);
    }

    doToggleUrgente(relatorio: TipoRelatorio): void {
        this.toggleUrgente.emit(relatorio);
    }

    doDeleteRelatorio(relatorioId): void {
        this.delete.emit(relatorioId);
    }

    doDeleteRelatorioBloco(): void {
        this.selectedIds.forEach(relatorioId => this.doDeleteRelatorio(relatorioId));
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
        const arr = Object.keys(this.tiposRelatorios).map(k => this.tiposRelatorios[k]);
        this.selectedIds = arr.map(relatorio => relatorio.id);
        this.recompute();
    }

    /**
     * Deselect all tiposRelatorios
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(relatorioId): void {
        const selectedRelatorioIds = [...this.selectedIds];

        if (selectedRelatorioIds.find(id => id === relatorioId) !== undefined) {
            this.selectedIds = selectedRelatorioIds.filter(id => id !== relatorioId);
        } else {
            this.selectedIds = [...selectedRelatorioIds, relatorioId];
        }
        this.recompute();
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.tiposRelatorios.length && this.selectedIds.length > 0);
        this.changeSelectedIds.emit(this.selectedIds);
    }

    setListFilter(listFilter): void {
        this.listFilter = listFilter;
        this.loadPage();
    }


    doEditRelatorio(relatorioId): void {
        this.editTipoRelatorio.emit(relatorioId);
    }

    /**
     * Toggle the sidebar
     */
    toggleSidebar(): void {
        this._cdkSidebarService.getSidebar('cdk-tipo-relatorio-filter-sidebar').toggleOpen();
    }
}
