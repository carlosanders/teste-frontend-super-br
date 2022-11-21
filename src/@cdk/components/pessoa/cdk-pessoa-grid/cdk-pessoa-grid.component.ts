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

import {Pessoa} from '@cdk/models';
import {PessoaDataSource} from '@cdk/data-sources/pessoa-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-pessoa-grid',
    templateUrl: './cdk-pessoa-grid.component.html',
    styleUrls: ['./cdk-pessoa-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkPessoaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    pessoas: Pessoa[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'numeroDocumentoPrincipal', 'actions'];

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
            id: 'numeroDocumentoPrincipal',
            label: 'Número do Documento Principal',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'contato',
            label: 'Contato',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'pessoaValidada',
            label: 'Pessoa Validada',
            fixed: false,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'pessoaConveniada',
            label: 'pessoaConveniada',
            fixed: false,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'dataNascimento',
            label: 'Data do Nascimento',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'dataObito',
            label: 'Data do Obito',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'nomeGenitor',
            label: 'Nome do Genitor',
            fixed: false,
            mode: 'list',
            sort: 'list'
        },
        {
            id: 'nomeGenitora',
            label: 'Nome da Genitora',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'profissao',
            label: 'Profissão',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'nacionalidade.nome',
            label: 'Nacionalidade',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'modalidadeGeneroPessoa.valor',
            label: 'Modalidade Genêro Pessoa',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'naturalidade.nome',
            label: 'Naturalidade',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'origemDados',
            label: 'Origem de Dados',
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
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    selected = new EventEmitter<Pessoa>();

    @Output()
    selectedIds: number[] = [];

    dataSource: PessoaDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.pessoas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new PessoaDataSource(of(this.pessoas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new PessoaDataSource(of(this.pessoas));

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
        this._cdkSidebarService.getSidebar('cdk-pessoa-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : {};
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

    editPessoa(pessoaId): void {
        this.edit.emit(pessoaId);
    }

    selectPessoa(pessoa: Pessoa): void {
        this.selected.emit(pessoa);
    }

    deletePessoa(pessoaId): void {
        this.delete.emit(pessoaId);
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
        const arr = Object.keys(this.pessoas).map(k => this.pessoas[k]);
        this.selectedIds = arr.map(pessoa => pessoa.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(pessoaId): void {
        const selectedPessoaIds = [...this.selectedIds];

        if (selectedPessoaIds.find(id => id === pessoaId) !== undefined) {
            this.selectedIds = selectedPessoaIds.filter(id => id !== pessoaId);
        } else {
            this.selectedIds = [...selectedPessoaIds, pessoaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.pessoas.length && this.selectedIds.length > 0);
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
