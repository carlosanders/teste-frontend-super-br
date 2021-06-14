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

import {AfastamentoService} from '@cdk/services/afastamento.service';
import {Afastamento, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-afastamento-gridsearch',
    templateUrl: './cdk-afastamento-gridsearch.component.html',
    styleUrls: ['./cdk-afastamento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAfastamentoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    afastamentos: Afastamento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _afastamentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _afastamentoService: AfastamentoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._afastamentoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.afastamentos = response['entities'];
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

    select(afastamento): void {
        this.selected.emit(afastamento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
