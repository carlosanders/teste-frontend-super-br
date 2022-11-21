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
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {DocumentoDataSource} from '@cdk/data-sources/documento-data-source';
import {ComponenteDigital, Documento} from '@cdk/models';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {FormControl} from '@angular/forms';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'cdk-documento-grid',
    templateUrl: './cdk-documento-grid.component.html',
    styleUrls: ['./cdk-documento-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    documentos: Documento[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'tipoDocumento.nome', 'tipoDocumento.especieDocumento.nome',
        'componentesDigitais.extensao', 'actions'];

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
            id: 'processoOrigem.NUP',
            label: 'NUP',
            fixed: true
        },
        {
            id: 'descricaoOutros',
            label: 'Descrição Outros',
            fixed: false
        },
        {
            id: 'numeroFolhas',
            label: 'Número de Folhas',
            fixed: false
        },
        {
            id: 'outroNumero',
            label: 'Outro Número',
            fixed: false
        },
        {
            id: 'semEfeito',
            label: 'Sem Efeito',
            fixed: false
        },
        {
            id: 'redator',
            label: 'Redator',
            fixed: false
        },
        {
            id: 'destinatario',
            label: 'Destinatário',
            fixed: false
        },
        {
            id: 'localizadorOriginal',
            label: 'Localizador Original',
            fixed: false
        },
        {
            id: 'localProducao',
            label: 'Local Produção',
            fixed: false
        },
        {
            id: 'autor',
            label: 'Autor',
            fixed: false
        },
        {
            id: 'observacao',
            label: 'Observação',
            fixed: false
        },
        {
            id: 'copia',
            label: 'Cópia',
            fixed: false
        },
        {
            id: 'dataHoraProducao',
            label: 'Data Produção',
            fixed: false
        },
        {
            id: 'documentoOrigem.localizadorOriginal',
            label: 'Documento de Origem',
            fixed: false
        },
        {
            id: 'procedencia.nome',
            label: 'Procedência',
            fixed: false
        },
        {
            id: 'tipoDocumento.nome',
            label: 'Nome Documento',
            fixed: false
        },
        {
            id: 'tipoDocumento.especieDocumento.nome',
            label: 'Espécie Documento',
            fixed: false
        },
        {
            id: 'setorOrigem.nome',
            label: 'Setor de Origem',
            fixed: false
        },
        {
            id: 'componentesDigitais.extensao',
            label: 'Componentes Digitais',
            fixed: false
        },
        {
            id: 'tarefaOrigem.especieTarefa.nome',
            label: 'Espécie Tarefa',
            fixed: false
        },
        {
            id: 'juntadaAtual.numeracaoSequencial',
            label: 'Juntada Atual',
            fixed: false
        },
        {
            id: 'origemDados',
            label: 'Origem dos Dados',
            fixed: false
        },
        {
            id: 'documentoAvulsoRemessa.especieDocumentoAvulso.nome',
            label: 'Documento Avulso da Remessa',
            fixed: false
        },
        {
            id: 'modelo.nome',
            label: 'Modelo',
            fixed: false
        },
        {
            id: 'repositorio.nome',
            label: 'Tese',
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
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Documento>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    selectedIds: number[] = [];

    dataSource: DocumentoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    /**
     * @param _changeDetectorRef
     * @param _componenteDigitalService
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _componenteDigitalService: ComponenteDigitalService,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
    }

    ngOnChanges(): void {
        this.dataSource = new DocumentoDataSource(of(this.documentos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new DocumentoDataSource(of(this.documentos));

        this.columns.setValue(this.allColumns.map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.allColumns.forEach((c) => {
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
        this._cdkSidebarService.getSidebar('cdk-documento-filter').toggleOpen();
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

    editDocumento(documentoId): void {
        this.edit.emit(documentoId);
    }

    selectDocumento(documento: Documento): void {
        this.selected.emit(documento);
    }

    deleteDocumento(documentoId): void {
        this.delete.emit(documentoId);
    }

    deleteDocumentos(documentosId): void {
        documentosId.forEach(documentoId => this.deleteDocumento(documentoId));
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
        const arr = Object.keys(this.documentos).map(k => this.documentos[k]);
        this.selectedIds = arr.map(documento => documento.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(documentoId): void {
        const selectedDocumentoIds = [...this.selectedIds];

        if (selectedDocumentoIds.find(id => id === documentoId) !== undefined) {
            this.selectedIds = selectedDocumentoIds.filter(id => id !== documentoId);
        } else {
            this.selectedIds = [...selectedDocumentoIds, documentoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);
        this.changedSelectedIds.emit(this.selectedIds);
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

    download(componenteDigital: ComponenteDigital): void {
        this._componenteDigitalService.download(componenteDigital.id).subscribe(
            (response) => {
                fetch(response.conteudo)
                    .then(res => res.blob())
                    .then((content) => {
                        // downloadLink.download = 'name_to_give_saved_file.pdf';
                        const blob = new Blob([content], {type: componenteDigital.mimetype});
                            const URL = window.URL;
                            const downloadUrl = URL.createObjectURL(blob);
                            const downloadLink = document.createElement('a');
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
}
