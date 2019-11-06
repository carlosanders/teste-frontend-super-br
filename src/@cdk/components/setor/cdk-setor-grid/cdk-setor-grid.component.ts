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

import {Setor} from '@cdk/models/setor.model';
import {SetorDataSource} from '@cdk/data-sources/setor-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-setor-grid',
    templateUrl: './cdk-setor-grid.component.html',
    styleUrls: ['./cdk-setor-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkSetorGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    setores: Setor[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'sigla', 'actions'];

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
            id: 'sigla',
            label: 'Sigla',
            fixed: false
        },
        {
            id: 'especieSetor.nome',
            label: 'Espécie Setor',
            fixed: false
        },
        {
            id: 'generoSetor.nome',
            label: 'Gênero Setor',
            fixed: false
        },
        {
            id: 'ativo',
            label: 'Ativo',
            fixed: false
        },
        {
            id: 'modalidadeOrgaoCentral.valor',
            label: 'Modalidade Órgão Central',
            fixed: false
        },
        {
            id: 'endereco',
            label: 'Endereço',
            fixed: false
        },
        {
            id: 'email',
            label: 'Email',
            fixed: false
        },
        {
            id: 'unidade.nome',
            label: 'Unidade',
            fixed: false
        },
        {
            id: 'unidadePai.nome',
            label: 'Unidade Pai',
            fixed: false
        },
        {
            id: 'municipio.nome',
            label: 'Município',
            fixed: false
        },
        {
            id: 'prefixoNUP',
            label: 'Prefixo NUP',
            fixed: false
        },
        {
            id: 'sequenciaInicialNUP',
            label: 'Sequência Inicial NUP',
            fixed: false
        },
        {
            id: 'gerenciamento',
            label: 'Gerenciamento',
            fixed: false
        },
        {
            id: 'apenasProtocolo',
            label: 'Apenas Protocolo',
            fixed: false
        },
        {
            id: 'numeracaoDocumentoUnidade',
            label: 'Numeração Documento Unidade',
            fixed: false
        },
        {
            id: 'apenasDistribuidor',
            label: 'Apenas Distribuidor',
            fixed: false
        },
        {
            id: 'distribuicaoCentena',
            label: 'Distribuição Centena',
            fixed: false
        },
        {
            id: 'prazoEqualizacao',
            label: 'Prazo Equalização',
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
    selected = new EventEmitter<Setor>();

    @Output()
    selectedIds: number[] = [];

    dataSource: SetorDataSource;

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
        this.setores = [];
    }

    ngOnChanges(): void {
        this.dataSource = new SetorDataSource(of(this.setores));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new SetorDataSource(of(this.setores));

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
        this._fuseSidebarService.getSidebar('cdk-setor-main-sidebar').toggleOpen();
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

    editSetor(setorId): void {
        this.edit.emit(setorId);
    }

    selectSetor(setor: Setor): void {
        this.selected.emit(setor);
    }

    deleteSetor(setorId): void {
        this.delete.emit(setorId);
    }

    deleteSetores(setoresId): void {
        setoresId.forEach(setorId => this.deleteSetor(setorId));
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
        const arr = Object.keys(this.setores).map(k => this.setores[k]);
        this.selectedIds = arr.map(setor => setor.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(setorId): void {
        const selectedSetorIds = [...this.selectedIds];

        if (selectedSetorIds.find(id => id === setorId) !== undefined) {
            this.selectedIds = selectedSetorIds.filter(id => id !== setorId);
        } else {
            this.selectedIds = [...selectedSetorIds, setorId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.setores.length && this.selectedIds.length > 0);
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
