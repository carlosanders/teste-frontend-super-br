import {
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
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {Setor} from '@cdk/models';
import {FormControl} from '@angular/forms';
import {DataSource} from '../../../data-sources/data-source';

@Component({
    selector: 'cdk-bloco-destinatario-grid',
    templateUrl: './cdk-bloco-destinatario-grid.component.html',
    styleUrls: ['./cdk-bloco-destinatario-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkBlocoDestinatarioGridComponent implements OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    destinatarios: any[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

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
    actions: string[] = ['select'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    view = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Setor>();

    @Output()
    selectedIds: number[] = [];

    dataSource: DataSource<any>;

    hasSelected = false;

    isIndeterminate = false;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'tipo', 'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.destinatarios = [];
    }

    ngOnChanges(): void {

        this.dataSource = new DataSource(of(this.destinatarios));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new DataSource(of(this.destinatarios));

    }

    selectDestinatario(destinatario: any): void {
        this.selected.emit(destinatario);
    }

    deleteDestinatario(destinatarioId): void {
        this.delete.emit(destinatarioId);
    }

    deleteDestinatarios(destinatariosId): void {
        destinatariosId.forEach(destinatarioId => this.deleteDestinatario(destinatarioId));
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
        const arr = Object.keys(this.destinatarios).map(k => this.destinatarios[k]);
        this.selectedIds = arr.map(processo => processo.id);
        this.recompute();
    }

    /**
     * Deselect all
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(processoId): void {
        const selectedProcessoIds = [...this.selectedIds];

        if (selectedProcessoIds.find(id => id === processoId) !== undefined) {
            this.selectedIds = selectedProcessoIds.filter(id => id !== processoId);
        } else {
            this.selectedIds = [...selectedProcessoIds, processoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.destinatarios.length && this.selectedIds.length > 0);
    }

    doCancel(): void {
        this.cancel.emit();
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
}
