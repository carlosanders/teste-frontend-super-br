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

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination} from '@cdk/models/pagination';

import {InteressadoService} from '@cdk/services/interessado.service';
import {Interessado} from '@cdk/models/interessado.model';

@Component({
    selector: 'cdk-interessado-gridsearch',
    templateUrl: './cdk-interessado-gridsearch.component.html',
    styleUrls: ['./cdk-interessado-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkInteressadoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    interessados: Interessado[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _interessadoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _interessadoService: InteressadoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._interessadoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.interessados = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

   reload (params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate,
                ...params.populate
            ]
        };
        this.load (params);
    }

    select(interessado): void {
        this.selected.emit(interessado);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
