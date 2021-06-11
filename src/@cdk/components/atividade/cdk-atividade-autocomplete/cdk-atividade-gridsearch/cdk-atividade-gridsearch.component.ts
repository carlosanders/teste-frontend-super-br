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

import {Atividade, Pagination} from '@cdk/models';
import {AtividadeService} from '@cdk/services/atividade.service';

@Component({
    selector: 'cdk-atividade-gridsearch',
    templateUrl: './cdk-atividade-gridsearch.component.html',
    styleUrls: ['./cdk-atividade-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAtividadeGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    atividades: Atividade[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _atividadeService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _atividadeService: AtividadeService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._atividadeService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.atividades = response['entities'];
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

    select(atividade): void {
        this.selected.emit(atividade);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
