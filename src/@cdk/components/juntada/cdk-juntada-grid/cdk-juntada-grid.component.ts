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
import {ComponenteDigital, Documento, Juntada} from '@cdk/models';
import {JuntadaDataSource} from '@cdk/data-sources/juntada-data-source';
import {FormControl} from '@angular/forms';
import {ComponenteDigitalService} from '../../../services/componente-digital.service';
import {CdkAssinaturaEletronicaPluginComponent} from '../../componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {MatDialog} from '@angular/material/dialog';
import {CdkJuntadaFilterComponent} from '../sidebars/cdk-juntada-filter/cdk-juntada-filter.component';

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
            id: 'documento.componentesDigitais.extensao',
            label: 'Componentes Digitais',
            fixed: false
        },
        {
            id: 'documento.setorOrigem.nome',
            label: 'Setor',
            fixed: false
        },
        {
            id: 'documento.setorOrigem.unidade.nome',
            label: 'Unidade',
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
    actions: string[] = ['edit', 'delete', 'select', 'desentranhar', 'copiar', 'adicionarVinculacao', 'removerVinculacoes'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild(CdkJuntadaFilterComponent)
    cdkJuntadaFilterComponent: CdkJuntadaFilterComponent;

    @Output()
    inatived = new EventEmitter<any>();

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<Documento>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    desentranharJuntada = new EventEmitter<Juntada>();

    @Output()
    desentranhar = new EventEmitter<number[]>();

    @Output()
    copiar = new EventEmitter<number[]>();

    @Output()
    adicionarVinculacao = new EventEmitter<any>();

    @Output()
    removerVinculacoes = new EventEmitter<Juntada>();

    @Output()
    removerRestricoes = new EventEmitter<Juntada>();

    @Output()
    selected = new EventEmitter<Juntada>();

    @Output()
    selectedIds: number[] = [];

    @Output()
    assinar = new EventEmitter<number[]>();

    @Output()
    view: EventEmitter<Juntada> = new EventEmitter<Juntada>();

    dataSource: JuntadaDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;
    hasInatived = false;

    @Input()
    assinandoId: number[] = [];

    @Input()
    desentranhadoId: number[] = [];

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
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new JuntadaDataSource(of(this.juntadas));

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
        this._cdkSidebarService.getSidebar('cdk-juntada-filter').toggleOpen();
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
            this.cdkJuntadaFilterComponent.resetarFormulario();
            this.loadPage();
        }
    }

    editJuntada(documento: Documento): void {
        this.edit.emit(documento);
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

    doDesentranharJuntada(juntada: Juntada): void {
        this.desentranharJuntada.emit(juntada);
    }

    copiarJuntadas(juntadasId: number[]): void {
        this.copiar.emit(juntadasId);
    }

    viewJuntada(juntada: Juntada): void {
        this.view.emit(juntada);
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
        const selecionaveis = this.juntadas.filter(juntada => juntada.ativo && this.desentranhadoId.indexOf(juntada.id) === -1 && (this.deletedIds.indexOf(juntada.id) === -1 || this.hasExcluded));
        const arr = Object.keys(selecionaveis).map(k => selecionaveis[k]);
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

    getProp(obj, prop): any|boolean {
        if (obj && obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        return false;
    }

    doAdicionarVinculacao(juntadaId: number): void {
        this.adicionarVinculacao.emit(juntadaId);
    }

    doRemoverVinculacoes(juntada: Juntada): void {
        this.removerVinculacoes.emit(juntada);
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
                        downloadLink.download = componenteDigital.fileName;
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

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
            result.documento = documento;
            this.assinar.emit(result);
        });
    }

    doRemoveAssinatura(documentoId): void {
        this.removeAssinatura.emit(documentoId);
    }

    doRemoverRestricoes(selectedIds: number[]): void {
        const juntadasSelecionadas = this.juntadas.filter(juntada => selectedIds.includes(juntada.id));
        juntadasSelecionadas.forEach((juntada) => {
            this.removerRestricoes.emit(juntada);
        });
    }
}
