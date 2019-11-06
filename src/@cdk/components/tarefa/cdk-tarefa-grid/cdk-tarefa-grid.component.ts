import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {TarefaDataSource} from '@cdk/data-sources/tarefa-data-source';
import {Tarefa} from '@cdk/models/tarefa.model';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-tarefa-grid',
    templateUrl: './cdk-tarefa-grid.component.html',
    styleUrls: ['./cdk-tarefa-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkTarefaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    tarefas: Tarefa[] = [];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'processo.nup', 'especieTarefa.nome', 'dataHoraInicioPrazo',
        'dataHoraFinalPrazo', 'actions'];

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
            id: 'processo.nup',
            label: 'NUP',
            fixed: true
        },
        {
            id: 'postIt',
            label: 'Post It',
            fixed: false
        },
        {
            id: 'urgente',
            label: 'Urgente',
            fixed: false
        },
        {
            id: 'observacao',
            label: 'Observação',
            fixed: false
        },
        {
            id: 'redistribuida',
            label: 'Redistribuída',
            fixed: false
        },
        {
            id: 'dataHoraLeitura',
            label: 'Data da Leitura',
            fixed: false
        },
        {
            id: 'dataHoraInicioPrazo',
            label: 'Data do Início do Prazo',
            fixed: false
        },
        {
            id: 'dataHoraFinalPrazo',
            label: 'Data do Final do Prazo',
            fixed: false
        },
        {
            id: 'dataHoraConclusaoPrazo',
            label: 'Data da Conclusão do Prazo',
            fixed: false
        },
        {
            id: 'especieTarefa.nome',
            label: 'Espécie de Tarefa',
            fixed: false
        },
        {
            id: 'usuarioResponsavel.nome',
            label: 'Usuário Responsável',
            fixed: false
        },
        {
            id: 'setorOrigem.nome',
            label: 'Setor de Origem',
            fixed: false
        },
        {
            id: 'unidadeResponsavel.nome',
            label: 'Unidade Responsável',
            fixed: false
        },
        {
            id: 'setorResponsavel.nome',
            label: 'Setor Responsável',
            fixed: false
        },
        {
            id: 'usuarioConclusaoPrazo.nome',
            label: 'Usuário da Conclusao do Prazo',
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
    selected = new EventEmitter<Tarefa>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    dataSource: TarefaDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService
    ) {
        this.gridFilter = {};
    }

    ngOnChanges(): void {
        this.dataSource = new TarefaDataSource(of(this.tarefas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new TarefaDataSource(of(this.tarefas));

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
        this._fuseSidebarService.getSidebar('cdk-tarefa-main-sidebar').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        this.reload.emit({
            gridFilter: this.gridFilter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {}
        });
    }

    editTarefa(tarefaId): void {
        this.edit.emit(tarefaId);
    }

    selectTarefa(tarefa: Tarefa): void {
        this.selected.emit(tarefa);
    }

    deleteTarefa(tarefaId): void {
        this.delete.emit(tarefaId);
    }

    deleteTarefas(tarefasId): void {
        tarefasId.forEach(tarefaId => this.deleteTarefa(tarefaId));
        this.selectedIds = this.selectedIds.filter(id => tarefasId.indexOf(id) === -1);
        this.recompute();
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
        const arr = Object.keys(this.tarefas).map(k => this.tarefas[k]);
        this.selectedIds = arr.map(tarefa => tarefa.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(tarefaId): void {
        const selectedTarefaIds = [...this.selectedIds];

        if (selectedTarefaIds.find(id => id === tarefaId) !== undefined) {
            this.selectedIds = selectedTarefaIds.filter(id => id !== tarefaId);
        } else {
            this.selectedIds = [...selectedTarefaIds, tarefaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.tarefas.length && this.selectedIds.length > 0);
    }

    setGridFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
