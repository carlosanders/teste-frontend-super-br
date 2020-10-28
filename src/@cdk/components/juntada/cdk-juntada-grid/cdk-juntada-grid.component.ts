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
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {ComponenteDigital, Juntada} from '@cdk/models';
import {JuntadaDataSource} from '@cdk/data-sources/juntada-data-source';
import {FormControl} from '@angular/forms';
import {ComponenteDigitalService} from '../../../services/componente-digital.service';
import {CdkAssinaturaEletronicaPluginComponent} from '../../componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'cdk-juntada-grid',
    templateUrl: './cdk-juntada-grid.component.html',
    styleUrls: ['./cdk-juntada-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkJuntadaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    juntadas: Juntada[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Output()
    desentranharBloco = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'numeracaoSequencial', 'descricao', 'documento.tipoDocumento.nome', 'actions'];

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
            id: 'descricao',
            label: 'Descrição',
            fixed: true
        },
        {
            id: 'numeracaoSequencial',
            label: 'Numeração Sequencial',
            fixed: false
        },
        {
            id: 'ativo',
            label: 'Ativo',
            fixed: false
        },
        {
            id: 'documento.tipoDocumento.nome',
            label: 'Tipo Documento',
            fixed: false
        },
        {
            id: 'origemDados',
            label: 'Origem de Dados',
            fixed: false
        },
        {
            id: 'volume.numeracaoSequencial',
            label: 'Volume',
            fixed: false
        },
        {
            id: 'documentoAvulso.especieDocumentoAvulso.nome',
            label: 'Documento Avulso',
            fixed: false
        },
        {
            id: 'atividade.especieAtividade.nome',
            label: 'Atividade',
            fixed: false
        },
        {
            id: 'tarefa.especieTarefa.nome',
            label: 'Tarefa',
            fixed: false
        },
        {
            id: 'documento.componentesDigitais.extensao',
            label: 'Componentes Digitais',
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
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'desentranhar', 'copiar'];

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
    desentranhar = new EventEmitter<number[]>();

    @Output()
    copiar = new EventEmitter<number[]>();

    @Output()
    selected = new EventEmitter<Juntada>();

    @Output()
    selectedIds: number[] = [];

    @Output()
    assinar = new EventEmitter<number[]>();

    dataSource: JuntadaDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    @Input()
    assinandoId: number[] = [];

    @Output()
    removeAssinatura = new EventEmitter<number>();

    @Input()
    removendoAssinaturaId: number[] = [];

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _componenteDigitalService
     * @param dialog
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _componenteDigitalService: ComponenteDigitalService,
        public dialog: MatDialog,
    ) {
        this.gridFilter = {};
        this.juntadas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new JuntadaDataSource(of(this.juntadas));
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

        this.dataSource = new JuntadaDataSource(of(this.juntadas));

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
        this._cdkSidebarService.getSidebar('cdk-juntada-filter').toggleOpen();
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
        this.hasExcluded = false;
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
        } else {
            this.loadPage();
        }
    }

    editJuntada(documentoId): void {
        this.edit.emit(documentoId);
    }

    selectJuntada(juntada: Juntada): void {
        this.selected.emit(juntada);
    }

    deleteJuntada(juntadaId): void {
        this.delete.emit(juntadaId);
    }

    deleteJuntadas(juntadasId): void {
        juntadasId.forEach(juntadaId => this.deleteJuntada(juntadaId));
    }

    desentranharJuntadas(juntadasId: number[]): void {
        this.desentranhar.emit(juntadasId);
    }

    copiarJuntadas(juntadasId: number[]): void {
        this.copiar.emit(juntadasId);
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
        const arr = Object.keys(this.juntadas).map(k => this.juntadas[k]);
        this.selectedIds = arr.map(juntada => juntada.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(juntadaId): void {
        const selectedJuntadaIds = [...this.selectedIds];

        if (selectedJuntadaIds.find(id => id === juntadaId) !== undefined) {
            this.selectedIds = selectedJuntadaIds.filter(id => id !== juntadaId);
        } else {
            this.selectedIds = [...selectedJuntadaIds, juntadaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.juntadas.length && this.selectedIds.length > 0);
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

    download(componenteDigital: ComponenteDigital): void {
        this._componenteDigitalService.download(componenteDigital.id).subscribe(
            response => {
                fetch(response.conteudo)
                    .then(res => res.blob())
                    .then(content => {
                        // downloadLink.download = 'name_to_give_saved_file.pdf';
                        const blob = new Blob([content], {type: componenteDigital.mimetype}),
                            URL = window.URL,
                            downloadUrl = URL.createObjectURL(blob),
                            downloadLink = document.createElement('a');
                        downloadLink.target = '_blank';
                        downloadLink.href = downloadUrl;
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        URL.revokeObjectURL(downloadUrl);
                    });
            }
        );
    }

    addDesentranhar(juntada: Juntada): void {
        this.desentranharBloco.emit(juntada);
    }

    doAssinar(documento): void {
        const dialogRef = this.dialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            result.documento = documento;
            this.assinar.emit(result);
        });
    }

    doRemoveAssinatura(documentoId): void {
        this.removeAssinatura.emit(documentoId);
    }
}
