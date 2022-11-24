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
import {Documento, Modelo, Pagination} from '@cdk/models';
import {ModeloDataSource} from '@cdk/data-sources/modelo-data-source';
import {FormControl} from '@angular/forms';
import {CdkModeloFilterComponent} from '../sidebars/cdk-modelo-filter/cdk-modelo-filter.component';

@Component({
    selector: 'cdk-modelo-grid',
    templateUrl: './cdk-modelo-grid.component.html',
    styleUrls: ['./cdk-modelo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModeloGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    loadingSaving = false;

    @Input()
    modelos: Modelo[];

    @Input()
    total = 0;

    @Input()
    saving = false;

    @Input()
    mode = 'list';

    @Input()
    type = null;

    @Input()
    documento = false;

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'modalidadeModelo.valor', 'ativo', 'actions'];

    @Input()
    mobileMode = false;

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'editConteudo', 'especie', 'select'];

    @Input()
    checkboxSelection = true;

    @Input()
    orgaoCentralPagination: Pagination;

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild(CdkModeloFilterComponent)
    cdkModeloFilterComponent: CdkModeloFilterComponent;

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
    especie = new EventEmitter<number>();

    @Output()
    editConteudo = new EventEmitter<Documento>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    selected = new EventEmitter<Modelo>();

    @Output()
    view = new EventEmitter<number>();

    @Output()
    selectedIds: number[] = [];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'id',
            label: 'Id',
            fixed: true,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'nome',
            label: 'nome',
            fixed: true,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'ativo',
            label: 'Ativo',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'descricao',
            label: 'Descrição',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'modalidadeModelo.valor',
            label: 'Modalidade',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'template.nome',
            label: 'Template',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'vinculacoesModelos.setor.nome',
            label: 'Setor',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'vinculacoesModelos.unidade.nome',
            label: 'Unidade',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'vinculacoesModelos.modalidadeOrgaoCentral.nome',
            label: 'Órgão Central',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'documento.tipoDocumento.nome',
            label: 'Documento',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'criadoEm',
            label: 'Criado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'atualizadoPor.nome',
            label: 'Atualizado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'atualizadoEm',
            label: 'Atualizado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'apagadoPor.nome',
            label: 'Apagado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'apagadoEm',
            label: 'Apagado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'actions',
            label: '',
            fixed: true,
            mode: 'all',
            sort: 'all'
        }
    ];

    columns = new FormControl();

    dataSource: ModeloDataSource;

    showFilter = false;

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
        this.modelos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModeloDataSource(of(this.modelos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new ModeloDataSource(of(this.modelos));

        this.columns.setValue(this.getAllColumns().map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.getAllColumns().forEach((c) => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        this.displayedColumns.push(c.id);
                    }
                });
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
    }

    getSort(columnId: string): boolean {
        let disabled = true;
        this.getAllColumns().forEach((c) => {
            if (c.id === columnId && (c.sort === 'all' || c.sort === this.mode)) {
                disabled = false;
            }
        });
        return disabled;
    }

    getAllColumns(): any[] {
        return this.allColumns.filter(
            c => c.mode === 'all' || c.mode === this.mode
        );
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
        this._cdkSidebarService.getSidebar('cdk-modelo-filter').toggleOpen();
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
            this.cdkModeloFilterComponent.resetarFormulario();
            this.loadPage();
        }
    }

    editModelo(modeloId): void {
        this.edit.emit(modeloId);
    }

    especieSetores(modeloId): void {
        this.especie.emit(modeloId);
    }

    editConteudoModelo(documento: Documento): void {
        this.editConteudo.emit(documento);
    }

    selectModelo(modelo: Modelo): void {
        this.selected.emit(modelo);
    }

    visualizarModelo(modeloId: number): void {
        this.view.emit(modeloId);
    }

    deleteModelo(modeloId): void {
        this.delete.emit(modeloId);
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
        const arr = Object.keys(this.modelos).map(k => this.modelos[k]);
        this.selectedIds = arr.map(modelo => modelo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modeloId): void {
        const selectedModeloIds = [...this.selectedIds];

        if (selectedModeloIds.find(id => id === modeloId) !== undefined) {
            this.selectedIds = selectedModeloIds.filter(id => id !== modeloId);
        } else {
            this.selectedIds = [...selectedModeloIds, modeloId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modelos.length && this.selectedIds.length > 0);
    }

    setFilter(gridFilter): void {
        if(this.mobileMode && this.modelos) {
            (<HTMLInputElement>document.getElementById('sidebarId')).classList.remove('mobile-modelo-pesquisa-on');
            (<HTMLInputElement>document.getElementById('sidebarId')).classList.add('mobile-modelo-pesquisa-off');
            (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.remove('mobile-modelo-lista-off');
            (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.add('mobile-modelo-lista-on');
        }
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

    cssPesquisaOn(): void {
        (<HTMLInputElement>document.getElementById('sidebarId')).classList.remove('mobile-modelo-pesquisa-off');
        (<HTMLInputElement>document.getElementById('sidebarId')).classList.add('mobile-modelo-pesquisa-on');
        (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.remove('mobile-modelo-lista-on');
        (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.add('mobile-modelo-lista-off');
    }
}
