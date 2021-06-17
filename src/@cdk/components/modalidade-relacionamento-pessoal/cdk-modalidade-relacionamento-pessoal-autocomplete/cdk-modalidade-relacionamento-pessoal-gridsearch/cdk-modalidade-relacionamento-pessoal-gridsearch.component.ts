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

import {ModalidadeRelacionamentoPessoal, Pagination} from '@cdk/models';

import {ModalidadeRelacionamentoPessoalService} from '@cdk/services/modalidade-relacionamento-pessoal.service';

@Component({
    selector: 'cdk-modalidade-relacionamento-pessoal-gridsearch',
    templateUrl: './cdk-modalidade-relacionamento-pessoal-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-relacionamento-pessoal-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeRelacionamentoPessoalGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidaderelacionamentoPessoals: ModalidadeRelacionamentoPessoal[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidaderelacionamentoPessoalService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeRelacionamentoPessoalService: ModalidadeRelacionamentoPessoalService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeRelacionamentoPessoalService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modalidaderelacionamentoPessoals = response['entities'];
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

    select(modalidaderelacionamentoPessoal): void {
        this.selected.emit(modalidaderelacionamentoPessoal);
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
