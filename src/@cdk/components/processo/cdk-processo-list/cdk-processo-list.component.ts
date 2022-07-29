import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {ModalidadeTransicao, Processo} from '@cdk/models';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'cdk-processo-list',
    templateUrl: './cdk-processo-list.component.html',
    styleUrls: ['./cdk-processo-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'dragProcessoList'
})
export class CdkProcessoListComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading: boolean;

    @Input()
    processos: Processo[] = [];

    @Input()
    modalidadeTransicao: ModalidadeTransicao;

    @Input()
    currentProcessoId: number;

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    transicionandoIds: number[] = [];

    @Input()
    selectedIds: number[] = [];

    @Output()
    scrolled = new EventEmitter<any>();

    @Output()
    changeSelectedIds = new EventEmitter();

    @Input()
    pagination: any;

    @Input()
    folders: any;

    @Input()
    actions: string[] = ['select'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    selected = new EventEmitter<Processo>();

    @Output()
    editar = new EventEmitter<any>();

    @Output()
    realizarTransicao = new EventEmitter<any>();

    @Output()
    desarquivar = new EventEmitter<any>();

    @Output()
    registrarExtravio = new EventEmitter<any>();

    @Output()
    realizarTransicaoBloco = new EventEmitter<any>();

    @Output()
    desarquivarBloco = new EventEmitter<any>();

    @Output()
    registrarExtravioBloco = new EventEmitter<any>();

    @Output()
    editarBloco = new EventEmitter<any>();

    @Output()
    etiquetarBloco = new EventEmitter<any>();

    @Output()
    salvarLembrete = new EventEmitter<any>();

    @Input()
    mode = 'list';

    @Output()
    loadAssuntos = new EventEmitter<any>();

    @Input()
    loadingAssuntosProcessosId: number[];

    @Output()
    loadInteressados = new EventEmitter<any>();

    @Input()
    loadingInteressadosProcessosId: number[];

    gridFilter: any;

    listFilter: Record<string, unknown> = {};
    listSort: Record<string, string> = {};
    sortFields: string[] = [];
    sortOrders: string[] = [];

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

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['pagination']) {
            const sort = this.pagination.sort;
            this.sortFields = Object.keys(sort);
            this.sortOrders = Object.values(sort);
        }
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
        this.sortFields = Object.keys(sort);
        this.sortOrders = Object.values(sort);
        this.loadPage();
    }

    selectProcesso(processo: Processo): void {
        this.selected.emit(processo);
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
        const arr = Object.keys(this.processos).map(k => this.processos[k]);
        this.selectedIds = arr.map(processo => processo.id);
        this.recompute();
    }

    /**
     * Deselect all processos
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(processoId): void {
        const selectedProcessoIds = [...this.selectedIds];

        if (selectedProcessoIds.find(id => id === processoId) !== undefined) {
            this.selectedIds = selectedProcessoIds.filter(id => id !== processoId);
        } else {
            this.selectedIds = [...selectedProcessoIds, processoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.processos.length && this.selectedIds.length > 0);
        this.changeSelectedIds.emit(this.selectedIds);
    }

    setListFilter(listFilter): void {
        this.listFilter = listFilter?.filters;
        this.loadPage();
    }

    doRealizarTransicaoBloco(): void {
        this.realizarTransicaoBloco.emit();
    }

    doDesarquivarBloco(): void {
        this.desarquivarBloco.emit();
    }

    doRegistrarExtravioBloco(): void {
        this.registrarExtravioBloco.emit();
    }

    doEditarBloco(): void {
        this.editarBloco.emit();
    }

    doEtiquetarBloco(): void {
        this.etiquetarBloco.emit();
    }

    onScroll(): void {
        this.scrolled.emit();
    }

    doSalvarLembrete(params): void {
        this.salvarLembrete.emit(params);
    }

    doEditar(params): void {
        this.editar.emit(params);
    }

    doRealizarTransicao(params): void {
        this.realizarTransicao.emit(params);
    }

    doDesarquivar(params): void {
        this.desarquivar.emit(params);
    }

    doRegistrarExtravio(params): void {
        this.registrarExtravio.emit(params);
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.loadPage();
    }

    /**
     * Toggle the sidebar
     */
    toggleSidebar(): void {
        this._cdkSidebarService.getSidebar('cdk-processo-list-filter').toggleOpen();
    }

    doLoadAssuntos(processoId): void {
        this.loadAssuntos.emit(processoId);
    }

    doLoadInteressados(processoId): void {
        this.loadInteressados.emit(processoId);
    }

    processoTrackBy(index, processo: Processo): number {
        return processo.id;
    }
}
