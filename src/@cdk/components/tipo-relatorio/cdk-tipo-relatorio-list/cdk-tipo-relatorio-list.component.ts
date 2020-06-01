import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
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
export class CdkTipoRelatorioListComponent {

    @Input()
    loading: boolean;

    @Input()
    tipoRelatorios: TipoRelatorio[] = [];

    @Input()
    currentRelatorioId: number;

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
    selected = new EventEmitter<TipoRelatorio>();

    @Output()
    editRelatorioBloco = new EventEmitter<any>();

    @Output()
    etiquetarBloco = new EventEmitter<any>();

    listFilter: any;
    listSort: {} = {};

    isIndeterminate = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService) {
        this.listFilter = {};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    toggleFilter(): void {
        this.toggleSidebar();
    }

    loadPage(): void {
        this.reload.emit({
            listFilter: this.listFilter.filters,
            listSort: this.listSort
        });
    }

    doSort(sort: any): void {
        this.listSort = sort;
        this.loadPage();
    }

    selectRelatorio(tipoRelatorio: TipoRelatorio): void {
        this.selected.emit(tipoRelatorio);
    }

    doDeleteRelatorio(relatorioId): void {
        this.delete.emit(relatorioId);
    }

    doDeleteRelatorioBloco(): void {
        this.selectedIds.forEach(relatorioId => this.doDeleteRelatorio(relatorioId));
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
        const arr = Object.keys(this.tipoRelatorios).map(k => this.tipoRelatorios[k]);
        this.selectedIds = arr.map(relatorio => relatorio.id);
        this.recompute();
    }

    /**
     * Deselect all relatorios
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
        this.isIndeterminate = (this.selectedIds.length !== this.tipoRelatorios.length && this.selectedIds.length > 0);
        this.changeSelectedIds.emit(this.selectedIds);
    }

    setListFilter(listFilter): void {
        this.listFilter = listFilter;
        this.loadPage();
    }

    doEtiquetarBloco(): void {
        this.etiquetarBloco.emit();
    }

    /**
     * Toggle the sidebar
     */
    toggleSidebar(): void {
        this._cdkSidebarService.getSidebar('cdk-tipo-relatorio-filter').toggleOpen();
    }

}