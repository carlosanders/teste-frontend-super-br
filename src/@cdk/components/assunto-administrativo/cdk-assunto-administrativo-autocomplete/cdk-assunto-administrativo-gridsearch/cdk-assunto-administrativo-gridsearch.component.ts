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

import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {AssuntoAdministrativo} from '@cdk/models/assunto-administrativo.model';

@Component({
    selector: 'cdk-assunto-administrativo-gridsearch',
    templateUrl: './cdk-assunto-administrativo-gridsearch.component.html',
    styleUrls: ['./cdk-assunto-administrativo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAssuntoAdministrativoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    assuntosAdministrativos: AssuntoAdministrativo[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _assuntoAdministrativoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _assuntoAdministrativoService: AssuntoAdministrativoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._assuntoAdministrativoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.assuntosAdministrativos = response['entities'];
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

    select(assuntoAdministrativo): void {
        this.selected.emit(assuntoAdministrativo);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
