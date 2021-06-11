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

import {AssuntoAdministrativo, Pagination} from '@cdk/models';

import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';

@Component({
    selector: 'cdk-assunto-administrativo-gridsearch',
    templateUrl: './cdk-assunto-administrativo-gridsearch.component.html',
    styleUrls: ['./cdk-assunto-administrativo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
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
            ).subscribe((response) => {
                this.assuntosAdministrativos = response['entities'];
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

    select(assuntoAdministrativo): void {
        this.selected.emit(assuntoAdministrativo);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
