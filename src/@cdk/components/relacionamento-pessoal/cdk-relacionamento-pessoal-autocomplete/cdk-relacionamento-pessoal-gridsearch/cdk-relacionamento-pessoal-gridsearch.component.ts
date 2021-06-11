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

import {Pagination, RelacionamentoPessoal} from '@cdk/models';

import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';

@Component({
    selector: 'cdk-relacionamento-pessoal-gridsearch',
    templateUrl: './cdk-relacionamento-pessoal-gridsearch.component.html',
    styleUrls: ['./cdk-relacionamento-pessoal-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRelacionamentoPessoalGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    relacionamentoPessoals: RelacionamentoPessoal[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _relacionamentoPessoalService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _relacionamentoPessoalService: RelacionamentoPessoalService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._relacionamentoPessoalService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.relacionamentoPessoals = response['entities'];
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

    select(relacionamentoPessoal): void {
        this.selected.emit(relacionamentoPessoal);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
