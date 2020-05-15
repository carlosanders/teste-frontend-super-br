import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination} from '@cdk/models';

import {LogEntryService} from '@cdk/services/logentry.service';
import {LogEntry} from '@cdk/models';

@Component({
    selector: 'cdk-versao-gridsearch',
    templateUrl: './cdk-versao-gridsearch.component.html',
    styleUrls: ['./cdk-versao-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVersaoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    reverter = new EventEmitter();

    @Output()
    visualizar = new EventEmitter();

    @Output()
    comparar = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    @Input()
    filterLog: any;

    logEntrys: LogEntry[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _logEntryService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _logEntryService: LogEntryService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._logEntryService.getLog(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.logEntrys = response['entities'];
                this.total = response['total'];
                this._changeDetectorRef.markForCheck();
            });
    }

    reload(params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        };
        this.load (params);
    }

    doReverter(params): void {
        this.loading = true;
        this.reverter.emit(params);
    }

    doVisualizar(params): void {
        this.visualizar.emit(params);
    }

    doComparar(params): void {
        this.comparar.emit(params);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
