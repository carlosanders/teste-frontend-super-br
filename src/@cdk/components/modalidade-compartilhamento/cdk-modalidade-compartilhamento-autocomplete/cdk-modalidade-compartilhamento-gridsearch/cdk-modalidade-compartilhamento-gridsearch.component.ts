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

import {ModalidadeCompartilhamento, Pagination} from '@cdk/models';

import {ModalidadeCompartilhamentoService} from '@cdk/services/modalidade-compartilhamento.service';

@Component({
    selector: 'cdk-modalidade-compartilhamento-gridsearch',
    templateUrl: './cdk-modalidade-compartilhamento-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-compartilhamento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeCompartilhamentoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadecompartilhamentos: ModalidadeCompartilhamento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadecompartilhamentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadecompartilhamentoService: ModalidadeCompartilhamentoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadecompartilhamentoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modalidadecompartilhamentos = response['entities'];
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

    select(modalidadecompartilhamento): void {
        this.selected.emit(modalidadecompartilhamento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
