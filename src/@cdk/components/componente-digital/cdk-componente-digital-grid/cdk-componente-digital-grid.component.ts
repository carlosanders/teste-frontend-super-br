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
import {MatDialog, MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {ComponenteDigitalDataSource} from '@cdk/data-sources/componente-digital-data-source';
import {ComponenteDigital} from '@cdk/models';
import {environment} from 'environments/environment';
import {FormControl} from '@angular/forms';
import { CdkChaveAcessoPluginComponent } from '@cdk/components/chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.component';

@Component({
    selector: 'cdk-componente-digital-grid',
    templateUrl: './cdk-componente-digital-grid.component.html',
    styleUrls: ['./cdk-componente-digital-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkComponenteDigitalGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    componentesDigitais: ComponenteDigital[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Input()
    displayedColumns: string[] = ['select', 'id', 'documento.juntadaAtual.volume.processo.NUP', 'documento.tipoDocumento', 'highlights', 'actions'];

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
            id: 'conteudo',
            label: 'Conteúdo',
            fixed: false
        },
        {
            id: 'editavel',
            label: 'Editável',
            fixed: false
        },
        {
            id: 'assinado',
            label: 'Assinado',
            fixed: false
        },
        {
            id: 'fileName',
            label: 'Arquivo',
            fixed: false
        },
        {
            id: 'highlights',
            label: 'Resumo',
            fixed: false
        },
        {
            id: 'numeracaoSequencial',
            label: 'Numeração Sequencial',
            fixed: false
        },
        {
            id: 'tamanho',
            label: 'Tamanho',
            fixed: false
        },
        {
            id: 'nivelComposicao',
            label: 'Nível Composição',
            fixed: false
        },
        {
            id: 'softwareCriacao',
            label: 'Software de Criação',
            fixed: false
        },
        {
            id: 'chaveInibidor',
            label: 'Chave Inibidor',
            fixed: false
        },
        {
            id: 'versaoSoftwareCriacao',
            label: 'Versão do Software de Criação',
            fixed: false
        },
        {
            id: 'mimetype',
            label: 'Mimetype',
            fixed: false
        },
        {
            id: 'extensao',
            label: 'Extensão',
            fixed: false
        },
        {
            id: 'usernameLockEdicao',
            label: 'Username Lock Edição',
            fixed: false
        },
        {
            id: 'dataHoraSoftwareCriacao',
            label: 'Data Software Criação',
            fixed: false
        },
        {
            id: 'dataHoraLockEdicao',
            label: 'Data Lock Edição',
            fixed: false
        },
        {
            id: 'modalidadeAlvoInibidor.valor',
            label: 'Modalidade Alvo Inibidor',
            fixed: false
        },
        {
            id: 'modalidadeTipoInibidor.valor',
            label: 'Modalidade Tipo Inibidor',
            fixed: false
        },
        {
            id: 'modelo.nome',
            label: 'Modelo',
            fixed: false
        },
        {
            id: 'documento.juntadaAtual.volume.processo.NUP',
            label: 'NUP',
            fixed: false
        },
        {
            id: 'tarefaOrigem.especieTarefa.nome',
            label: 'Tarefa de Origem',
            fixed: false
        },
        {
            id: 'documentoAvulsoOrigem.especieDocumentoAvulso.nome',
            label: 'Documento Avulso Origem',
            fixed: false
        },
        {
            id: 'origemDados.fonteDados',
            label: 'Origem dos Dados',
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

    @Input() target = `${environment.api_url}componente_digital` + environment.xdebug;

    @Input()
    actions: string[] = ['select', 'edit', 'delete', 'cancel', 'retry'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    complete = new EventEmitter<string>();

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    view = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<ComponenteDigital>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<ComponenteDigital>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ComponenteDigitalDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private dialog: MatDialog
    ) {
        this.gridFilter = {};
        this.componentesDigitais = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ComponenteDigitalDataSource(of(this.componentesDigitais));
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

        this.dataSource = new ComponenteDigitalDataSource(of(this.componentesDigitais));

        // if (this.mode === 'search') {
        //     this.toggleFilter();
        // }

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
        this._fuseSidebarService.getSidebar('cdk-componente-digital-main-sidebar').toggleOpen();
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

    viewComponenteDigital(componenteDigital: ComponenteDigital): void {
        if (componenteDigital.documento.juntadaAtual.volume.processo.visibilidadeExterna) {
            this.view.emit({id: componenteDigital.id});
            return;
        }

        const dialogRef = this.dialog.open(CdkChaveAcessoPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            this.view.emit({id: componenteDigital.id, chave_acesso: result});
            return;
        });
    }

    editComponenteDigital(componenteDigital: ComponenteDigital): void {
        this.edit.emit(componenteDigital);
    }

    selectComponenteDigital(componenteDigital: ComponenteDigital): void {
        this.selected.emit(componenteDigital);
    }

    deleteComponenteDigital(componenteDigitalId): void {
        this.delete.emit(componenteDigitalId);
    }

    deleteComponentesDigitais(componentesDigitaisId): void {
        componentesDigitaisId.forEach(componenteDigitalId => this.deleteComponenteDigital(componenteDigitalId));
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
        const arr = Object.keys(this.componentesDigitais).map(k => this.componentesDigitais[k]);
        this.selectedIds = arr.map(componenteDigital => componenteDigital.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(componenteDigitalId): void {
        const selectedComponentesDigitaisIds = [...this.selectedIds];

        if (selectedComponentesDigitaisIds.find(id => id === componenteDigitalId) !== undefined) {
            this.selectedIds = selectedComponentesDigitaisIds.filter(id => id !== componenteDigitalId);
        } else {
            this.selectedIds = [...selectedComponentesDigitaisIds, componenteDigitalId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.componentesDigitais.length && this.selectedIds.length > 0);
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
