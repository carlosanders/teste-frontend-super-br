import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import {catchError, finalize} from 'rxjs/operators';

import {LogEntry, Pagination} from '@cdk/models';

import {LogEntryService} from '@cdk/services/logentry.service';

@Component({
    selector: 'cdk-logentry-gridsearch',
    templateUrl: './cdk-logentry-gridsearch.component.html',
    styleUrls: ['./cdk-logentry-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLogentryGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

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

        if (params && params.filter) {
            this._logEntryService.getLogs(
                JSON.stringify(params.filter),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate))
                .pipe(finalize(() => this.loading = false),
                    catchError(() => of([]))
                ).subscribe((response) => {
                this.logEntrys = response['entities'];
                this.total = response['total'];
                this._changeDetectorRef.markForCheck();
            });
        }
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

    select(logEntry): void {
        this.selected.emit(logEntry);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
