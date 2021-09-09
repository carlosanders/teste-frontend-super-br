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

import {Pagination, RegraEtiqueta} from '@cdk/models';

import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';

@Component({
    selector: 'cdk-regra-etiqueta-gridsearch',
    templateUrl: './cdk-regra-etiqueta-gridsearch.component.html',
    styleUrls: ['./cdk-regra-etiqueta-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRegraEtiquetaGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    regrasEtiqueta: RegraEtiqueta[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _regraEtiquetaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _regraEtiquetaService: RegraEtiquetaService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._regraEtiquetaService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.regrasEtiqueta = response['entities'];
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

    select(regraEtiqueta): void {
        this.selected.emit(regraEtiqueta);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
