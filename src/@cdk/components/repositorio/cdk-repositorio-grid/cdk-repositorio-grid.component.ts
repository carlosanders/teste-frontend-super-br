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

import {Documento, Repositorio} from '@cdk/models';
import {RepositorioDataSource} from '@cdk/data-sources/repositorio-data-source';
import {FormControl} from '@angular/forms';
import {CdkRepositorioFilterComponent} from '../sidebars/cdk-repositorio-filter/cdk-repositorio-filter.component';


@Component({
    selector: 'cdk-repositorio-grid',
    templateUrl: './cdk-repositorio-grid.component.html',
    styleUrls: ['./cdk-repositorio-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRepositorioGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    repositorios: Repositorio[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Input()
    documento = false;

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'highlights', 'modalidadeRepositorio.valor', 'ativo', 'actions'];

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
            label: 'Nome',
            fixed: true,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'highlights',
            label: 'Resumo',
            fixed: false,
            mode: 'search',
            sort: 'none'
        },
        {
            id: 'descricao',
            label: 'Descrição',
            fixed: false,
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
            id: 'modalidadeRepositorio.valor',
            label: 'Modalidade da Tese',
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
            id: 'vinculacoesRepositorios.setor.nome',
            label: 'Setor',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'vinculacoesRepositorios.unidade.nome',
            label: 'Unidade',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'vinculacoesRepositorios.modalidadeOrgaoCentral.valor',
            label: 'Órgão Central',
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

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    downloadedId: number;

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'especie'];

    @Input()
    layout = 'horizontal';

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild(CdkRepositorioFilterComponent)
    cdkRepositorioFilterComponent: CdkRepositorioFilterComponent;

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
    selected = new EventEmitter<Repositorio>();

    @Output()
    download = new EventEmitter<Repositorio>();

    @Output()
    visualizar = new EventEmitter();

    @Output()
    selectedIds: number[] = [];

    dataSource: RepositorioDataSource;

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
        this.repositorios = [];
    }

    ngOnChanges(): void {
        this.dataSource = new RepositorioDataSource(of(this.repositorios));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new RepositorioDataSource(of(this.repositorios));

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
        this._cdkSidebarService.getSidebar('cdk-repositorio-filter').toggleOpen();
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
            this.cdkRepositorioFilterComponent.resetarFormulario();
            this.loadPage();
        }
    }

    editRepositorio(repositorioId): void {
        this.edit.emit(repositorioId);
    }

    especieSetores(repositorioId): void {
        this.especie.emit(repositorioId);
    }

    editConteudoRepositorio(documento: Documento): void {
        this.editConteudo.emit(documento);
    }

    selectRepositorio(repositorio: Repositorio): void {
        this.selected.emit(repositorio);
    }

    downloadRepositorio(repositorio: Repositorio): void {
        this.download.emit(repositorio);
    }

    deleteRepositorio(repositorioId): void {
        this.delete.emit(repositorioId);
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
        const arr = Object.keys(this.repositorios).map(k => this.repositorios[k]);
        this.selectedIds = arr.map(repositorio => repositorio.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(repositorioId): void {
        const selectedRepositorioIds = [...this.selectedIds];

        if (selectedRepositorioIds.find(id => id === repositorioId) !== undefined) {
            this.selectedIds = selectedRepositorioIds.filter(id => id !== repositorioId);
        } else {
            this.selectedIds = [...selectedRepositorioIds, repositorioId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.repositorios.length && this.selectedIds.length > 0);
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

    doShow(documento: Documento): void {
        this.visualizar.emit(documento.componentesDigitais[0].hash);
    }

}
