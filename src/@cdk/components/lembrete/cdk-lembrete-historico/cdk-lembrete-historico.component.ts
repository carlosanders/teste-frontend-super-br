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
import {cdkAnimations} from '../../../animations';
import {Lembrete} from '../../../models';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatSort} from '../../../angular/material';
import {LembreteDataSource} from '../../../data-sources/lembrete-data-source';
import {CdkSidebarService} from '../../sidebar/sidebar.service';
import {merge, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

@Component({
    selector: 'cdk-lembrete-historico',
    templateUrl: './cdk-lembrete-historico.component.html',
    styleUrls: ['./cdk-lembrete-historico.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLembreteHistoricoComponent implements AfterViewInit, OnInit, OnChanges {
    @Input()
    loading = false;

    @Input()
    lembretes: Lembrete[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['id', 'conteudo', 'criadoEm'];

    allColumns: any[] = [
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
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false
        },
        {
            id: 'criadoEm',
            label: 'Criado Em',
            fixed: true
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
        }
    ];
    columns = new FormControl();
    @Input()
    pageSize = 10;
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;
    @ViewChild(MatSort, {static: true})
    sort: MatSort;
    @Output()
    reload = new EventEmitter<any>();
    @Output()
    cancel = new EventEmitter<any>();
    dataSource: LembreteDataSource;
    showFilter = false;
    gridFilter: any;
    isIndeterminate = false;
    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.lembretes = [];
    }

    ngOnChanges(): void {
        this.dataSource = new LembreteDataSource(of(this.lembretes));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();
        this.initConfigTable();
        this.dataSource = new LembreteDataSource(of(this.lembretes));
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
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(
            this.sort.sortChange,
            this.paginator.page
        ).pipe(
            tap(() => this.loadPage())
        ).subscribe();
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto :  {};
        this.reload.emit({
            gridFilter: filter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }

    initConfigTable(): void {
        this.paginator.pageSize = this.pageSize;
    }
}
