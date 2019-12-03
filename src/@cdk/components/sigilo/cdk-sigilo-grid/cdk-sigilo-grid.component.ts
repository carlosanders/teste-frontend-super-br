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

import {Sigilo} from '@cdk/models/sigilo.model';
import {SigiloDataSource} from '@cdk/data-sources/sigilo-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-sigilo-grid',
    templateUrl: './cdk-sigilo-grid.component.html',
    styleUrls: ['./cdk-sigilo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkSigiloGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    sigilos: Sigilo[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'desclassificado', 'dataHoraValidadeSigilo', 'dataHoraExpiracao',
        'modalidadeCategoriaSigilo.valor', 'tipoSigilo.nome',  'actions'];

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
            id: 'tipoSigilo.nome',
            label: 'Tipo de Sigilo',
            fixed: true
        },
        {
            id: 'desclassificado',
            label: 'Desclassificado',
            fixed: false
        },
        {
            id: 'observacao',
            label: 'Observação',
            fixed: false
        },
        {
            id: 'codigoIndexacao',
            label: 'Código de Indexacao',
            fixed: false
        },
        {
            id: 'fundamentoLegal',
            label: 'Fundamento Legal',
            fixed: false
        },
        {
            id: 'dataHoraValidadeSigilo',
            label: 'Data da Validade do Sigilo',
            fixed: false
        },
        {
            id: 'dataHoraInicioSigilo',
            label: 'Data do Início do Sigilo',
            fixed: false
        },
        {
            id: 'nivelAcesso',
            label: 'Nível de Acesso',
            fixed: false
        },
        {
            id: 'modalidadeCategoriaSigilo.valor',
            label: 'Modalidade da Categoria do Sigilo',
            fixed: false
        },
        {
            id: 'processo.NUP',
            label: 'NUP',
            fixed: false
        },
        {
            id: 'documento.tipoDocumento.nome',
            label: 'Documento',
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
    selected = new EventEmitter<Sigilo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: SigiloDataSource;

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
        this.sigilos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new SigiloDataSource(of(this.sigilos));
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

        this.dataSource = new SigiloDataSource(of(this.sigilos));

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
        this._fuseSidebarService.getSidebar('cdk-sigilo-main-sidebar').toggleOpen();
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

    editSigilo(sigiloId): void {
        this.edit.emit(sigiloId);
    }

    selectSigilo(sigilo: Sigilo): void {
        this.selected.emit(sigilo);
    }

    deleteSigilo(sigiloId): void {
        this.delete.emit(sigiloId);
    }

    deleteSigilos(sigilosId): void {
        sigilosId.forEach(sigiloId => this.deleteSigilo(sigiloId));
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
        const arr = Object.keys(this.sigilos).map(k => this.sigilos[k]);
        this.selectedIds = arr.map(sigilo => sigilo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(sigiloId): void {
        const selectedSigiloIds = [...this.selectedIds];

        if (selectedSigiloIds.find(id => id === sigiloId) !== undefined) {
            this.selectedIds = selectedSigiloIds.filter(id => id !== sigiloId);
        } else {
            this.selectedIds = [...selectedSigiloIds, sigiloId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.sigilos.length && this.selectedIds.length > 0);
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
