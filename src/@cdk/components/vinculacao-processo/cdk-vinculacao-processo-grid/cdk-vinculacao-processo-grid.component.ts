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

import {Processo, VinculacaoProcesso} from '@cdk/models';
import {VinculacaoProcessoDataSource} from '@cdk/data-sources/vinculacao-processo-data-source';
import {FormControl} from '@angular/forms';
import {CdkChaveAcessoPluginComponent} from '../../chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginService} from '../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-vinculacao-processo-grid',
    templateUrl: './cdk-vinculacao-processo-grid.component.html',
    styleUrls: ['./cdk-vinculacao-processo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoProcessoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    vinculacoesProcessos: VinculacaoProcesso[];

    @Input()
    processoRef: Processo;

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Output()
    view = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'processo', 'processoVinculado.NUP', 'modalidadeVinculacaoProcesso.valor',
        'observacao', 'actions'];

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
            id: 'processo',
            label: 'NUP',
            fixed: true
        },
        {
            id: 'processoVinculado.NUP',
            label: 'Processo Vinculado',
            fixed: false
        },
        {
            id: 'modalidadeVinculacaoProcesso.valor',
            label: 'Modalidade da Vinculacao do Processo',
            fixed: false
        },
        {
            id: 'observacao',
            label: 'Observação',
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
    actions: string[] = ['edit', 'delete', 'select', 'view'];

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
    selected = new EventEmitter<VinculacaoProcesso>();

    @Output()
    selectedIds: number[] = [];

    dataSource: VinculacaoProcessoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _dialog
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _dialog: MatDialog,
        private _loginService: LoginService
    ) {
        this.gridFilter = {};
        this.vinculacoesProcessos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new VinculacaoProcessoDataSource(of(this.vinculacoesProcessos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new VinculacaoProcessoDataSource(of(this.vinculacoesProcessos));

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
        this._cdkSidebarService.getSidebar('cdk-vinculacao-processo-filter').toggleOpen();
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

    editVinculacaoProcesso(vinculacaoProcessoId): void {
        this.edit.emit(vinculacaoProcessoId);
    }

    selectVinculacaoProcesso(vinculacaoProcesso: VinculacaoProcesso): void {
        this.selected.emit(vinculacaoProcesso);
    }

    deleteVinculacaoProcesso(vinculacaoProcessoId): void {
        this.delete.emit(vinculacaoProcessoId);
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
        const arr = Object.keys(this.vinculacoesProcessos).map(k => this.vinculacoesProcessos[k]);
        this.selectedIds = arr.map(vinculacaoProcesso => vinculacaoProcesso.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(vinculacaoProcessoId): void {
        const selectedVinculacaoProcessoIds = [...this.selectedIds];

        if (selectedVinculacaoProcessoIds.find(id => id === vinculacaoProcessoId) !== undefined) {
            this.selectedIds = selectedVinculacaoProcessoIds.filter(id => id !== vinculacaoProcessoId);
        } else {
            this.selectedIds = [...selectedVinculacaoProcessoIds, vinculacaoProcessoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.vinculacoesProcessos.length && this.selectedIds.length > 0);
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

    viewProcesso(vinculacaoProcesso: VinculacaoProcesso): void {

        let processo = vinculacaoProcesso.processoVinculado;

        if (this.processoRef && this.processoRef.id === vinculacaoProcesso.processoVinculado.id) {
            processo = vinculacaoProcesso.processo;
        }

        if (processo.visibilidadeExterna || this._loginService.isGranted('ROLE_COLABORADOR')) {
            this.view.emit({id: processo.id});
            return;
        }

        const dialogRef = this._dialog.open(CdkChaveAcessoPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
            this.view.emit({id: processo.id, chaveAcesso: result});
            return;
        });
    }
}
