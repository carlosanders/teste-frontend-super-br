import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination} from '@cdk/models/pagination';

import {ModalidadeRelacionamentoPessoalService} from '@cdk/services/modalidade-relacionamento-pessoal.service';
import {ModalidadeRelacionamentoPessoal} from '@cdk/models/modalidade-relacionamento-pessoal.model';

@Component({
    selector: 'cdk-modalidade-relacionamento-pessoal-gridsearch',
    templateUrl: './cdk-modalidade-relacionamento-pessoal-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-relacionamento-pessoal-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
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
            ).subscribe(response => {
                this.modalidaderelacionamentoPessoals = response['entities'];
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

    select(modalidaderelacionamentoPessoal): void {
        this.selected.emit(modalidaderelacionamentoPessoal);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
