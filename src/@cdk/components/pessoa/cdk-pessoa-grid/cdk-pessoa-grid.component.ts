import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {MatPaginator, MatSort} from '@angular/material';

import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {Pessoa} from '@cdk/models/pessoa.model';
import {PessoaDataSource} from '@cdk/data-sources/pessoa-data-source';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'cdk-pessoa-grid',
    templateUrl: './cdk-pessoa-grid.component.html',
    styleUrls: ['./cdk-pessoa-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
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

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'numeroDocumentoPrincipal', 'actions'];

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
            id: 'numeroDocumentoPrincipal',
            label: 'Número do Documento Principal',
            fixed: false
        },
        {
            id: 'contato',
            label: 'Contato',
            fixed: false
        },
        {
            id: 'pessoaValidada',
            label: 'Pessoa Validada',
            fixed: false
        },
        {
            id: 'dataNascimento',
            label: 'Data do Nascimento',
            fixed: false
        },
        {
            id: 'dataObito',
            label: 'Data do Obito',
            fixed: false
        },
        {
            id: 'nomeGenitor',
            label: 'Nome do Genitor',
            fixed: false
        },
        {
            id: 'nomeGenitora',
            label: 'Nome da Genitora',
            fixed: false
        },
        {
            id: 'profissao',
            label: 'Profissão',
            fixed: false
        },
        {
            id: 'nacionalidade.nome',
            label: 'Nacionalidade',
            fixed: false
        },
        {
            id: 'modalidadeGeneroPessoa.valor',
            label: 'Modalidade Genêro Pessoa',
            fixed: false
        },
        {
            id: 'naturalidade.nome',
            label: 'Naturalidade',
            fixed: false
        },
        {
            id: 'origemDados.fonteDados',
            label: 'Origem de Dados',
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
    selected = new EventEmitter<Pessoa>();

    @Output()
    selectedIds: number[] = [];

    dataSource: PessoaDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.gridFilter = {};
        this.pessoas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new PessoaDataSource(of(this.pessoas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new PessoaDataSource(of(this.pessoas));

        if (this.mode === 'search') {
            this.toggleFilter();
        }

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
        this.showFilter = !this.showFilter;
        if (!this.showFilter) {
            this.gridFilter = {};
            this.setGridFilter(this.gridFilter);
        }
    }

    loadPage(): void {
        this.reload.emit({
            gridFilter: this.gridFilter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {}
        });
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

    deletePessoas(pessoasId): void {
        pessoasId.forEach(pessoaId => this.deletePessoa(pessoaId));
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

    setGridFilter(gridFilter): void {
        this.gridFilter = {
            ...this.gridFilter,
            ...gridFilter
        };

        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
