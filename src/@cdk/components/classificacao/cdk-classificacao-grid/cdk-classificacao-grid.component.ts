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
import {ClassificacaoDataSource} from '@cdk/data-sources/classificacao-data-source';
import {Classificacao} from '@cdk/models/classificacao.model';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'cdk-classificacao-grid',
    templateUrl: './cdk-classificacao-grid.component.html',
    styleUrls: ['./cdk-classificacao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkClassificacaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    classificacoes: Classificacao[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'codigo', 'nome', 'modalidadeDestinacao.valor', 'permissaoUso', 'actions'];

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
            id: 'modalidadeDestinacao.valor',
            label: 'Modalidade Destinação',
            fixed: false
        },
        {
            id: 'prazoGuardaFaseCorrenteAno',
            label: 'Prazo Guarda Fase Corrente Ano',
            fixed: false
        },
        {
            id: 'prazoGuardaFaseCorrenteMes',
            label: 'Prazo Guarda Fase Corrente Mês',
            fixed: false
        },
        {
            id: 'prazoGuardaFaseCorrenteDia',
            label: 'Prazo Guarda Fase Corrente Dia',
            fixed: false
        },
        {
            id: 'prazoGuardaFaseCorrenteEvento',
            label: 'Prazo Guarda Fase Corrente Evento',
            fixed: false
        },
        {
            id: 'prazoGuardaFaseIntermediariaAno',
            label: 'Prazo Guarda Fase Intermediária Ano',
            fixed: false
        },
        {
            id: 'prazoGuardaFaseIntermediariaMes',
            label: 'Prazo Guarda Fase Intermediária Mês',
            fixed: false
        },
        {
            id: 'prazoGuardaFaseIntermediariaDia',
            label: 'Prazo Guarda Fase Intermediária Dia',
            fixed: false
        },
        {
            id: 'prazoGuardaFaseIntermediariaEvento',
            label: 'Prazo Guarda Fase Intermediária Evento',
            fixed: false
        },
        {
            id: 'codigo',
            label: 'Código',
            fixed: false
        },
        {
            id: 'ativo',
            label: 'Ativo',
            fixed: false
        },
        {
            id: 'permissaoUso',
            label: 'Permissão de Uso',
            fixed: false
        },
        {
            id: 'observacao',
            label: 'Observação',
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
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Classificacao>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ClassificacaoDataSource;

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
    }

    ngOnChanges(): void {
        this.dataSource = new ClassificacaoDataSource(of(this.classificacoes));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ClassificacaoDataSource(of(this.classificacoes));

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

    editClassificacao(classificacaoId): void {
        this.edit.emit(classificacaoId);
    }

    selectClassificacao(classificacao: Classificacao): void {
        this.selected.emit(classificacao);
    }

    deleteClassificacao(classificacaoId): void {
        this.delete.emit(classificacaoId);
    }

    deleteClassificacoes(classificacoesId): void {
        classificacoesId.forEach(classificacaoId => this.deleteClassificacao(classificacaoId));
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
        const arr = Object.keys(this.classificacoes).map(k => this.classificacoes[k]);
        this.selectedIds = arr.map(classificacao => classificacao.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(classificacaoId): void {
        const selectedClassificacaoIds = [...this.selectedIds];

        if (selectedClassificacaoIds.find(id => id === classificacaoId) !== undefined) {
            this.selectedIds = selectedClassificacaoIds.filter(id => id !== classificacaoId);
        } else {
            this.selectedIds = [...selectedClassificacaoIds, classificacaoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.classificacoes.length && this.selectedIds.length > 0);
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
