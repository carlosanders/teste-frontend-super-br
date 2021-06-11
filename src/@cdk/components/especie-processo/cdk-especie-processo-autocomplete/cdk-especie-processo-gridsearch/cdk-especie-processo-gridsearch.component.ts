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

import {EspecieProcesso, Pagination} from '@cdk/models';

import {EspecieProcessoService} from '@cdk/services/especie-processo.service';

@Component({
    selector: 'cdk-especie-processo-gridsearch',
    templateUrl: './cdk-especie-processo-gridsearch.component.html',
    styleUrls: ['./cdk-especie-processo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieProcessoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    especieProcessos: EspecieProcesso[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _especieProcessoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieProcessoService: EspecieProcessoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._especieProcessoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.especieProcessos = response['entities'];
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

    select(especieProcesso): void {
        this.selected.emit(especieProcesso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
