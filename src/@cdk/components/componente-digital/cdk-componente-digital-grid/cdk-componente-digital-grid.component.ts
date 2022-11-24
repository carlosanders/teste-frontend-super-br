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
import {MatDialog, MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {ComponenteDigitalDataSource} from '@cdk/data-sources/componente-digital-data-source';
import {ComponenteDigital, Pagination} from '@cdk/models';
import {environment} from 'environments/environment';
import {FormControl} from '@angular/forms';
import {CdkChaveAcessoPluginComponent} from '@cdk/components/chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.component';

@Component({
    selector: 'cdk-componente-digital-grid',
    templateUrl: './cdk-componente-digital-grid.component.html',
    styleUrls: ['./cdk-componente-digital-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
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
    saving = false;

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'documento.id', 'documento.juntadaAtual.volume.processo.NUP', 'documento.tipoDocumento', 'actions'];

    @Input()
    mobileMode = false;

    @Input()
    deletingIds: number[] = [];

    @Input()
    isColaborador = false;

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input() target = `${environment.api_url}administrativo/componente_digital` + environment.xdebug;

    @Input()
    actions: string[] = ['select', 'edit', 'delete', 'cancel', 'retry', 'abrirOutraAba'];

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    view = new EventEmitter<ComponenteDigital>();

    @Output()
    selected = new EventEmitter<ComponenteDigital>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'id',
            label: 'Id',
            fixed: true,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'editavel',
            label: 'Editável',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'assinado',
            label: 'Assinado',
            fixed: false,
            mode: 'all',
            sort: 'none'
        },
        {
            id: 'fileName',
            label: 'Arquivo',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'numeracaoSequencial',
            label: 'Numeração Sequencial',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'tamanho',
            label: 'Tamanho',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'nivelComposicao',
            label: 'Nível Composição',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'softwareCriacao',
            label: 'Software de Criação',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'chaveInibidor',
            label: 'Chave Inibidor',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'versaoSoftwareCriacao',
            label: 'Versão do Software de Criação',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'mimetype',
            label: 'Mimetype',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'extensao',
            label: 'Extensão',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'dataHoraSoftwareCriacao',
            label: 'Data Software Criação',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'modalidadeAlvoInibidor.valor',
            label: 'Modalidade Alvo Inibidor',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'modalidadeTipoInibidor.valor',
            label: 'Modalidade Tipo Inibidor',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'modelo.nome',
            label: 'Modelo',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'documento.juntadaAtual.volume.processo.NUP',
            label: 'NUP',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'documento.juntadaAtual.criadoEm',
            label: 'Juntado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'documento.juntadaAtual.criadoPor.nome',
            label: 'Juntado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'origemDados',
            label: 'Origem dos Dados',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'criadoEm',
            label: 'Criado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'atualizadoPor.nome',
            label: 'Atualizado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'atualizadoEm',
            label: 'Atualizado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'apagadoPor.nome',
            label: 'Apagado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'apagadoEm',
            label: 'Apagado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'actions',
            label: '',
            fixed: true,
            mode: 'all',
            sort: 'all'
        }
    ];

    columns = new FormControl();

    dataSource: ComponenteDigitalDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    routerState: any;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _dialog
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _dialog: MatDialog
    ) {
        this.gridFilter = {};
        this.componentesDigitais = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ComponenteDigitalDataSource(of(this.componentesDigitais));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new ComponenteDigitalDataSource(of(this.componentesDigitais));

        this.columns.setValue(this.getAllColumns().map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.getAllColumns().forEach((c) => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        this.displayedColumns.push(c.id);
                    }
                });
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
    }

    getSort(columnId: string): boolean {
        let disabled = true;
        this.getAllColumns().forEach((c) => {
            if (c.id === columnId && (c.sort === 'all' || c.sort === this.mode)) {
                disabled = false;
            }
        });
        return disabled;
    }

    getAllColumns(): any[] {
        return this.allColumns.filter(
            c => c.mode === 'all' || c.mode === this.mode
        );
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
        this._cdkSidebarService.getSidebar('cdk-componente-digital-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const newFilter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : {};
        contexto['mostrarApagadas'] = this.hasExcluded;
        this.reload.emit({
            gridFilter: newFilter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
    }

    loadExcluded(): void {
        this.hasExcluded = !this.hasExcluded;
        if (this.hasExcluded) {
            const newFilter = this.gridFilter.filters;
            this.excluded.emit({
                gridFilter: newFilter,
                limit: this.paginator.pageSize,
                offset: (this.paginator.pageSize * this.paginator.pageIndex),
                sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
                context: {mostrarApagadas: true}
            });
        } else {
            this.loadPage();
        }
    }

    editComponenteDigital(componenteDigital: ComponenteDigital): void {
        if (componenteDigital.documento?.juntadaAtual?.volume?.processo?.visibilidadeExterna || this.isColaborador) {
            this.edit.emit({componenteDigital: componenteDigital});
            return;
        }

        const dialogRef = this._dialog.open(CdkChaveAcessoPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
            this.edit.emit({
                componenteDigital: componenteDigital,
                chaveAcesso: result
            });
            return;
        });
    }

    selectComponenteDigital(componenteDigital: ComponenteDigital): void {
        this.selected.emit(componenteDigital);
    }

    viewComponenteDigital(componenteDigital: ComponenteDigital): void {
        this.view.emit(componenteDigital);
    }

    deleteComponenteDigital(componenteDigitalId): void {
        this.delete.emit(componenteDigitalId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
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

    setFilter(gridFilter): void {
        if(this.mobileMode && this.componentesDigitais) {
            (<HTMLInputElement>document.getElementById('sidebarId')).classList.remove('mobile-componente-pesquisa-on');
            (<HTMLInputElement>document.getElementById('sidebarId')).classList.add('mobile-componente-pesquisa-off');
            (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.remove('mobile-componente-lista-off');
            (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.add('mobile-componente-lista-on');
        }
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

    cssPesquisaOn(): void {
        (<HTMLInputElement>document.getElementById('sidebarId')).classList.remove('mobile-componente-pesquisa-off');
        (<HTMLInputElement>document.getElementById('sidebarId')).classList.add('mobile-componente-pesquisa-on');
        (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.remove('mobile-componente-lista-on');
        (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.add('mobile-componente-lista-off');
    }

    visualizarProcessoNovaAba(componenteDigital: ComponenteDigital): void {
        window.open( '/apps/processo/' + componenteDigital.documento.juntadaAtual.volume.processo.id
            + '/visualizar', '_blank');
    }
}
