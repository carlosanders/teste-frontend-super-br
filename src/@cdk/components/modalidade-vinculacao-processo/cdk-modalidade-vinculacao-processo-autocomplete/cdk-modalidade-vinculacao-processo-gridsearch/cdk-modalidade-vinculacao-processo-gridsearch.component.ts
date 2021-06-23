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

import {ModalidadeVinculacaoProcesso, Pagination} from '@cdk/models';

import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';

@Component({
    selector: 'cdk-modalidade-vinculacao-processo-gridsearch',
    templateUrl: './cdk-modalidade-vinculacao-processo-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-vinculacao-processo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeVinculacaoProcessoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadevinculacoesProcessos: ModalidadeVinculacaoProcesso[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadevinculacaoProcessoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeVinculacaoProcessoService: ModalidadeVinculacaoProcessoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeVinculacaoProcessoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modalidadevinculacoesProcessos = response['entities'];
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

    select(modalidadevinculacaoProcesso): void {
        this.selected.emit(modalidadevinculacaoProcesso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
