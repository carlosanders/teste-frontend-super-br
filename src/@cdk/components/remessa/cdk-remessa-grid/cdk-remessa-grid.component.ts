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
    QueryList,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {Tramitacao} from '@cdk/models';
import {TramitacaoDataSource} from '@cdk/data-sources/tramitacao-data-source';
import {FormControl} from '@angular/forms';
import {modulesConfig} from '../../../../modules/modules-config';
import {DynamicService} from '../../../../modules/dynamic.service';
import {CdkConfigService} from "../../../services/config.service";

@Component({
    selector: 'cdk-remessa-grid',
    templateUrl: './cdk-remessa-grid.component.html',
    styleUrls: ['./cdk-remessa-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRemessaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    remessas: Tramitacao[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'setorOrigem.nome', 'pessoaDestino.nome',
        'dataHoraRecebimento', 'usuarioRecebimento.nome', 'actions'];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true
        },
        {
            id: 'processo',
            label: 'NUP',
            fixed: true
        },
        {
            id: 'observacao',
            label: 'Observação',
            fixed: true
        },
        {
            id: 'urgente',
            label: 'Urgente',
            fixed: false
        },
        {
            id: 'setorOrigem.nome',
            label: 'Setor Origem',
            fixed: false
        },
        {
            id: 'dataHoraRecebimento',
            label: 'Data Hora Recebimento',
            fixed: false
        },
        {
            id: 'usuarioRecebimento.nome',
            label: 'Usuário Recebimento',
            fixed: false
        },
        {
            id: 'pessoaDestino.nome',
            label: 'Pessoa Destino',
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
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    selected = new EventEmitter<Tramitacao>();

    @Output()
    selectedIds: number[] = [];

    @Output()
    recebimento = new EventEmitter<number>();

    @Input()
    recebendoIds: number[] = [];

    @Input()
    recebidoIds: number[] = [];

    dataSource: TramitacaoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    @Output()
    statusBarramento = new EventEmitter<number[]>();

    @ViewChildren('buttonModule', {read: ViewContainerRef}) btContainer: QueryList<ViewContainerRef>;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _dynamicService
     * @param _cdkConfigService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _dynamicService: DynamicService,
        public _cdkConfigService: CdkConfigService
    ) {
        this.gridFilter = {};
        this.remessas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new TramitacaoDataSource(of(this.remessas));
        this.paginator.length = this.total;

        if (this.remessas) {
            this.carregaModulo();
        }
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.paginator._intl.firstPageLabel = 'Primeiro';
        this.paginator._intl.lastPageLabel = 'Último';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new TramitacaoDataSource(of(this.remessas));

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

    carregaModulo(): void {
        if (this.btContainer) {
            this.btContainer.reset([]);
        }
        const path = '@cdk/components/remessa/cdk-remessa-grid/cdk-remessa-grid#button';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.btContainer.forEach((button, index) => {
                                const componentRef = button.createComponent(componentFactory);
                                componentRef.instance['remessaId'] = this.remessas[index]['id'];
                                componentRef.instance['mecanismoRemessa'] = this.remessas[index]['mecanismoRemessa'];
                                componentRef.instance['apagadoEm'] = !!this.remessas[index]['apagadoEm'];
                            });
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }
        });
    }

    toggleFilter(): void {
        this._cdkSidebarService.getSidebar('cdk-remessa-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : null;
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

    editRemessa(remessaId): void {
        this.edit.emit(remessaId);
    }

    selectRemessa(remessa: Tramitacao): void {
        this.selected.emit(remessa);
    }

    deleteRemessa(remessaId): void {
        this.delete.emit(remessaId);
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
        const arr = Object.keys(this.remessas).map(k => this.remessas[k]);
        this.selectedIds = arr.map(remessa => remessa.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(remessaId): void {
        const selectedRemessaIds = [...this.selectedIds];

        if (selectedRemessaIds.find(id => id === remessaId) !== undefined) {
            this.selectedIds = selectedRemessaIds.filter(id => id !== remessaId);
        } else {
            this.selectedIds = [...selectedRemessaIds, remessaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.remessas.length && this.selectedIds.length > 0);
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

    editRecebimento(tramitacaoId): void {
        this.recebimento.emit(tramitacaoId);
    }

    verificaStatusBarramento(documentosAvulsosId: number[]): void {
        this.statusBarramento.emit(documentosAvulsosId);
    }

}
