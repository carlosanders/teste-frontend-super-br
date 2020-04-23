import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Lotacao} from '@cdk/models';
import {LotacaoDataSource} from '@cdk/data-sources/lotacao-data-source';
import {FormControl} from '@angular/forms';
import {Pagination} from "../../../models";

@Component({
    selector: 'cdk-lotacao-grid',
    templateUrl: './cdk-lotacao-grid.component.html',
    styleUrls: ['./cdk-lotacao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLotacaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    lotacoes: Lotacao[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'setor.unidade.nome', 'setor.nome', 'peso', 'distribuidor', 'coordenador', 'principal', 'actions'];

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
            id: 'colaborador.usuario.nome',
            label: 'Colaborador',
            fixed: true
        },
        {
            id: 'setor.nome',
            label: 'Setor',
            fixed: false
        },
        {
            id: 'setor.unidade.nome',
            label: 'Unidade',
            fixed: true
        },
        {
            id: 'peso',
            label: 'Peso',
            fixed: false
        },
        {
            id: 'principal',
            label: 'Principal',
            fixed: false
        },
        {
            id: 'distribuidor',
            label: 'Distribuidor',
            fixed: false
        },
        {
            id: 'coordenador',
            label: 'Coordenador',
            fixed: false
        },
        {
            id: 'pcu',
            label: 'PCU',
            fixed: false
        },
        {
            id: 'digitosDistribuicao',
            label: 'Digitos Distribuição',
            fixed: false
        },
        {
            id: 'centenasDistribuicao',
            label: 'Centenas de Distribuição',
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
    actions: string[] = ['edit', 'delete', 'select', 'setPrincipal'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    create = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Lotacao>();

    @Output()
    setPrincipal = new EventEmitter<Lotacao>();

    @Output()
    selectedIds: number[] = [];

    dataSource: LotacaoDataSource;

    @Input()
    setorPagination: Pagination;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.lotacoes = [];
    }

    ngOnChanges(): void {
        this.dataSource = new LotacaoDataSource(of(this.lotacoes));
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

        this.dataSource = new LotacaoDataSource(of(this.lotacoes));

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
        this._cdkSidebarService.getSidebar('cdk-lotacao-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : null;
        this.reload.emit({
            gridFilter: filter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
    }

    editLotacao(lotacaoId): void {
        this.edit.emit(lotacaoId);
    }

    selectLotacao(lotacao: Lotacao): void {
        this.selected.emit(lotacao);
    }

    setPrincipalLotacao(lotacao: Lotacao): void {
        this.setPrincipal.emit(lotacao);
    }

    deleteLotacao(lotacaoId): void {
        this.delete.emit(lotacaoId);
    }

    deleteLotacoes(lotacoesId): void {
        lotacoesId.forEach(lotacaoId => this.deleteLotacao(lotacaoId));
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
        const arr = Object.keys(this.lotacoes).map(k => this.lotacoes[k]);
        this.selectedIds = arr.map(lotacao => lotacao.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(lotacaoId): void {
        const selectedLotacaoIds = [...this.selectedIds];

        if (selectedLotacaoIds.find(id => id === lotacaoId) !== undefined) {
            this.selectedIds = selectedLotacaoIds.filter(id => id !== lotacaoId);
        } else {
            this.selectedIds = [...selectedLotacaoIds, lotacaoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.lotacoes.length && this.selectedIds.length > 0);
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCreate(): void {
        this.create.emit();
    }

    doCancel(): void {
        this.cancel.emit();
    }

    doCreate(): void {
        this.create.emit();
    }
}
