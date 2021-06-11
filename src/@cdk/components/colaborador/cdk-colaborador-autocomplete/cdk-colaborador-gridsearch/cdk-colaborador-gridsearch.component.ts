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

import {Colaborador, Pagination} from '@cdk/models';

import {ColaboradorService} from '@cdk/services/colaborador.service';

@Component({
    selector: 'cdk-colaborador-gridsearch',
    templateUrl: './cdk-colaborador-gridsearch.component.html',
    styleUrls: ['./cdk-colaborador-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkColaboradorGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    colaboradors: Colaborador[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _colaboradorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _colaboradorService: ColaboradorService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
        this.pagination.populate = ['populateAll', 'usuario'];
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._colaboradorService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.colaboradors = response['entities'];
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

    select(colaborador): void {
        this.selected.emit(colaborador);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
