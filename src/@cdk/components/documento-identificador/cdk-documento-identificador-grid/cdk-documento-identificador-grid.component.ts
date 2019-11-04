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
import {DocumentoIdentificadorDataSource} from '@cdk/data-sources/documento-identificador-data-source';
import {DocumentoIdentificador} from '@cdk/models/documento-identificador.model';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-documento-identificador-grid',
    templateUrl: './cdk-documento-identificador-grid.component.html',
    styleUrls: ['./cdk-documento-identificador-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkDocumentoIdentificadorGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    documentoIdentificadors: DocumentoIdentificador[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'modalidadeDocumentoIdentificador.valor', 'codigoDocumento', 'emissorDocumento',
        'dataEmissao', 'origemDados.fonteDados', 'actions'];

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
            id: 'modalidadeDocumentoIdentificador.valor',
            label: 'Modalidade do Documento Identificador',
            fixed: true
        },
        {
            id: 'codigoDocumento',
            label: 'Código do Documento',
            fixed: false
        },
        {
            id: 'emissorDocumento',
            label: 'Emissor do Documento',
            fixed: false
        },
        {
            id: 'dataEmissao',
            label: 'Data da Emissão',
            fixed: false
        },
        {
            id: 'origemDados.fonteDados',
            label: 'Origem de Dados',
            fixed: false
        },
        {
            id: 'pessoa.nome',
            label: 'Pessoa',
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
    selected = new EventEmitter<DocumentoIdentificador>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    dataSource: DocumentoIdentificadorDataSource;

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
        this.dataSource = new DocumentoIdentificadorDataSource(of(this.documentoIdentificadors));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new DocumentoIdentificadorDataSource(of(this.documentoIdentificadors));

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
        this._fuseSidebarService.getSidebar('cdk-documento-identificador-main-sidebar').toggleOpen();
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

    editDocumentoIdentificador(documentoIdentificadorId): void {
        this.edit.emit(documentoIdentificadorId);
    }

    selectDocumentoIdentificador(documentoIdentificador: DocumentoIdentificador): void {
        this.selected.emit(documentoIdentificador);
    }

    deleteDocumentoIdentificador(documentoIdentificadorId): void {
        this.delete.emit(documentoIdentificadorId);
    }

    deleteDocumentoIdentificadors(documentoIdentificadorsId): void {
        documentoIdentificadorsId.forEach(documentoIdentificadorId => this.deleteDocumentoIdentificador(documentoIdentificadorId));
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
        const arr = Object.keys(this.documentoIdentificadors).map(k => this.documentoIdentificadors[k]);
        this.selectedIds = arr.map(documentoIdentificador => documentoIdentificador.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(documentoIdentificadorId): void {
        const selectedDocumentoIdentificadorIds = [...this.selectedIds];

        if (selectedDocumentoIdentificadorIds.find(id => id === documentoIdentificadorId) !== undefined) {
            this.selectedIds = selectedDocumentoIdentificadorIds.filter(id => id !== documentoIdentificadorId);
        } else {
            this.selectedIds = [...selectedDocumentoIdentificadorIds, documentoIdentificadorId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.documentoIdentificadors.length && this.selectedIds.length > 0);
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
