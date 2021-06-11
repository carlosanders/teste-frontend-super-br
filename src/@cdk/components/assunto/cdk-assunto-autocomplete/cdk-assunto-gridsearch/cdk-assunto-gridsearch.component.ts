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
import {Assunto, Pagination} from '@cdk/models';

import {AssuntoService} from '@cdk/services/assunto.service';


@Component({
    selector: 'cdk-assunto-gridsearch',
    templateUrl: './cdk-assunto-gridsearch.component.html',
    styleUrls: ['./cdk-assunto-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssuntoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    assuntos: Assunto[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _assuntoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _assuntoService: AssuntoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._assuntoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.assuntos = response['entities'];
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

    select(assunto): void {
        this.selected.emit(assunto);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
