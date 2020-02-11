import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation, EventEmitter, OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination} from '@cdk/models/pagination';

import {GarantiaAdministrativoService} from '@cdk/services/garantia-administrativo.service';
import {GarantiaAdministrativo} from '@cdk/models/garantia-administrativo.model';

@Component({
    selector: 'cdk-garantia-administrativo-gridsearch',
    templateUrl: './cdk-garantia-administrativo-gridsearch.component.html',
    styleUrls: ['./cdk-garantia-administrativo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkGarantiaAdministrativoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    garantiasAdministrativos: GarantiaAdministrativo[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _garantiaAdministrativoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _garantiaAdministrativoService: GarantiaAdministrativoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._garantiaAdministrativoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.garantiasAdministrativos = response['entities'];
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

    select(garantiaAdministrativo): void {
        this.selected.emit(garantiaAdministrativo);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
