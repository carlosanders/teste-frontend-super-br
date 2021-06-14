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

import {AreaTrabalhoService} from '@cdk/services/area-trabalho.service';
import {AreaTrabalho, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-area-trabalho-gridsearch',
    templateUrl: './cdk-area-trabalho-gridsearch.component.html',
    styleUrls: ['./cdk-area-trabalho-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAreaTrabalhoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    areaTrabalhos: AreaTrabalho[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _areaTrabalhoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _areaTrabalhoService: AreaTrabalhoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;
        this._areaTrabalhoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.areaTrabalhos = response['entities'];
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

    select(areaTrabalho): void {
        this.selected.emit(areaTrabalho);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
