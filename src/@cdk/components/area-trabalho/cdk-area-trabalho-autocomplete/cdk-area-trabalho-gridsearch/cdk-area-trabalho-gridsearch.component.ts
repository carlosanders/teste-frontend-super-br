import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation, EventEmitter
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {AreaTrabalhoService} from '@cdk/services/area-trabalho.service';
import {AreaTrabalho} from '@cdk/models/area-trabalho.model';

@Component({
    selector: 'cdk-area-trabalho-gridsearch',
    templateUrl: './cdk-area-trabalho-gridsearch.component.html',
    styleUrls: ['./cdk-area-trabalho-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAreaTrabalhoGridsearchComponent {

    @Input()
    filter = {};

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
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._areaTrabalhoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.areaTrabalhos = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

    reload(params): void {
        params = {
            ...params,
            filter: {
                ...params.gridFilter,
                ...this.filter
            },
            populate: ['populateAll']
        };
        this.load(params);
    }

    select(areaTrabalho): void {
        this.selected.emit(areaTrabalho);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
