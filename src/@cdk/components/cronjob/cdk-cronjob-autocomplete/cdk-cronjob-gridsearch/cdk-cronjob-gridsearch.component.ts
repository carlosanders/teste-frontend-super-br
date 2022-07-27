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
import {Cronjob, Pagination} from '@cdk/models';

import {CronjobService} from '@cdk/services/cronjob.service';


@Component({
    selector: 'cdk-cronjob-gridsearch',
    templateUrl: './cdk-cronjob-gridsearch.component.html',
    styleUrls: ['./cdk-cronjob-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCronjobGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    cronjobs: Cronjob[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _cronjobService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cronjobService: CronjobService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._cronjobService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.cronjobs = response['entities'];
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

    select(cronjob): void {
        this.selected.emit(cronjob);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
