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

import {EspecieDocumentoAvulso, Pagination} from '@cdk/models';

import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';

@Component({
    selector: 'cdk-especie-documento-avulso-gridsearch',
    templateUrl: './cdk-especie-documento-avulso-gridsearch.component.html',
    styleUrls: ['./cdk-especie-documento-avulso-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieDocumentoAvulsoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    especieDocumentoAvulsos: EspecieDocumentoAvulso[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _especieDocumentoAvulsoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieDocumentoAvulsoService: EspecieDocumentoAvulsoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._especieDocumentoAvulsoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.especieDocumentoAvulsos = response['entities'];
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

    select(especieDocumentoAvulso): void {
        this.selected.emit(especieDocumentoAvulso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
