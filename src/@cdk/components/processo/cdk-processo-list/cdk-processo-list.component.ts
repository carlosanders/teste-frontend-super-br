import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Assunto, Interessado, Processo} from '@cdk/models';
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
    prontoTransicao: boolean;

    @Input()
    currentProcessoId: number;

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

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
    criarLembrete = new EventEmitter<any>();

    @Output()
    realizarTransicao = new EventEmitter<any>();

    @Output()
    realizarTransicaoBloco = new EventEmitter<any>();

    @Output()
    criarLembreteBloco = new EventEmitter<any>();

    @Output()
    classificacaoBloco = new EventEmitter<any>();

    @Output()
    etiquetarBloco = new EventEmitter<any>();

    @Output()
    lembreteBloco = new EventEmitter<any>();

    @Output()
    salvarLembrete = new EventEmitter<any>();

    @Input()
    assuntos: Assunto[];

    @Output()
    idProcesso = new EventEmitter<any>();

    @Output()
    idProcessoInteresado = new EventEmitter<any>();

    @Input()
    loadingAssunto: boolean;

    @Input()
    isOpenPanel: boolean;

    @Input()
    idProcessoToLoadAssuntos: number;


    @Input()
    interessados: Interessado[];

    @Input()
    loadingInteressado: boolean;

    @Input()
    idProcessoToLoadInteressados: number;

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
        this.listFilter = listFilter;
        this.loadPage();
    }



    doClassificacaoBloco(): void {
        this.classificacaoBloco.emit();
    }

    doRealizarTransicaoBloco(): void {
        this.realizarTransicaoBloco.emit();
    }

    doCriarLembreteBloco(): void {
        this.lembreteBloco.emit();
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

    doCriarLembrete(params): void {
        this.criarLembrete.emit(params);
    }

    doRealizarTransicao(params): void {
        this.realizarTransicao.emit(params);
    }

    /**
     * Toggle the sidebar
     */
    toggleSidebar(): void {
        this._cdkSidebarService.getSidebar('cdk-processo-list-main-sidebar').toggleOpen();
    }

    doLoadAssuntos(idProcesso) {
        this.idProcesso.emit(idProcesso);
    }

    doLoadInteressados(idProcessoInteressado) {
        this.idProcessoInteresado.emit(idProcessoInteressado);
    }
}
